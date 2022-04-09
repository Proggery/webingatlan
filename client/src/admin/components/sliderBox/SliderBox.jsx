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
} from "../../../redux/slider/reducers/thunks";
import {
  sliderTitleProps,
  sliderImageAltProps,
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

  const [getSliderData, setGetSliderData] = useState({
    sliderTitle: "",
    sliderImageAlt: "",
  });

  const [updateData, setUpdateData] = useState({
    sliderTitle: "",
    sliderImageAlt: "",
  });

  const [resMessage, setResMessage] = useState({});
  const { sliderTitle, sliderImageAlt } = data;
  // const { updateSliderTitle, updateSliderImageAlt } = updateData;

  useEffect(() => {
    dispatch(loadGetData());
  }, [dispatch]);

  useEffect(() => {
    if (getData) {
      setGetSliderData(getData);
      console.log(updateData);
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

  const handleFileUpdate = (e) => {
    setUpdateData({
      ...updateData,
      file: e.target.files[0],
      filename: e.target.files[0].name,
    });
  };

  console.log(updateData);

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

  const handleUpdate = (id) => {
    console.log(updateData);
    const formData = new FormData();
    formData.append("sliderImg", updateData.file);
    formData.append("sliderTitle", updateData.sliderTitle);
    formData.append("sliderImageAlt", updateData.sliderImageAlt);

    dispatch(loadUpdateData(formData, id));

    // setData({
    //   ...data,
    //   file: "",
    //   filename: "",
    // });
  };

  const deleteFileName = () => {
    setData({
      ...data,
      file: "",
      filename: "",
    });
  };

  const deleteSilderImg = (id) => {
    dispatch(loadDeleteData(id));
  };

  console.log(getSliderData)

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
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
        className="configBox"
      >
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
              <TextField
                value={sliderImageAlt}
                onChange={handleChange}
                {...sliderImageAltProps}
              />
            </Stack>

            <TextField
              value={sliderTitle}
              onChange={handleChange}
              {...sliderTitleProps}
            />
            <Button {...submitBtnProps}>{submitBtnProps.value}</Button>
          </Box>
        </div>
        <br />
        <br />
        <br />
        <br />
        {getData &&
          getData.map((item) => (
            <div key={item.id}>
              <div className="configBox__content">
                {item.img_name ? (
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <img
                      width="200"
                      src={`http://localhost:5555/static/images/slider/${
                        getData && item.img_name
                      }`}
                      alt=""
                    />

                    <IconButton
                      color="primary"
                      aria-label="delete picture"
                      component="span"
                      onClick={() => deleteSilderImg(item.id)}
                    >
                      <Delete />
                    </IconButton>
                    <TextField
                      defaultValue={updateData && updateData.sliderImageAlt}
                      onChange={handleUpdateChange}
                      {...sliderImageAltProps}
                    />
                  </Stack>
                ) : (
                  <>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      {updateData.filename && (
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
                      )}
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <label htmlFor="upload_slider__img">
                        <Input
                          onChange={handleFileUpdate}
                          accept="image/*"
                          id="upload_slider__img"
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
                      <TextField
                        defaultValue={item.img_alt}
                        onChange={handleUpdateChange}
                        {...sliderImageAltProps}
                      />
                    </Stack>
                  </>
                )}

                <TextField
                  defaultValue={item.title}
                  onChange={handleUpdateChange}
                  {...sliderTitleProps}
                />

                <Button
                  onClick={() => handleUpdate(item.id)}
                  {...updateBtnProps}
                >
                  {updateBtnProps.value}
                </Button>
              </div>
            </div>
          ))}
      </Box>
    </>
  );
};

export default SliderBox;
