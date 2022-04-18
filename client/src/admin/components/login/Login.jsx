import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  loadGetData,
  loadCreateData,
} from "../../../redux/sections/login.section/reducers/thunks";
import { usernameProps, passwordProps, submitBtnProps } from "./properties";

const Login = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const id = localStorage.getItem("userID");
    dispatch(loadGetData(id));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loadCreateData(user));
    setUser({
      username: "",
      password: "",
    });
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h1>Login: 🤓</h1>
        <TextField
          onChange={handleChange}
          value={user.username}
          {...usernameProps}
        />
        <TextField
          onChange={handleChange}
          value={user.password}
          {...passwordProps}
        />
        <Button {...submitBtnProps}>{submitBtnProps.value}</Button>
      </Box>
    </>
  );
};

export default Login;
