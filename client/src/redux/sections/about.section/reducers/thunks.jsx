import DataService from "../../../services/about.service";
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
      if (res.error_msg) {
        dispatch(actions.message(res.data));
      } else {
        dispatch(actions.message(res.data));
      }

      setTimeout(() => {
        dispatch(actions.message({}));
      }, messageTimer);
      dispatch(loadGetData());
      dispatch(loadGetListing());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const loadUpdateData = (data, id) => (dispatch) => {
  DataService()
    .updateData(data, id)
    .then((res) => {
      if (res.error_msg) {
        dispatch(actions.message(res.data));
      } else {
        dispatch(actions.message(res.data));
      }

      setTimeout(() => {
        dispatch(actions.message({}));
      }, messageTimer);

      dispatch(loadGetData());
    })
    .catch((err) => {
      console.log(err);
    });
};
export const loadDeleteDataImg = (id) => (dispatch) => {
  DataService()
    .deleteDataImg(id)
    .then((res) => {
      if (res.error_msg) {
        dispatch(actions.message(res.data));
      } else {
        dispatch(actions.message(res.data));
      }

      setTimeout(() => {
        dispatch(actions.message({}));
      }, messageTimer);

      dispatch(loadGetData());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const loadGetListing = () => (dispatch) => {
  DataService()
    .getListing()
    .then((res) => {
      dispatch(actions.getListing(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const loadCreateListing = (data) => (dispatch) => {
  DataService()
    .createListing(data)
    .then((res) => {
      if (res.error_msg) {
        dispatch(actions.message(res.data));
      } else {
        dispatch(actions.message(res.data));
      }

      setTimeout(() => {
        dispatch(actions.message({}));
      }, messageTimer);
      dispatch(loadGetListing());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const loadUpdateListing = (data, id) => (dispatch) => {
  DataService()
    .updateListing(data, id)
    .then((res) => {
      if (res.error_msg) {
        dispatch(actions.message(res.data));
      } else {
        dispatch(actions.message(res.data));
      }

      setTimeout(() => {
        dispatch(actions.message({}));
      }, messageTimer);

      dispatch(loadGetData());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const loadDeleteListing = (id) => (dispatch) => {
  DataService()
    .deleteListing(id)
    .then((res) => {
      if (res.error_msg) {
        dispatch(actions.message(res.data));
      } else {
        dispatch(actions.message(res.data));
      }

      setTimeout(() => {
        dispatch(actions.message({}));
      }, messageTimer);

      dispatch(loadGetListing());
    })
    .catch((err) => {
      console.log(err);
    });
};
