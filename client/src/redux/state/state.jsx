import { combineReducers } from "redux";
import fileUploadReducer from "../fileUpload/reducers/reducer";
import userReducer from "../user/reducers/reducer";
import loginReducer from "../login/reducers/reducer";
import adminReducer from "../admin/reducers/reducer";

const state = () =>
  combineReducers({
    fileUpload: fileUploadReducer,
    user: userReducer,
    login: loginReducer,
    admin: adminReducer,
  });

export default state;
