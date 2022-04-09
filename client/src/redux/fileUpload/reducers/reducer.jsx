import * as actionType from "../actions/actionTypes";
import initialState from "./initialState";

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actionType.CREATE_DATA:
      return {
        ...state,
        getData: payload,
      };
    case actionType.DELETE_DATA:
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
