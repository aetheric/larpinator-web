import React, { FC } from "react";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import Router from "next/router";
import { useLoginMutation } from "../../src/generated/graphql";
import { Button, Input, Space } from "antd";

import { MailFilled } from "@ant-design/icons";

interface LoginFormProps {
  onSelectRegisterForm: () => void;
}

export const LoginForm: FC<LoginFormProps> = (props) => {
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
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
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <Input
          name="email"
          placeholder="email"
          suffix={<MailFilled />}
          value={loginFormik.values.email}
          onChange={loginFormik.handleChange}
        />
        <Input.Password
          name="password"
          placeholder="password"
          suffix={<MailFilled />}
          value={loginFormik.values.password}
          onChange={loginFormik.handleChange}
        />

        <Button
          color="primary"
          onClick={(e) => loginFormik.handleSubmit()}
          type="primary"
        >
          Login
        </Button>

        <Button type="link" onClick={selectRegisterForm}>
          Register a new user
        </Button>
      </Space>
    </div>
  );
};
