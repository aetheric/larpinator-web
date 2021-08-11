import React from "react";
// @material-ui/core components
import { makeStyles, Theme } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import LockIcon from "@material-ui/icons/Lock";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import Router from "next/router";

import styles from "assets/jss/nextjs-material-dashboard/views/loginPage";
import { gql } from "@apollo/client";
import { useLoginMutation } from "../../src/generated/graphql";
import { Button, Container, Box, TextField } from "@material-ui/core";

const useStyles = makeStyles<Theme>(() => styles as any);

const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
    }
  }
`;

export default function LoginPage(props: any) {
  console.log(props);
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [loginUser, setLoginUser] = React.useState("");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();

  const formik = useFormik({
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

  return (
    <div>
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
            <Card className={classes[cardAnimaton]}>
              <CardHeader color="primary" className={classes.cardHeader}>
                <h4>Login to larpinator</h4>
              </CardHeader>
              <CardBody>
                {!loginUser ? (
                  <form
                    className={classes.form}
                    onSubmit={(event) => {
                      event.preventDefault();
                      formik.handleSubmit(event);
                    }}
                  >
                    <Box marginBottom={2}>
                      <TextField
                        placeholder="email"
                        fullWidth
                        name="email"
                        label="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <EmailIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    <Box marginBottom={2}>
                      <TextField
                        placeholder="password"
                        fullWidth
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        autoComplete="current-password"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <LockIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    <Box textAlign="center">
                      <Button color="primary" type="submit">
                        Get started
                      </Button>
                    </Box>
                  </form>
                ) : (
                  <p>loggedin</p>
                )}
              </CardBody>
            </Card>
          </Container>
        </div>
      </div>
    </div>
  );
}
