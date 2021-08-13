import React, { FC } from "react";

import { useFormik } from "formik";
import { useRegisterMutation } from "src/generated/graphql";
import { Button, Input, Space, Form, Divider, Radio, message } from "antd";
import { MailFilled, UserOutlined } from "@ant-design/icons";
import * as Yup from "yup";

interface LoginFormProps {
  onSelectLoginForm: () => void;
}

export const RegisterForm: FC<LoginFormProps> = (props) => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });
  const { errors, values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      registerMutation({
        variables: {
          input: {
            name: String(values.name).trim(),
            email: String(values.email).trim(),
            password: values.password,
          },
        },
      }).then((r) => {
        if (r.data?.register.success) {
          message.success("User is successfully registered. Please login!");
          selectLoginForm();
        }
      });
    },
  });

  const [registerMutation, { data, loading, error }] = useRegisterMutation();

  const selectLoginForm = () => {
    props.onSelectLoginForm();
  };
  return (
    <div>
      <Form.Item
        validateStatus={errors.name ? "error" : "success"}
        help={errors.name}
      >
        <Input
          name="name"
          placeholder="name"
          suffix={<UserOutlined />}
          value={values.name}
          onChange={handleChange}
        />
      </Form.Item>
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
          Register
        </Button>

        <Button type="link" onClick={selectLoginForm}>
          Already have an account
        </Button>
      </Space>
    </div>
  );
};
