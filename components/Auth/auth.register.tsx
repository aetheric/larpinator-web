import React, { FC } from "react";
import { Box, Button, TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import { useFormik } from "formik";
import Router from "next/router";
import { useRegisterMutation } from "../../src/generated/graphql";
import { makeStyles, Theme } from "@material-ui/core/styles";
import styles from "../../assets/jss/nextjs-material-dashboard/views/loginPage";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles<Theme>(() => styles as any);

interface LoginFormProps {
  onSelectLoginForm: () => void;
}

export const RegisterForm: FC<LoginFormProps> = (props) => {
  const classes = useStyles();

  const registerFormik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
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
    <form
      className={classes.form}
      onSubmit={(event) => {
        event.preventDefault();
        registerFormik.handleSubmit(event);
      }}
    >
      <Box>
        <TextField
          placeholder="name"
          fullWidth
          name="name"
          label="name"
          value={registerFormik.values.name}
          onChange={registerFormik.handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box marginBottom={2}>
        <TextField
          placeholder="email"
          fullWidth
          name="email"
          label="email"
          value={registerFormik.values.email}
          onChange={registerFormik.handleChange}
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
          value={registerFormik.values.password}
          onChange={registerFormik.handleChange}
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
        <Button color="primary" onClick={selectLoginForm}>
          Login
        </Button>
      </Box>
    </form>
  );
};
