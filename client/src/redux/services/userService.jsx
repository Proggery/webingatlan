import apiClient from "../../api/apiClient";

const service = () => {
  const getData= () => apiClient().get(`/getUser`);
  const createData= (data) => apiClient().post(`/createUser`, data);
  const updateData= (data,id) => apiClient().put(`/updateUser/${id}`, data);
  const deleteData= (id) => apiClient().put(`/deleteUser/${id}`);

  return {
    getData,
    createData,
    updateData,
    deleteData
  };
};

export default service;
