import * as actionType from "./actionTypes";

const createData = (getData) => ({
  type: actionType.CREATE_DATA,
  payload: getData,
});

const deleteData = () => ({
  type: actionType.DELETE_DATA,
});

const message = (message) => ({
  type: actionType.MESSAGE,
  payload: message,
});

const actions = {
  createData,
  deleteData,
  message,
};

export default actions;
