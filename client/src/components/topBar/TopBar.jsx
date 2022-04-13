import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGetData } from "../../redux/sections/admin.section/reducers/thunks";

const TopBar = () => {
  const dispatch = useDispatch();
  const { getData } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(loadGetData());
  }, [dispatch]);

  return (
    <div className="container-fluid px-5 d-none d-lg-block">
      <div className="row gx-5">
        <div className="col-lg-4 text-center py-3">
          <div className="d-inline-flex align-items-center">
            <i className="bi bi-geo-alt fs-1 text-primary me-3"></i>
            <div className="text-start">
              <h6 className="text-uppercase fw-bold">cég székhelye</h6>
              <span>{getData && getData.address}</span>
            </div>
          </div>
        </div>
        <div className="col-lg-4 text-center border-start border-end py-3">
          <div className="d-inline-flex align-items-center">
            <i className="bi bi-envelope-open fs-1 text-primary me-3"></i>
            <div className="text-start">
              <h6 className="text-uppercase fw-bold">e-mail cím</h6>
              <span>{getData && getData.email}</span>
            </div>
          </div>
        </div>
        <div className="col-lg-4 text-center py-3">
          <div className="d-inline-flex align-items-center">
            <i className="bi bi-phone-vibrate fs-1 text-primary me-3"></i>
            <div className="text-start">
              <h6 className="text-uppercase fw-bold">Telefonszám</h6>
              <span>{getData && getData.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
