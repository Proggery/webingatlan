import { Box } from "@mui/system";
import React, { useState } from "react";
import Lightbox from "react-image-lightbox";

const Categories = (props) => {
  const { category } = props;
  const { REACT_APP_BACKEND_IMAGES_URL } = process.env;

  const [lightBox, setLightBox] = useState({
    photoIndex: 0,
    isOpen: false,
  });
  const { photoIndex, isOpen } = lightBox;
  const lightBoxClass = {
    overlay: {
      zIndex: 2000,
    },
  };

  return (
    <>
      <div className="row g-5 portfolio-container">
        {category &&
          category.map((item, key) => (
            <div
              key={key}
              className="col-xl-4 col-lg-6 col-md-6 portfolio-item first"
            >
              <div className="position-relative portfolio-box">
                <img
                  className="img-fluid w-100"
                  src={`${REACT_APP_BACKEND_IMAGES_URL}/portfolio/${item.img_name}`}
                  alt=""
                />
                <a className="portfolio-title shadow-sm" href="">
                  <p className="h4 text-uppercase">{item.title}</p>
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
                      isOpen: true,
                      photoIndex: key,
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
            mainSrcThumbnail={`${REACT_APP_BACKEND_IMAGES_URL}/portfolio/${category[photoIndex].img_name}`}
            reactModalStyle={lightBoxClass}
            mainSrc={`${REACT_APP_BACKEND_IMAGES_URL}/portfolio/${category[photoIndex].img_name}`}
            nextSrc={category[(photoIndex + 1) % category.length]}
            prevSrc={category[(photoIndex + category.length - 1) % category.length]}
            onCloseRequest={() => setLightBox({ ...lightBox, isOpen: false })}
            onMovePrevRequest={() =>
              setLightBox({
                ...lightBox,
                photoIndex: (photoIndex + category.length - 1) % category.length,
              })
            }
            onMoveNextRequest={() =>
              setLightBox({
                ...lightBox,
                photoIndex: (photoIndex + 1) % category.length,
              })
            }
          />
        )}
      </Box>
    </>
  );
};

export default Categories;
