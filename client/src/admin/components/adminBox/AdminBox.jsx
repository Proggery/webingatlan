import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Box, TextField } from "@mui/material";
import {
  loadGetData,
  loadCreateData,
  loadUpdateData,
} from "../../../redux/admin/reducers/thunks";
import {
  adminFirstnameProps,
  adminLastnameProps,
  adminCompanyProps,
  adminAddressProps,
  adminPhoneProps,
  adminEmailProps,
  submitBtnProps,
  updateBtnProps,
} from "./properties";

const Account = () => {
  const dispatch = useDispatch();
  const { getData, message } = useSelector((state) => state.admin);

  const [data, setData] = useState({
    adminFirstname: "",
    adminLastname: "",
    adminCompany: "",
    adminAddress: "",
    adminPhone: "",
    adminEmail: "",
  });
  const [resMessage, setResMessage] = useState({});
  const {
    adminFirstname,
    adminLastname,
    adminCompany,
    adminAddress,
    adminPhone,
    adminEmail,
  } = data;

  useEffect(() => {
    if (getData) {
      setData({
        ...data,
        adminFirstname: getData.firstname,
        adminLastname: getData.lastname,
        adminCompany: getData.company,
        adminAddress: getData.address,
        adminPhone: getData.phone,
        adminEmail: getData.email,
      });
    }
  }, [getData]);

  useEffect(() => {
    dispatch(loadGetData());
  }, []);

  useEffect(() => {
    setResMessage(message);
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loadCreateData(data));
  };

  const handleUpdate = (id) => {
    dispatch(loadUpdateData(data, id));
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
        <h2>Admin adatok</h2>
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
          value={adminFirstname}
          {...adminFirstnameProps}
        />
        <TextField
          onChange={handleChange}
          value={adminLastname}
          {...adminLastnameProps}
        />
        <TextField
          onChange={handleChange}
          value={adminCompany}
          {...adminCompanyProps}
        />
        <TextField
          onChange={handleChange}
          value={adminAddress}
          {...adminAddressProps}
        />
        <TextField
          onChange={handleChange}
          value={adminPhone}
          {...adminPhoneProps}
        />
        <TextField
          onChange={handleChange}
          value={adminEmail}
          {...adminEmailProps}
        />
        {getData ? (
          <Button onClick={() => handleUpdate(getData.id)} {...updateBtnProps}>
            {updateBtnProps.value}
          </Button>
        ) : (
          <Button onClick={handleSubmit} {...submitBtnProps}>
            {submitBtnProps.value}
          </Button>
        )}
      </div>
    </Box>
  );
};

export default Account;
