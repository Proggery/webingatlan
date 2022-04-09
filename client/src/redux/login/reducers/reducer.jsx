import * as actionType from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case actionType.GET_DATA:
      return {
        ...state,
        isSuccess: true,
        getData: payload,
      };
    case actionType.CREATE_DATA:
      return {
        ...state,
        isSuccess: true,
        user: payload,
      };
    case actionType.UPDATE_DATA:
      return {
        ...state,
      };
    case actionType.ERROR:
      return {
        ...state,
        isSuccess: false,
        error: payload,
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
