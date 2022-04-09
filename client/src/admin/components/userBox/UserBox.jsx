import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import { Delete, PhotoCamera } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  loadGetData,
  loadCreateData,
  loadUpdateData,
  loadDeleteData,
} from "../../../redux/user/reducers/thunks";
import {
  nameProps,
  descProps,
  altProps,
  submitBtnProps,
  updateBtnProps,
} from "./properties";

const Input = styled("input")({
  display: "none",
});

const UserBox = () => {
  const dispatch = useDispatch();
  const { getData, message } = useSelector((state) => state.user);

  const [data, setData] = useState({
    name: "",
    desc: "",
    alt: "",
    file: "",
    filename: "",
  });
  const [resMessage, setResMessage] = useState({});
  const { name, desc, alt } = data;

  useEffect(() => {
    dispatch(loadGetData());
  }, [dispatch]);

  useEffect(() => {
    if (getData) {
      setData({
        ...data,
        name: getData.name,
        desc: getData.desc,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getData]);

  useEffect(() => {
    setResMessage(message);
  }, [message]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const handleFileUpload = (e) => {
    setData({
      ...data,
      file: e.target.files[0],
      filename: e.target.files[0].name,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("profileImg", data.file);
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("alt", alt);

    dispatch(loadCreateData(formData));
    dispatch(loadGetData());
    setData({
      name: "",
      desc: "",
      alt: "",
      file: "",
      filename: "",
    });
  };

  const handleUpdate = (id) => {
    const formData = new FormData();
    formData.append("profileImg", data.file);
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("alt", alt);

    dispatch(loadUpdateData(formData, id));

    setData({
      ...data,
      file: "",
      filename: "",
    });
  };

  const deleteFileName = () => {
    setData({
      ...data,
      file: "",
      filename: "",
    });
  };

  const deleteProfileImg = (id) => {
    dispatch(loadDeleteData(id));
  };

  return (
    <>
      <div className="configBox__header">
        <h2>Felhasználó beállítás</h2>
      </div>

      {resMessage && resMessage ? (
        <div className="configBox__message">
          {resMessage.error_msg || resMessage.success_msg}
        </div>
      ) : (
        <div className="configBox__message"></div>
      )}

      <Box
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
        className="configBox"
      >
        {!getData ? (
          <div className="configBox__content">
            <Box
              component="form"
              onSubmit={handleSubmit}
              method="POST"
              noValidate
              autoComplete="off"
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                {data.filename && (
                  <div>
                    {data.filename}
                    <IconButton
                      color="primary"
                      aria-label="delete picture"
                      component="span"
                      onClick={deleteFileName}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                )}
              </Stack>
              <Stack direction="row" alignItems="center" spacing={2}>
                <label htmlFor="profile__img">
                  <Input
                    onChange={handleFileUpload}
                    accept="image/*"
                    id="profile__img"
                    type="file"
                  />
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
                <TextField onChange={handleChange} {...altProps} />
              </Stack>
              <TextField onChange={handleChange} {...nameProps} />
              <TextField onChange={handleChange} {...descProps} />
              <Button {...submitBtnProps} >
                {submitBtnProps.value}
              </Button>
            </Box>
          </div>
        ) : (
          <div className="configBox__content" key={getData.id}>
            {getData.img_name ? (
              <div>
                <img
                  width="200"
                  src={`http://localhost:5555/static/images/profile-img/${getData.img_name}`}
                  alt=""
                />

                <IconButton
                  color="primary"
                  aria-label="delete picture"
                  component="span"
                  onClick={() => deleteProfileImg(getData.id)}
                >
                  <Delete />
                </IconButton>
              </div>
            ) : (
              <>
                <Stack direction="row" alignItems="center" spacing={2}>
                  {data.filename && (
                    <div>
                      {data.filename}
                      <IconButton
                        color="primary"
                        aria-label="delete picture"
                        component="span"
                        onClick={deleteFileName}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  )}
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <label htmlFor="profile__img">
                    <Input
                      onChange={handleFileUpload}
                      accept="image/*"
                      id="profile__img"
                      type="file"
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                  <TextField onChange={handleChange} {...altProps} />
                </Stack>
              </>
            )}

            <TextField
              value={name}
              onChange={handleChange}
              {...nameProps}
            />

            <TextField
              value={desc}
              onChange={handleChange}
              {...descProps}
            />
            <Button onClick={() => handleUpdate(1)} {...updateBtnProps} >
              {updateBtnProps.value}
            </Button>
          </div>
        )}
      </Box>
    </>
  );
};

export default UserBox;
