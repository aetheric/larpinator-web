import React, { FC } from "react";
import { Box, Button, Link, TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import Router from "next/router";
import { useLoginMutation } from "../../src/generated/graphql";
import { makeStyles, Theme } from "@material-ui/core/styles";
import styles from "../../assets/jss/nextjs-material-dashboard/views/loginPage";

const useStyles = makeStyles<Theme>(() => styles as any);

interface LoginFormProps {
  onSelectRegisterForm: () => void;
}

export const LoginForm: FC<LoginFormProps> = (props) => {
  const classes = useStyles();
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
    <form
      className={classes.form}
      onSubmit={(event) => {
        event.preventDefault();
        loginFormik.handleSubmit(event);
      }}
    >
      <Box marginBottom={2}>
        <TextField
          placeholder="email"
          fullWidth
          name="email"
          label="email"
          value={loginFormik.values.email}
          onChange={loginFormik.handleChange}
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
          value={loginFormik.values.password}
          onChange={loginFormik.handleChange}
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
        <Button color="primary" type="submit" variant="contained">
          Login
        </Button>
      </Box>
      <Box textAlign="right">
        <Link href="#" onClick={selectRegisterForm} variant="caption">
          Register a new user
        </Link>
      </Box>
    </form>
  );
};
