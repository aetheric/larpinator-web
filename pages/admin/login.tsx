import React, { FC, useEffect } from "react";
// @material-ui/core components
import { makeStyles, Theme } from "@material-ui/core/styles";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";

import styles from "assets/jss/nextjs-material-dashboard/views/loginPage";
import { gql } from "@apollo/client";
import { Container } from "@material-ui/core";
import { AuthContext } from "../_app";
import { LoginForm } from "../../components/Auth/auth.login";
import { RegisterForm } from "../../components/Auth/auth.register";

const useStyles = makeStyles<Theme>(() => styles as any);

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
  const [cardAnimation, setCardAnimation] = React.useState("cardHidden");

  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();

  return (
    <AuthContext.Consumer>
      {(value) => {
        const { currentUser } = value;
        console.log(currentUser);
        return (
          <div
            className={classes.pageHeader}
            style={{
              backgroundImage: "url('/login-bg.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          >
            <div className={classes.container}>
              <Container maxWidth="sm">
                <Card className={classes[cardAnimation]}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Welcome to larpinator</h4>
                  </CardHeader>
                  <CardBody>
                    {!currentUser ? <ShowForm /> : <p>loggedin</p>}
                  </CardBody>
                </Card>
              </Container>
            </div>
          </div>
        );
      }}
    </AuthContext.Consumer>
  );
}
