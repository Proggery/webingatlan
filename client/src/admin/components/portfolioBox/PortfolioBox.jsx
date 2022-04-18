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
  loadDeleteDataImg,
} from "../../../redux/sections/portfolio.section/reducers/thunks";
import {
  titleProps,
  boxTitleProps,
  textProps,
  altProps,
  iconProps,
  submitBtnProps,
  updateBtnProps,
} from "./properties";

const Input = styled("input")({
  display: "none",
});

const PortfolioBox = () => {
  const dispatch = useDispatch();
  const { getData, message } = useSelector((state) => state.portfolio);

  console.log(getData)

  const [data, setData] = useState({
    portfolioTitle: "",
    portfolioBoxTitle: "",
    portfolioText: "",
    portfolioImageAlt: "",
    portfolioIconClass: "",
  });
  const [updateData, setUpdateData] = useState([]);
  const [resMessage, setResMessage] = useState({});
  const {
    portfolioTitle,
    portfolioBoxTitle,
    portfolioText,
    portfolioImageAlt,
    portfolioIconClass,
  } = data;

  useEffect(() => {
    dispatch(loadGetData());
  }, [dispatch]);

  useEffect(() => {
    setData({
      ...data,
      getData,
    });

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

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({
      ...updateData,
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

  const handleFileUpdate = (e, id) => {
    setUpdateData({
      ...updateData,
      id: id,
      file: e.target.files[0],
      filename: e.target.files[0].name,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("portfolioImg", data.file);
    formData.append("portfolioTitle", portfolioTitle);
    formData.append("portfolioBoxTitle", portfolioBoxTitle);
    formData.append("portfolioText", portfolioText);
    formData.append("portfolioImageAlt", portfolioImageAlt);
    formData.append("portfolioIconClass", portfolioIconClass);

    dispatch(loadCreateData(formData));
    dispatch(loadGetData());
    setData({
      portfolioTitle: "",
      portfolioBoxTitle: "",
      portfolioText: "",
      portfolioImageAlt: "",
      portfolioIconClass: "",
      file: "",
      filename: "",
    });
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();

    console.log(updateData);

    const formData = new FormData();
    formData.append("portfolioImg", updateData.file);
    formData.append("portfolioTitle", updateData.portfolioTitle);
    formData.append("portfolioBoxTitle", updateData.portfolioBoxTitle);
    formData.append("portfolioText", updateData.portfolioText);
    formData.append("portfolioImageAlt", updateData.portfolioImageAlt);
    formData.append("portfolioIconClass", updateData.portfolioIconClass);

    dispatch(loadUpdateData(formData, id));
    setUpdateData({});
  };

  const deleteFileName = () => {
    setData({
      ...data,
      file: "",
      filename: "",
    });
    setUpdateData({
      ...updateData,
      file: "",
      filename: "",
    });
  };

  const deleteSilderImg = (id) => {
    dispatch(loadDeleteDataImg(id));
  };

  return (
    <>
      <div className="configBox__header">
        <h2>Portfólió beállítás</h2>
      </div>

      {resMessage && resMessage ? (
        <div className="configBox__message">
          {resMessage.error_msg || resMessage.success_msg}
        </div>
      ) : (
        <div className="configBox__message"></div>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit}
        method="POST"
        noValidate
        autoComplete="off"
      >
        <TextField
          value={portfolioTitle}
          onChange={handleChange}
          {...titleProps}
        />
      
        <div className="configBox__content">
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
            <label htmlFor="portfolio__img">
              <Input
                onChange={handleFileUpload}
                accept="image/*"
                id="portfolio__img"
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
          </Stack>

          <TextField
            value={portfolioImageAlt}
            onChange={handleChange}
            {...altProps}
          />

          <TextField
            value={portfolioBoxTitle}
            onChange={handleChange}
            {...boxTitleProps}
          />
          <TextField
            value={portfolioText}
            onChange={handleChange}
            {...textProps}
          />
          <TextField
            value={portfolioIconClass}
            onChange={handleChange}
            {...iconProps}
          />

          <Button {...submitBtnProps}>{submitBtnProps.value}</Button>
        </div>
      </Box>
      <br />
      {data.getData &&
        data.getData.map((item, key) => (
          <Box
            component="form"
            onSubmit={(e) => handleUpdate(e, item.id)}
            method="PUT"
            noValidate
            autoComplete="off"
            key={item.id}
          >
            <div className="configBox__content">
              {item.img_name ? (
                <>
                  <img
                    width="100"
                    src={`http://localhost:5555/static/images/portfolio/${item.img_name}`}
                    alt=""
                  />
                  <IconButton
                    color="primary"
                    aria-label="delete picture"
                    component="span"
                    onClick={() => deleteSilderImg(item.id)}
                  >
                    <Delete />
                  </IconButton>{" "}
                </>
              ) : (
                <>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    {updateData && updateData.id === key ? (
                      <div>
                        {updateData.filename}
                        <IconButton
                          color="primary"
                          aria-label="delete picture"
                          component="span"
                          onClick={deleteFileName}
                        >
                          <Delete />
                        </IconButton>
                      </div>
                    ) : (
                      ""
                    )}
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <label htmlFor={`portfolio__${key}`}>
                      <Input
                        onChange={(e) => handleFileUpdate(e, key)}
                        accept="image/*"
                        id={`portfolio__${key}`}
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
                  </Stack>
                </>
              )}

              <TextField
                defaultValue={item.img_alt}
                onChange={handleUpdateChange}
                {...altProps}
              />

              <TextField
                defaultValue={item.title}
                onChange={handleUpdateChange}
                {...titleProps}
              />
              <TextField
                defaultValue={item.box_title}
                onChange={handleUpdateChange}
                {...boxTitleProps}
              />
              <TextField
                defaultValue={item.text}
                onChange={handleUpdateChange}
                {...textProps}
              />
              <TextField
                defaultValue={item.icon_class}
                onChange={handleUpdateChange}
                {...iconProps}
              />

              <Button {...updateBtnProps}>{updateBtnProps.value}</Button>
            </div>
          </Box>
        ))}
    </>
  );
};

export default PortfolioBox;
