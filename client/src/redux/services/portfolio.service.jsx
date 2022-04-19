import apiClient from "../../api/apiClient";

const service = () => {
  const getData= () => apiClient().get(`/getPortfolio`);
  const getCategory= (id) => apiClient().get(`/getCategory/${id}`);
  const createData= (data) => apiClient().post(`/createPortfolio`, data);
  const updateData= (data,id) => apiClient().put(`/updatePortfolio/${id}`, data);
  const deleteDataImg= (id) => apiClient().put(`/deletePortfolioImg/${id}`);
  return {
    getData,
    getCategory,
    createData,
    updateData,
    deleteDataImg,
  };
};

export default service;
