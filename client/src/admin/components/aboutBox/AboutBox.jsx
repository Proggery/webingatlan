import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  styled,
  TextField,
  Paper,
} from "@mui/material";
import { Delete, Edit, PhotoCamera } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  loadGetData,
  loadCreateData,
  loadUpdateData,
  loadDeleteDataImg,
  loadGetListing,
  loadCreateListing,
  loadUpdateListing,
  loadDeleteListing,
} from "../../../redux/sections/about.section/reducers/thunks";
import {
  titleProps,
  subtitleProps,
  textProps,
  listingProps,
  text2Props,
  altProps,
  submitBtnProps,
  updateBtnProps,
} from "./properties";

const Input = styled("input")({
  display: "none",
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AboutBox = () => {
  const dispatch = useDispatch();
  const { getData, getListing, message } = useSelector((state) => state.about);

  const [data, setData] = useState({
    id: "",
    aboutTitle: "",
    aboutSubTitle: "",
    aboutText: "",
    aboutText2: "",
    listingItem: "",
    aboutImageAlt: "",
  });
  const [updateData, setUpdateData] = useState([]);
  const [resMessage, setResMessage] = useState({});
  const {
    id,
    aboutTitle,
    aboutSubTitle,
    aboutText,
    aboutText2,
    listingItem,
    aboutImageAlt,
  } = data;

  useEffect(() => {
    dispatch(loadGetData());
    dispatch(loadGetListing());
  }, [dispatch]);

  useEffect(() => {
    setData({
      id: getData && getData.id,
      aboutTitle: getData && getData.title,
      aboutSubTitle: getData && getData.subtitle,
      aboutText: getData && getData.text,
      aboutText2: getData && getData.text2,
      aboutImageAlt: getData && getData.img_alt,
      listingItem: "",
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getData]);

  useEffect(() => {
    setResMessage(message);
  }, [message]);

  // -----------------------------------  CHANGES  -----------------------------------
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
    // setUpdateData({
    //   ...updateData,
    //   id: id,
    //   file: e.target.files[0],
    //   filename: e.target.files[0].name,
    // });
  };

  // ----------------------------------- SUBMIT BUTTONS  -----------------------------------

  const handleListingBtn = (e) => {
    e.preventDefault();

    dispatch(loadCreateListing({ listingItem }));

    setData({
      listingItem: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("aboutImg", data.file);
    formData.append("aboutTitle", aboutTitle);
    formData.append("aboutSubTitle", aboutSubTitle);
    formData.append("aboutText", aboutText);
    formData.append("aboutText2", aboutText2);
    formData.append("aboutImageAlt", aboutImageAlt);
    formData.append("listingItem", listingItem);

    dispatch(loadCreateData(formData));
    dispatch(loadGetData());
    setData({
      listingItem: "",
    });
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("aboutImg", data.file);
    formData.append("aboutTitle", aboutTitle);
    formData.append("aboutSubTitle", aboutSubTitle);
    formData.append("aboutText", aboutText);
    formData.append("aboutText2", aboutText2);
    formData.append("aboutImageAlt", aboutImageAlt);

    dispatch(loadUpdateData(formData, id));
    dispatch(loadGetData());
  };

  const updateListing = (e, id) => {
    e.preventDefault();

    dispatch(loadUpdateListing(updateData, id));
  };

  const deleteListingBtn = (e, id) => {
    e.preventDefault();

    dispatch(loadDeleteListing(id));
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

  const deleteDataImg = (id) => {
    dispatch(loadDeleteDataImg(id));
  };

  return (
    <>
      <div className="configBox__header">
        <h2>Rólunk beállítás</h2>
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
          {getData && getData.img_name ? (
            <>
              <img
                width="100"
                src={`http://localhost:5555/static/images/about/${getData.img_name}`}
                alt=""
              />
              <IconButton
                color="primary"
                aria-label="delete picture"
                component="span"
                onClick={() => deleteDataImg(getData.id)}
              >
                <Delete />
              </IconButton>{" "}
            </>
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
                <label htmlFor="about__img">
                  <Input
                    onChange={handleFileUpload}
                    accept="image/*"
                    id="about__img"
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
            value={data.aboutImageAlt || ""}
            onChange={handleChange}
            {...altProps}
          />

          <TextField
            value={aboutTitle || ""}
            onChange={handleChange}
            {...titleProps}
          />

          <TextField
            value={aboutSubTitle || ""}
            onChange={handleChange}
            {...subtitleProps}
          />

          <TextField
            value={aboutText || ""}
            onChange={handleChange}
            {...textProps}
          />

          <TextField
            value={aboutText2 || ""}
            onChange={handleChange}
            {...text2Props}
          />

          <TextField
            value={listingItem}
            onChange={handleChange}
            {...listingProps}
          />

          <Button
            onClick={handleListingBtn}
            sx={{ fontSize: "2rem", minWidth: "40px", lineHeight: "1" }}
          >
            +
          </Button>

          {getData && getData ? (
            <Button onClick={(e) => handleUpdate(e, id)} {...updateBtnProps}>
              {updateBtnProps.value}
            </Button>
          ) : (
            <Button {...submitBtnProps}>{submitBtnProps.value}</Button>
          )}
        </div>
      </Box>

      <Box sx={{ width: "100%" }}>
        <Stack spacing={2}>
          {getListing &&
            getListing.map(
              (item) =>
                item.title && (
                  <Item key={item.id}>
                    <TextField
                      defaultValue={item.title}
                      onChange={handleUpdateChange}
                      {...listingProps}
                    />
                    <Edit
                      color="error"
                      onClick={(e) => updateListing(e, item.id)}
                    />
                    <Delete
                      color="error"
                      onClick={(e) => deleteListingBtn(e, item.id)}
                    />
                  </Item>
                )
            )}
        </Stack>
      </Box>
    </>
  );
};

export default AboutBox;
