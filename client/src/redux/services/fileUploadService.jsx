import apiClient from "../../api/apiClient";

const service = () => {
  const createData = (data) => apiClient().post("/createFileUpload", data);

  return {
    createData,
  };
};

export default service;
