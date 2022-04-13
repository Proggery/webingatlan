import { combineReducers } from "redux";
import sliderReducer from "../sections/slider.section/reducers/reducer";
import loginReducer from "../sections/login.section/reducers/reducer";
import adminReducer from "../sections/admin.section/reducers/reducer";
import aboutReducer from "../sections/about.section/reducers/reducer";
import servicesReducer from "../sections/services.section/reducers/reducer";

const state = () =>
  combineReducers({
    slider: sliderReducer,
    login: loginReducer,
    admin: adminReducer,
    about: aboutReducer,
    services: servicesReducer,
  });

export default state;
