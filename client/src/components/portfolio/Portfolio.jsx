import React from "react";
import portfolio1 from "../../img/portfolio-1.jpg";
import portfolio2 from "../../img/portfolio-2.jpg";
import portfolio3 from "../../img/portfolio-3.jpg";
import portfolio4 from "../../img/portfolio-4.jpg";
import portfolio5 from "../../img/portfolio-5.jpg";
import portfolio6 from "../../img/portfolio-6.jpg";

const Portfolio = () => {
  return (
    <div className="container-fluid bg-light py-6 px-5">
      <div className="text-center mx-auto mb-5" style={{ "maxWidth": "600px" }}>
        <h1 className="display-5 text-uppercase mb-4">
          Some Of Our <span className="text-primary">Popular</span> Dream Projects
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
                <img src={portfolio1} style={{"width": "150px", "height": "100px"}}/>
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
                <img src={portfolio2} style={{"width": "150px", "height": "100px"}}/>
                <div
                  className="position-absolute top-0 start-0 end-0 bottom-0 m-2 d-flex align-items-center justify-content-center"
                  style={{ background: "rgba(4, 15, 40, .3)" }}
                >
                  <h6 className="text-white text-uppercase m-0">Construction</h6>
                </div>
              </li>
              <li
                className="btn btn-outline-primary bg-white p-2 mx-2 mb-4"
                data-filter=".second"
              >
                <img src={portfolio3} style={{"width": "150px", "height": "100px"}}/>
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
        <div className="col-xl-4 col-lg-6 col-md-6 portfolio-item first">
          <div className="position-relative portfolio-box">
            <img className="img-fluid w-100" src={portfolio1} alt=""/>
            <a className="portfolio-title shadow-sm" href="">
              <p className="h4 text-uppercase">Project Name</p>
              <span className="text-body">
                <i className="fa fa-map-marker-alt text-primary me-2"></i>123
                Street, New York, USA
              </span>
            </a>
            <a
              className="portfolio-btn"
              href={portfolio1}
              data-lightbox="portfolio"
            >
              <i className="bi bi-plus text-white"></i>
            </a>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 col-md-6 portfolio-item second">
          <div className="position-relative portfolio-box">
            <img className="img-fluid w-100" src={portfolio2} alt=""/>
            <a className="portfolio-title shadow-sm" href="">
              <p className="h4 text-uppercase">Project Name</p>
              <span className="text-body">
                <i className="fa fa-map-marker-alt text-primary me-2"></i>123
                Street, New York, USA
              </span>
            </a>
            <a
              className="portfolio-btn"
              href={portfolio2}
              data-lightbox="portfolio"
            >
              <i className="bi bi-plus text-white"></i>
            </a>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 col-md-6 portfolio-item first">
          <div className="position-relative portfolio-box">
            <img className="img-fluid w-100" src={portfolio3} alt=""/>
            <a className="portfolio-title shadow-sm" href="">
              <p className="h4 text-uppercase">Project Name</p>
              <span className="text-body">
                <i className="fa fa-map-marker-alt text-primary me-2"></i>123
                Street, New York, USA
              </span>
            </a>
            <a
              className="portfolio-btn"
              href={portfolio3}
              data-lightbox="portfolio"
            >
              <i className="bi bi-plus text-white"></i>
            </a>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 col-md-6 portfolio-item second">
          <div className="position-relative portfolio-box">
            <img className="img-fluid w-100" src={portfolio4} alt=""/>
            <a className="portfolio-title shadow-sm" href="">
              <p className="h4 text-uppercase">Project Name</p>
              <span className="text-body">
                <i className="fa fa-map-marker-alt text-primary me-2"></i>123
                Street, New York, USA
              </span>
            </a>
            <a
              className="portfolio-btn"
              href={portfolio4}
              data-lightbox="portfolio"
            >
              <i className="bi bi-plus text-white"></i>
            </a>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 col-md-6 portfolio-item first">
          <div className="position-relative portfolio-box">
            <img className="img-fluid w-100" src={portfolio5} alt=""/>
            <a className="portfolio-title shadow-sm" href="">
              <p className="h4 text-uppercase">Project Name</p>
              <span className="text-body">
                <i className="fa fa-map-marker-alt text-primary me-2"></i>123
                Street, New York, USA
              </span>
            </a>
            <a
              className="portfolio-btn"
              href={portfolio5}
              data-lightbox="portfolio"
            >
              <i className="bi bi-plus text-white"></i>
            </a>
          </div>
        </div>
        <div className="col-xl-4 col-lg-6 col-md-6 portfolio-item second">
          <div className="position-relative portfolio-box">
            <img className="img-fluid w-100" src={portfolio6} alt=""/>
            <a className="portfolio-title shadow-sm" href="">
              <p className="h4 text-uppercase">Project Name</p>
              <span className="text-body">
                <i className="fa fa-map-marker-alt text-primary me-2"></i>123
                Street, New York, USA
              </span>
            </a>
            <a
              className="portfolio-btn"
              href={portfolio6}
              data-lightbox="portfolio"
            >
              <i className="bi bi-plus text-white"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
