import DataService from "../../services/fileUploadService";
import actions from "../actions/action";

// export const loadFileUpload = (fileUpload) => (dispatch) => {
//   DataService().fileUpload(fileUpload)
//     .then((res) => {
//       console.log(res)
//       dispatch(actions.fileUpload(res.data));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   };

export const loadFileUpload = (data) => (dispatch) => {
  DataService()
    .createData(data)
    .then((res) => {
      // if (res.data.error_message) {
      //   dispatch(actions.message(res.data));
      // } else {
      //   dispatch(actions.message(res.data));
      // }

      // setTimeout(() => {
      //   dispatch(actions.message(undefined));
      // }, messageTimer);

      dispatch(actions.createData(res.data));
    })
    .catch((err) => {
      console.log(err);
    });
};
