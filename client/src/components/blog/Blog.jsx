import React from "react";
import blog1 from "../../img/blog-1.jpg";
import blog2 from "../../img/blog-2.jpg";
import blog3 from "../../img/blog-3.jpg";
import user from "../../img/user.jpg";


const Blog = () => {
  return (
    <div className="container-fluid py-6 px-5">
      <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
        <h1 className="display-5 text-uppercase mb-4">
          Latest <span className="text-primary">Articles</span> From Our Blog
          Post
        </h1>
      </div>
      <div className="row g-5">
        <div className="col-lg-4 col-md-6">
          <div className="bg-light">
            <img className="img-fluid" src={blog1} alt="" />
            <div className="p-4">
              <div className="d-flex justify-content-between mb-4">
                <div className="d-flex align-items-center">
                  <img
                    className="rounded-circle me-2"
                    src={user}
                    width="35"
                    height="35"
                    alt=""
                  />
                  <span>John Doe</span>
                </div>
                <div className="d-flex align-items-center">
                  <span className="ms-3">
                    <i className="far fa-calendar-alt text-primary me-2"></i>01
                    Jan, 2045
                  </span>
                </div>
              </div>
              <h4 className="text-uppercase mb-3">
                Rebum diam clita lorem erat magna est erat
              </h4>
              <a className="text-uppercase fw-bold" href="">
                Read More <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="bg-light">
            <img className="img-fluid" src={blog2} alt="" />
            <div className="p-4">
              <div className="d-flex justify-content-between mb-4">
                <div className="d-flex align-items-center">
                  <img
                    className="rounded-circle me-2"
                    src={user}
                    width="35"
                    height="35"
                    alt=""
                  />
                  <span>John Doe</span>
                </div>
                <div className="d-flex align-items-center">
                  <span className="ms-3">
                    <i className="far fa-calendar-alt text-primary me-2"></i>01
                    Jan, 2045
                  </span>
                </div>
              </div>
              <h4 className="text-uppercase mb-3">
                Rebum diam clita lorem erat magna est erat
              </h4>
              <a className="text-uppercase fw-bold" href="">
                Read More <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6">
          <div className="bg-light">
            <img className="img-fluid" src={blog3} alt="" />
            <div className="p-4">
              <div className="d-flex justify-content-between mb-4">
                <div className="d-flex align-items-center">
                  <img
                    className="rounded-circle me-2"
                    src={user}
                    width="35"
                    height="35"
                    alt=""
                  />
                  <span>John Doe</span>
                </div>
                <div className="d-flex align-items-center">
                  <span className="ms-3">
                    <i className="far fa-calendar-alt text-primary me-2"></i>01
                    Jan, 2045
                  </span>
                </div>
              </div>
              <h4 className="text-uppercase mb-3">
                Rebum diam clita lorem erat magna est erat
              </h4>
              <a className="text-uppercase fw-bold" href="">
                Read More <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
