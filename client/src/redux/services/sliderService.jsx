import apiClient from "../../api/apiClient";

const service = () => {
  const getData= () => apiClient().get(`/getSlider`);
  const createData= (data) => apiClient().post(`/createSlider`, data);
  const updateData= (data,id) => apiClient().put(`/updateSlider/${id}`, data);
  const deleteDataImg= (id) => apiClient().put(`/deleteSliderImg/${id}`);

  return {
    getData,
    createData,
    updateData,
    deleteDataImg
  };
};

export default service;
