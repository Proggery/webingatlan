import apiClient from "../../api/apiClient";

const service = () => {
  const getData= () => apiClient().get(`/getSlider`);
  const createData= (data) => apiClient().post(`/createSlider`, data);
  const updateData= (data,id) => apiClient().put(`/updateSlider/${id}`, data);
  const deleteData= (id) => apiClient().put(`/deleteSlider/${id}`);

  return {
    getData,
    createData,
    updateData,
    deleteData
  };
};

export default service;
