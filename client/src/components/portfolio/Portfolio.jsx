import React, { useEffect, useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { Box, CardActionArea } from "@mui/material";
import {
  loadGetData,
  loadGetCategory,
} from "../../redux/sections/portfolio.section/reducers/thunks";
import { useDispatch, useSelector } from "react-redux";

import portfolio1 from "../../img/portfolio-1.jpg";
import Categories from "../categories/Categories";

const Portfolio = () => {
  const { REACT_APP_BACKEND_IMAGES_URL } = process.env;

  const dispatch = useDispatch();
  const { getData, getCategory, getCategoryMenuItems } = useSelector(
    (state) => state.portfolio
  );

  const [data, setData] = useState([]);
  const [category, setCategory] = useState(null);
  const [categoryMenuItems, setCategoryMenuItems] = useState([]);

  const [changeCategory, setChangeCategory] = useState(false);

  // if (resCategory == 'undefined') {
  //   localStorage.removeItem("resultCategory");
  //   resCategory = null;
  // }

  useEffect(() => {
    dispatch(loadGetData());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadGetCategory());
  }, [dispatch]);

  useEffect(() => {
    setData(getData);
  }, [getData]);

  useEffect(() => {
    setCategory(getCategory);
  }, [getCategory]);

  useEffect(() => {
    setCategoryMenuItems(getCategoryMenuItems);
  }, [getCategoryMenuItems]);

  const allCategory = () => {
    localStorage.removeItem("resultCategory");
    setChangeCategory(false);
    dispatch(loadGetCategory());
  };

  const filterResults = (id) => {
    setChangeCategory(true);
    dispatch(loadGetCategory(id + 1));
    dispatch(loadGetData());
  };

  if (getCategory !== undefined) {
    let ObjToString = JSON.stringify(getCategory);
    localStorage.setItem("resultCategory", ObjToString);
  }

  let stringObj = localStorage.getItem("resultCategory");
  let resCategory = JSON.parse(stringObj);

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
            <ul className="d-flex list-inline mb-0" id="portfolio-flters">
              <CardActionArea
                className="btn btn-outline-primary bg-white p-2 active mx-2 mb-4"
                data-filter="*"
                onClick={allCategory}
              >
                <img
                  src={portfolio1}
                  style={{ width: "150px", height: "100px" }}
                />
                <div
                  className="position-absolute top-0 start-0 end-0 bottom-0 m-2 d-flex align-items-center justify-content-center"
                  style={{ background: "rgba(4, 15, 40, .3)" }}
                >
                  <h6 className="text-white text-uppercase m-0">Összes Kép</h6>
                </div>
              </CardActionArea>
              {categoryMenuItems &&
                categoryMenuItems.map((item, key) => (
                  <CardActionArea
                    key={key}
                    className="btn btn-outline-primary bg-white p-2 active mx-2 mb-4"
                    data-filter="*"
                    onClick={() => filterResults(key)}
                  >
                    <img
                      src={portfolio1}
                      style={{ width: "150px", height: "100px" }}
                    />
                    <div
                      className="position-absolute top-0 start-0 end-0 bottom-0 m-2 d-flex align-items-center justify-content-center"
                      style={{ background: "rgba(4, 15, 40, .3)" }}
                    >
                      <h6 className="text-white text-uppercase m-0">
                        {item.category_name}
                      </h6>
                    </div>
                  </CardActionArea>
                ))}
            </ul>
          </div>
        </div>
      </div>
      {changeCategory ? (
        <Categories category={resCategory} />
      ) : (
        <Categories category={data} />
      )}
    </div>
  );
};

export default Portfolio;
