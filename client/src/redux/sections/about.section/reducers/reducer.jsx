import * as actionType from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.GET_DATA:
      return {
        ...state,
        getData: payload,
      };
    case actionType.GET_DATA_LISTING:
      return {
        ...state,
        getListing: payload,
      };
    case actionType.CREATE_DATA:
    case actionType.UPDATE_DATA:
    case actionType.DELETE_DATA_IMG:
    case actionType.CREATE_DATA_LISTING:
    case actionType.UPDATE_DATA_LISTING:
    case actionType.DELETE_DATA_LISTING:
      return {
        ...state,
      };
    case actionType.MESSAGE:
      return {
        ...state,
        message: payload,
      };

    default:
      return state;
  }
};

export default reducer;
