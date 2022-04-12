import React, { useEffect } from "react";
import signature from "../../img/signature.jpg";
import about from "../../img/about.jpg";
import { loadGetData, loadGetListing } from "../../redux/about/reducers/thunks";
import { useDispatch, useSelector } from "react-redux";
import { Box, Stack } from "@mui/material";

const About = () => {
  const dispatch = useDispatch();
  const { getData, getListing } = useSelector((state) => state.about);

  useEffect(() => {
    dispatch(loadGetData());
    dispatch(loadGetListing());
  }, [dispatch]);

  return (
    <div className="container-fluid py-6 px-5">
      <div className="row g-5">
        <div className="col-lg-7">
          <h1 className="display-5 text-uppercase mb-4">
            {getData && getData.title}
          </h1>
          <h4 className="text-uppercase mb-3 text-body">
            {getData && getData.subtitle}
          </h4>
          <p>
            {getData && getData.text}
          </p>
          <div className="row gx-5 py-2">
            <Box
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
              }}
              className="col-sm-6 mb-2"
            >
              {getListing &&
                getListing.map((item) => (
                  <Stack>
                    <p className="fw-bold mb-2">
                      <i className="fa fa-check text-primary me-3"></i>
                      {item.title}
                    </p>
                  </Stack>
                ))}
              {/* <p className="fw-bold mb-2">
                <i className="fa fa-check text-primary me-3"></i>
              </p>
              <p className="fw-bold mb-2">
                <i className="fa fa-check text-primary me-3"></i>
                
              </p> */}
            </Box>
            {/* <div className="col-sm-6 mb-2">
              <p className="fw-bold mb-2">
                <i className="fa fa-check text-primary me-3"></i>Perfect
                Planning
              </p>
              <p className="fw-bold mb-2">
                <i className="fa fa-check text-primary me-3"></i>Professional
                Workers
              </p>
              <p className="fw-bold mb-2">
                <i className="fa fa-check text-primary me-3"></i>First Working
                Process
              </p>
            </div> */}
          </div>
          <p className="mb-4">{getData && getData.text2}</p>
          <img src={signature} alt="" />
        </div>
        <div className="col-lg-5 pb-5" style={{ minHeight: "400px" }}>
          <div className="position-relative bg-dark-radial h-100 ms-5">
            <img
              className="position-absolute w-100 h-100 mt-5 ms-n5"
              src={`http://localhost:5555/static/images/about/${
                getData && getData.img_name
              }`}
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
