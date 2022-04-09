import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { loadFileUpload } from "../../../redux/fileUpload/reducers/thunks";

const Input = styled("input")({
  display: "none",
});

const FileUpload = () => {
  const dispatch = useDispatch();
  const { createData } = useSelector((state) => state.fileUpload);

  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");
  const [alt, setAlt] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [uploadFile, setUploadFile] = useState({});

  useEffect(() => {
    if (createData) {
      setUploadFile(createData);
    }
  }, [createData]);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("alt", alt);

    dispatch(loadFileUpload(formData));
    setFile("");
    setFilename("");
    setAlt("");
  };

  const deleteFileName = () => {
    setFile("");
    setFilename("");
    setAlt("");
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        method="POST"
        noValidate
        autoComplete="off"
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          {filename && (
            <div>
              {filename}
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
          <label htmlFor="file__upload">
            <Input
              onChange={handleChange}
              accept="image/*"
              id="file__upload"
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
            id="standard-basic"
            label="kép leírás"
            variant="standard"
            onChange={(e) => setAlt(e.target.value)}
            value={alt}
          />
        </Stack>
        <Button variant="outlined" type="submit" value="Feltölt">
          Feltölt
        </Button>
      </Box>
    </>
  );
};

export default FileUpload;
