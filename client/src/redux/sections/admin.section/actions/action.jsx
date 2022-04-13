import * as actionType from "./actionTypes";

const getData = (getData) => ({
  type: actionType.GET_DATA,
  payload: getData,
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
  createData,
  updateData,
  message,
};

export default actions;
