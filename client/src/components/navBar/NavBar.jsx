import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="container-fluid sticky-top bg-dark bg-light-radial shadow-sm px-5 pe-lg-0">
      <nav className="navbar navbar-expand-lg bg-dark bg-light-radial navbar-dark py-3 py-lg-0">
        <Link to="/" className="navbar-brand">
          <h1 className="m-0 display-4 text-uppercase text-white">
            <i className="bi bi-building text-primary me-2"></i>WEB INGATLAN
          </h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
            <Link to="/" className="nav-item nav-link active">
              Home
            </Link>
            <Link to="about" className="nav-item nav-link">
              About
            </Link>
            <Link to="service" className="nav-item nav-link">
              Service
            </Link>
            {/* <div className="nav-item dropdown">
              <Link
                to="#"
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Pages
              </Link>
              <div className="dropdown-menu m-0">
                <Link to="project.html" className="dropdown-item">
                  Our Project
                </Link>
                <Link to="team.html" className="dropdown-item">
                  The Team
                </Link>
                <Link to="testimonial.html" className="dropdown-item">
                  Testimonial
                </Link>
                <Link to="blog.html" className="dropdown-item">
                  Blog Grid
                </Link>
                <Link to="detail.html" className="dropdown-item">
                  Blog Detail
                </Link>
              </div>
            </div> */}
            <Link to="/contact" className="nav-item nav-link">
              Contact
            </Link>
            <Link
              to=""
              className="nav-item nav-link bg-primary text-white px-5 ms-3 d-none d-lg-block"
            >
              Get A Quote <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
