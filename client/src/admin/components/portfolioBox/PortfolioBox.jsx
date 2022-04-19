import * as React from "react";
import { useEffect, useState } from "react";
import {
  Autocomplete,
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

  const [data, setData] = useState({
    portfolioTitle: "",
    portfolioText: "",
    portfolioImageAlt: "",
    portfolioIconClass: "",
  });
  const [updateData, setUpdateData] = useState([]);
  const [category, setCategory] = useState({
    cat_id: "0",
    label: "Egyéb kategória",
  });
  const [updateCategory, setUpdateCategory] = useState({});
  const [resMessage, setResMessage] = useState({});

  const {
    portfolioTitle,
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
    setUpdateData(
      getData
    );

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
    formData.append("portfolioText", portfolioText);
    formData.append("portfolioImageAlt", portfolioImageAlt);
    formData.append("portfolioIconClass", portfolioIconClass);
    formData.append("portfolioCategoryName", category.label);
    formData.append("portfolioCategoryID", category.cat_id);

    dispatch(loadCreateData(formData));
    dispatch(loadGetData());
    setData({
      portfolioTitle: "",
      portfolioText: "",
      portfolioImageAlt: "",
      portfolioIconClass: "",
      file: "",
      filename: "",
    });
  };

  const handleUpdate = (e, id) => {
    e.preventDefault();

    const formData = new FormData();

    console.log(id)

    formData.append("portfolioImg", updateData.file);
    formData.append("portfolioTitle", updateData.portfolioTitle);
    formData.append("portfolioText", updateData.portfolioText);
    formData.append("portfolioImageAlt", updateData.portfolioImageAlt);
    formData.append("portfolioIconClass", updateData.portfolioIconClass);
    formData.append("portfolioCategoryName", updateCategory.label);
    formData.append("portfolioCategoryID", updateCategory.cat_id);

    dispatch(loadUpdateData(formData, id));
    dispatch(loadGetData());
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
    setUpdateData({});
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
        <div className="configBox__content">
          {data.filename ? (
            <Stack direction="row" alignItems="center" spacing={2}>
              {data.filename}
              <IconButton
                color="primary"
                aria-label="delete picture"
                component="span"
                onClick={deleteFileName}
              >
                <Delete />
              </IconButton>
              <Autocomplete
                defaultValue={
                  (category && category.portfolioCategoryName) || null
                }
                onChange={(event, newValue) => {
                  setCategory(newValue);
                }}
                id="controllable-states-demo"
                options={categories}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Kategóriák" />
                )}
              />
            </Stack>
          ) : (
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
          )}

          <TextField
            value={portfolioImageAlt}
            onChange={handleChange}
            {...altProps}
          />

          <TextField
            value={portfolioTitle}
            onChange={handleChange}
            {...titleProps}
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
                  </IconButton>

                  <Autocomplete
                    defaultValue={
                      (updateCategory &&
                        updateCategory.portfolioCategoryName) ||
                      null
                    }
                    onChange={(event, newValue) => {
                      setUpdateCategory(newValue);
                    }}
                    id="controllable-states-demo"
                    options={categories}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label={item.category_name} />
                    )}
                  />
                </>
              ) : (
                <>
                  {console.log(updateData)}

                  <Stack direction="row" alignItems="center" spacing={2}>
                    {updateData.filename}
                    <IconButton
                      color="primary"
                      aria-label="delete picture"
                      component="span"
                      onClick={deleteFileName}
                    >
                      <Delete />
                    </IconButton>
                    <Autocomplete
                      defaultValue={
                        (updateCategory &&
                          updateCategory.portfolioCategoryName) ||
                        null
                      }
                      onChange={(event, newValue) => {
                        setUpdateCategory(newValue);
                      }}
                      id="controllable-states-demo"
                      options={categories}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Kategóriák" />
                      )}
                    />
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

const categories = [
  { cat_id: "0", label: "Egyéb kategória" },
  { cat_id: "1", label: "Kutya" },
  { cat_id: "2", label: "Macska" },
  { cat_id: "3", label: "Papagáj" },
];
