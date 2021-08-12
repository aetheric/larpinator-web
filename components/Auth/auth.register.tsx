import React, { FC } from "react";
import { Box, Button, Link, TextField } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import { useFormik } from "formik";
import { useRegisterMutation } from "../../src/generated/graphql";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

interface LoginFormProps {
  onSelectLoginForm: () => void;
}

export const RegisterForm: FC<LoginFormProps> = (props) => {
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
      onSubmit={(event) => {
        event.preventDefault();
        registerFormik.handleSubmit(event);
      }}
    >
      <Box>
        <TextField
          placeholder="name"
          fullWidth
          required
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
          required
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
          required
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
        <Button color="primary" type="submit" variant="contained">
          Register
        </Button>
      </Box>
      <Box textAlign="right">
        <Link href="#" onClick={selectLoginForm} variant="caption">
          Already have an account
        </Link>
      </Box>
    </form>
  );
};
