import React, { FC } from "react";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import Router from "next/router";
import { useLoginMutation } from "../../src/generated/graphql";
import { Form, Button, Input, Space, Divider } from "antd";

import { MailFilled } from "@ant-design/icons";
import * as Yup from "yup";

interface LoginFormProps {
  onSelectRegisterForm: () => void;
}

export const LoginForm: FC<LoginFormProps> = (props) => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const { errors, values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      loginMutation({
        variables: {
          input: {
            email: String(values.email).trim(),
            password: values.password,
          },
        },
      }).then((r) => {
        if (r.data?.login.accessToken) {
          Cookies.set("token", r.data.login.accessToken);
          Router.push("/admin/dashboard");
        }
      });
    },
  });

  const [loginMutation, { data, loading, error }] = useLoginMutation();

  const selectRegisterForm = () => {
    props.onSelectRegisterForm();
  };

  return (
    <div>
      <Form.Item
        validateStatus={errors.email ? "error" : "success"}
        help={errors.email}
      >
        <Input
          name="email"
          placeholder="email"
          suffix={<MailFilled />}
          value={values.email}
          onChange={handleChange}
        />
      </Form.Item>
      <Form.Item
        validateStatus={errors.password ? "error" : "success"}
        help={errors.password}
      >
        <Input.Password
          name="password"
          placeholder="password"
          value={values.password}
          onChange={handleChange}
        />
      </Form.Item>
      <Divider />
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Button color="primary" onClick={(e) => handleSubmit()} type="primary">
          Login
        </Button>

        <Button type="link" onClick={selectRegisterForm}>
          Register a new user
        </Button>
      </Space>
    </div>
  );
};
