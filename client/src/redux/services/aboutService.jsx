import apiClient from "../../api/apiClient";

const service = () => {
  const getData= () => apiClient().get(`/getAbout`);
  const createData= (data) => apiClient().post(`/createAbout`, data);
  const updateData= (data,id) => apiClient().put(`/updateAbout/${id}`, data);
  const deleteDataImg= (id) => apiClient().put(`/deleteAboutImg/${id}`);
  
  const getListing= () => apiClient().get(`/getListing`);
  const createListing= (data) => apiClient().post(`/createListing`, data);
  const updateListing= (data, id) => apiClient().put(`/updateListing/${id}`, data);
  const deleteListing= (id) => apiClient().delete(`/deleteListing/${id}`);

  return {
    getData,
    createData,
    updateData,
    deleteDataImg,
    getListing,
    createListing,
    updateListing,
    deleteListing
  };
};

export default service;
