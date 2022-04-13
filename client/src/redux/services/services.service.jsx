import apiClient from "../../api/apiClient";

const service = () => {
  const getData= () => apiClient().get(`/getServices`);
  const createData= (data) => apiClient().post(`/createServices`, data);
  const updateData= (data,id) => apiClient().put(`/updateServices/${id}`, data);
  const deleteDataImg= (id) => apiClient().put(`/deleteServicesImg/${id}`);
  return {
    getData,
    createData,
    updateData,
    deleteDataImg,
  };
};

export default service;
