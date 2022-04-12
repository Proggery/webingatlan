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
} from "../../../redux/slider/reducers/thunks";
import {
  titleProps,
  altProps,
  submitBtnProps,
  updateBtnProps,
} from "./properties";

const Input = styled("input")({
  display: "none",
});

const SliderBox = () => {
  const dispatch = useDispatch();
  const { getData, message } = useSelector((state) => state.slider);

  const [data, setData] = useState({
    sliderTitle: "",
    sliderImageAlt: "",
  });
  const [updateData, setUpdateData] = useState([]);
  const [resMessage, setResMessage] = useState({});
  const { sliderTitle, sliderImageAlt } = data;

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
    formData.append("sliderImg", data.file);
    formData.append("sliderTitle", sliderTitle);
    formData.append("sliderImageAlt", sliderImageAlt);

    dispatch(loadCreateData(formData));
    dispatch(loadGetData());
    setData({
      sliderTitle: "",
      sliderImageAlt: "",
      file: "",
      filename: "",
    });
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();

    console.log(updateData);

    const formData = new FormData();
    formData.append("sliderImg", updateData.file);
    formData.append("sliderTitle", updateData.sliderTitle);
    formData.append("sliderImageAlt", updateData.sliderImageAlt);

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
        <h2>Slider beállítás</h2>
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
            <label htmlFor="slider__img">
              <Input
                onChange={handleFileUpload}
                accept="image/*"
                id="slider__img"
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
            value={sliderImageAlt}
            onChange={handleChange}
            {...altProps}
          />

          <TextField
            value={sliderTitle}
            onChange={handleChange}
            {...titleProps}
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
                    src={`http://localhost:5555/static/images/slider/${item.img_name}`}
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
                    <label htmlFor={`slider__${key}`}>
                      <Input
                        onChange={(e) => handleFileUpdate(e, key)}
                        accept="image/*"
                        id={`slider__${key}`}
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

              <Button {...updateBtnProps}>{updateBtnProps.value}</Button>
            </div>
          </Box>
        ))}
    </>
  );
};

export default SliderBox;
