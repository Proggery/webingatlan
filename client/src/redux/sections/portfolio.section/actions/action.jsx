import * as actionType from "./actionTypes";

const getData = (getData) => ({
  type: actionType.GET_DATA,
  payload: getData,
});
const getCategory = (getCategory) => ({
  type: actionType.GET_CATEGORY,
  payload: getCategory,
});
const getCategoryMenuItems = (getCategoryMenuItems) => ({
  type: actionType.GET_CATEGORY_MENU_ITEMS,
  payload: getCategoryMenuItems,
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
  getCategory,
  getCategoryMenuItems,
  createData,
  updateData,
  message,
};

export default actions;
