import React, { useEffect, useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { Box } from "@mui/material";
import { loadGetData } from "../../redux/sections/portfolio.section/reducers/thunks";
import { useDispatch, useSelector } from "react-redux";

import portfolio1 from "../../img/portfolio-1.jpg";
import portfolio2 from "../../img/portfolio-2.jpg";
import portfolio3 from "../../img/portfolio-3.jpg";
import portfolio4 from "../../img/portfolio-4.jpg";
import portfolio5 from "../../img/portfolio-5.jpg";
import portfolio6 from "../../img/portfolio-6.jpg";

const Portfolio = () => {
  const { REACT_APP_BACKEND_IMAGES_URL } = process.env;

  const dispatch = useDispatch();
  const { getData } = useSelector((state) => state.portfolio);

  const [lightBox, setLightBox] = useState({
    photoIndex: 0,
    isOpen: false,
  });
  const [images, setImages] = useState();
  const { photoIndex, isOpen } = lightBox;

  const lightBoxClass = {
    overlay: {
      zIndex: 2000,
    },
  };

  useEffect(() => {
    dispatch(loadGetData());
  }, [dispatch]);

  useEffect(() => {
    if (getData) {
      setImages(getData.map((item) => item.img_name));
    }
  }, [getData]);

  console.log(images);

  return (
    <div className="container-fluid bg-light py-6 px-5">
      <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
        <h1 className="display-5 text-uppercase mb-4">
          Some Of Our <span className="text-primary">Popular</span> Dream
          Projects
        </h1>
      </div>

      <div className="row gx-5">
        <div className="col-12 text-center">
          <div className="d-inline-block bg-dark-radial text-center pt-4 px-5 mb-5">
            <ul className="list-inline mb-0" id="portfolio-flters">
              <li
                className="btn btn-outline-primary bg-white p-2 active mx-2 mb-4"
                data-filter="*"
              >
                <img
                  src={portfolio1}
                  style={{ width: "150px", height: "100px" }}
                />
                <div
                  className="position-absolute top-0 start-0 end-0 bottom-0 m-2 d-flex align-items-center justify-content-center"
                  style={{ background: "rgba(4, 15, 40, .3)" }}
                >
                  <h6 className="text-white text-uppercase m-0">All</h6>
                </div>
              </li>
              <li
                className="btn btn-outline-primary bg-white p-2 mx-2 mb-4"
                data-filter=".first"
              >
                <img
                  src={portfolio2}
                  style={{ width: "150px", height: "100px" }}
                />
                <div
                  className="position-absolute top-0 start-0 end-0 bottom-0 m-2 d-flex align-items-center justify-content-center"
                  style={{ background: "rgba(4, 15, 40, .3)" }}
                >
                  <h6 className="text-white text-uppercase m-0">
                    Construction
                  </h6>
                </div>
              </li>
              <li
                className="btn btn-outline-primary bg-white p-2 mx-2 mb-4"
                data-filter=".second"
              >
                <img
                  src={portfolio3}
                  style={{ width: "150px", height: "100px" }}
                />
                <div
                  className="position-absolute top-0 start-0 end-0 bottom-0 m-2 d-flex align-items-center justify-content-center"
                  style={{ background: "rgba(4, 15, 40, .3)" }}
                >
                  <h6 className="text-white text-uppercase m-0">Renovation</h6>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row g-5 portfolio-container">
        {getData &&
          getData.map((item) => (
            <div
              key={item.id}
              className="col-xl-4 col-lg-6 col-md-6 portfolio-item first"
            >
              <div className="position-relative portfolio-box">
                <img
                  className="img-fluid w-100"
                  src={`${REACT_APP_BACKEND_IMAGES_URL}/portfolio/${item.img_name}`}
                  alt=""
                />
                <a className="portfolio-title shadow-sm" href="">
                  <p className="h4 text-uppercase">{item.box_title}</p>
                  <span className="text-body">
                    <i className="fa fa-map-marker-alt text-primary me-2"></i>
                    123
                    {item.text}
                  </span>
                </a>
                <a
                  className="portfolio-btn"
                  type="button"
                  onClick={() =>
                    setLightBox({
                      ...lightBox,
                      isOpen: true,
                      photoIndex: item.id - 1,
                    })
                  }
                >
                  <i className="bi bi-plus text-white"></i>
                </a>
              </div>
            </div>
          ))}
      </div>

      <Box sx={{ paddingTop: "10rem" }}>
        {isOpen && (
          <Lightbox
            mainSrcThumbnail={`${REACT_APP_BACKEND_IMAGES_URL}/portfolio/${images[photoIndex]}`}
            reactModalStyle={lightBoxClass}
            mainSrc={`${REACT_APP_BACKEND_IMAGES_URL}/portfolio/${images[photoIndex]}`}
            nextSrc={images[(photoIndex + 1) % images.length]}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
            onCloseRequest={() => setLightBox({ ...lightBox, isOpen: false })}
            onMovePrevRequest={() =>
              setLightBox({
                ...lightBox,
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              setLightBox({
                ...lightBox,
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
          />
        )}
      </Box>
    </div>
  );
};

export default Portfolio;
