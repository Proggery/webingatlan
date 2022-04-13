import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Box, TextField } from "@mui/material";
import {
  loadGetData,
  loadUpdateData,
} from "../../../redux/sections/login.section/reducers/thunks";
import { usernameProps, passwordProps, submitBtnProps } from "./properties";

const Account = () => {
  const dispatch = useDispatch();
  const { getData, message } = useSelector((state) => state.login);

  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [resMessage, setResMessage] = useState({});

  const { username, password } = data;

  const userID = localStorage.getItem("id");

  useEffect(() => {
    dispatch(loadGetData(userID));
  }, [userID]);

  useEffect(() => {
    if (getData) {
      setData({
        ...data,
        username: getData.username,
      });
    }
  }, [getData]);

  useEffect(() => {
    setResMessage(message);
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleUpdate = (id) => {
    dispatch(loadUpdateData(data, id));
    setData({
      ...data,
      password: "",
    });
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
      className="configBox"
    >
      <div className="configBox__header">
        <h2>Felhasználónév és jelszó módosítás</h2>
      </div>

      {resMessage && resMessage ? (
        <div className="configBox__message">
          {resMessage.error_msg || resMessage.success_msg}
        </div>
      ) : (
        <div className="configBox__message"></div>
      )}

      <div className="configBox__content">
        <TextField
          onChange={handleChange}
          value={username}
          {...usernameProps}
        />
        <TextField
          onChange={handleChange}
          value={password}
          {...passwordProps}
        />
        <Button onClick={() => handleUpdate(userID)} {...submitBtnProps}>
          {submitBtnProps.value}
        </Button>
      </div>
    </Box>
  );
};

export default Account;
