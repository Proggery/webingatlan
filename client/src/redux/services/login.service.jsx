import apiClient from "../../api/apiClient";

const service = () => {
  const getData= () => apiClient().get(`/getLogin`);
  const createData= (data) => apiClient().post(`/createLogin`, data);
  const updateData= (data, id) => apiClient().put(`/updateLogin/${id}`, data);

  return {
    getData,
    createData,
    updateData,
  };
};

export default service;
