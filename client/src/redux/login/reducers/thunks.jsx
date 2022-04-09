import DataService from "../../services/loginService";
import actions from "../actions/action";

const messageTimer = 2800;

export const loadGetData = () => (dispatch) => {
  DataService()
    .getData()
    .then((res) => {
      dispatch(actions.getData(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const loadCreateData = (data) => (dispatch) => {
  DataService()
    .createData(data)
    .then((res) => {
      if (res.data.user) {
        localStorage.setItem("success", true);
        localStorage.setItem("id", res.data.user.id);
      } else {
        dispatch(actions.error());
        localStorage.setItem("success", false);
        dispatch(actions.message(res.data.error_msg));
      }
      dispatch(loadGetData())
    })
    .catch((err) => {
      console.log(err);
    });
};

export const loadUpdateData = (data, id) => (dispatch) => {
  DataService()
    .updateData(data, id)
    .then((res) => {
      dispatch(actions.message(res.data))

      setTimeout(() => {
        dispatch(actions.message({}));
      }, messageTimer);

    })
    .catch((err) => {
      console.log(err);
    });
};
