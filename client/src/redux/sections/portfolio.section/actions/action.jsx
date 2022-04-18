import * as actionType from "./actionTypes";

const getData = (getData) => ({
  type: actionType.GET_DATA,
  payload: getData,
});
const getCategoryData = (getCategoryData) => ({
  type: actionType.GET_CATEGORY_DATA,
  payload: getCategoryData,
});
const createData = () => ({
  type: actionType.CREATE_DATA,
});
const updateData = () => ({
  type: actionType.UPDATE_DATA,
});
const message = (message) => ({
  type: actionType.MESSAGE,
  payload: message,
});

const actions = {
  getData,
  getCategoryData,
  createData,
  updateData,
  message,
};

export default actions;
