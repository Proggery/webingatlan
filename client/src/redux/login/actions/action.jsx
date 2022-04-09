// import * as actionType from "./actionTypes";

// const loginGetData = (getData) => ({
//   type: actionType.LOGIN_GETDATA,
//   payload: getData,
// });
// const loginSuccess = (user) => ({
//   type: actionType.LOGIN_SUCCESS,
//   payload: user,
// });
// const loginUpdate = () => ({
//   type: actionType.LOGIN_UPDATE,
// });
// const loginError = (error) => ({
//   type: actionType.LOGIN_ERROR,
//   payload: error,
// });
// const message = (message) => ({
//   type: actionType.MESSAGE,
//   payload: message,
// });

// const actions = {
//   loginGetData,
//   loginSuccess,
//   loginUpdate,
//   loginError,
//   message
// };

// export default actions;


import * as actionType from "./actionTypes";

const getData = (getData) => ({
  type: actionType.GET_DATA,
  payload: getData,
});
const createData = (user) => ({
  type: actionType.CREATE_DATA,
  payload: user,
});
const updateData = () => ({
  type: actionType.UPDATE_DATA,
});
const error = (error) => ({
  type: actionType.ERROR,
  payload: error,
});
const message = (message) => ({
  type: actionType.MESSAGE,
  payload: message,
});

const actions = {
  getData,
  createData,
  updateData,
  error,
  message
};

export default actions;

