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
const deleteDataImg = () => ({
  type: actionType.DELETE_DATA_IMG,
});
const message = (message) => ({
  type: actionType.MESSAGE,
  payload: message,
});

const getListing = (getListing) => ({
  type: actionType.GET_DATA_LISTING,
  payload: getListing,
});
const createListing = () => ({
  type: actionType.CREATE_DATA_LISTING,
});
const updateListing = () => ({
  type: actionType.UPDATE_DATA_LISTING,
});
const deleteListing = () => ({
  type: actionType.DELETE_DATA_LISTING,
});

const actions = {
  getData,
  createData,
  updateData,
  deleteDataImg,
  message,
  getListing,
  createListing,
  updateListing,
  deleteListing,
};

export default actions;
