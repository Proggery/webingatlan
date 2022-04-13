import apiClient from "../../api/apiClient";

const service = () => {
  const getData= () => apiClient().get(`/getAdmin`);
  const createData= (data) => apiClient().post(`/createAdmin`, data);
  const updateData= (data,id) => apiClient().put(`/updateAdmin/${id}`, data);

  return {
    getData,
    createData,
    updateData,
  };
};

export default service;
