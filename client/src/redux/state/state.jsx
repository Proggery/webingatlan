import { combineReducers } from "redux";
import fileUploadReducer from "../fileUpload/reducers/reducer";
import sliderReducer from "../slider/reducers/reducer";
import loginReducer from "../login/reducers/reducer";
import adminReducer from "../admin/reducers/reducer";

const state = () =>
  combineReducers({
    fileUpload: fileUploadReducer,
    slider: sliderReducer,
    login: loginReducer,
    admin: adminReducer,
  });

export default state;
