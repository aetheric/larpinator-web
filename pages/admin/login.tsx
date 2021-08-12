import React, { FC, useEffect } from "react";

import { gql } from "@apollo/client";
import { AuthContext } from "pages/_app";
import { LoginForm } from "components/Auth/auth.login";
import { RegisterForm } from "components/Auth/auth.register";
import { Card } from "antd";
import styles from "styles/components/Login.module.css";

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
    }
  }
`;

const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      success
      message
    }
  }
`;

const ShowForm: FC = () => {
  const [formType, setFormType] = React.useState("login");
  const selectRegisterForm = () => {
    setFormType("register");
  };
  const selectLoginForm = () => {
    setFormType("login");
  };

  useEffect(() => {
    console.log(`formType changed: ${formType}`);
  }, [formType]);

  if (formType === "login") {
    return <LoginForm onSelectRegisterForm={selectRegisterForm} />;
  } else {
    return <RegisterForm onSelectLoginForm={selectLoginForm} />;
  }

  return null;
};

export default function LoginPage(props: any) {
  return (
    <AuthContext.Consumer>
      {(value) => {
        const { currentUser } = value;
        console.log(currentUser);
        return (
          <div
            className={styles.pageContainer}
            style={{
              backgroundImage: "url('/login-bg.jpeg')",
            }}
          >
            <Card
              title="Welcome to Larpinator"
              bordered={false}
              style={{ width: 300 }}
              className={styles.loginCard}
            >
              <ShowForm />
            </Card>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
}
