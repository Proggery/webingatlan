import React, { useEffect, useState } from "react";
import { loadGetData } from "../../redux/sections/services.section/reducers/thunks";

import { useDispatch, useSelector } from "react-redux";

const Services = () => {
  const dispatch = useDispatch();
  const { getData } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(loadGetData());
  }, [dispatch]);

  const [popup, setPopup] = useState(false);

  const showBox = (id) => {
    console.log(id);
  };

  // const getData = [
  //   {
  //     id: 1,
  //     title: "Building Construction",
  //     text: `Duo dolore et diam sed ipsum stet amet duo diam.
  //     Rebum amet utamet sed erat sed sed amet magna elitr amet kasd diam duo`,
  //     img_name: service1,
  //     icon_class: "fa fa-3x fa-building text-primary",
  //   },
  //   {
  //     id: 2,
  //     title: "House Renovation",
  //     text: `Duo dolore et diam sed ipsum stet amet duo diam.
  //     Rebum amet utamet sed erat sed sed amet magna elitr amet kasd diam duo`,
  //     img_name: service2,
  //     icon_class: "fa fa-3x fa-home text-primary",
  //   },
  //   {
  //     id: 3,
  //     title: "Architecture Design",
  //     text: `Duo dolore et diam sed ipsum stet amet duo diam.
  //     Rebum amet utamet sed erat sed sed amet magna elitr amet kasd diam duo`,
  //     img_name: service3,
  //     icon_class: "fa fa-3x fa-drafting-compass text-primary",
  //   },
  //   {
  //     id: 4,
  //     title: "Interior Design",
  //     text: `Duo dolore et diam sed ipsum stet amet duo diam.
  //     Rebum amet utamet sed erat sed sed amet magna elitr amet kasd diam duo`,
  //     img_name: service4,
  //     icon_class: "fa fa-3x fa-palette text-primary",
  //   },
  //   {
  //     id: 5,
  //     title: "Fixing & Support",
  //     text: `Duo dolore et diam sed ipsum stet amet duo diam.
  //     Rebum amet utamet sed erat sed sed amet magna elitr amet kasd diam duo`,
  //     img_name: service5,
  //     icon_class: "fa fa-3x fa-tools text-primary",
  //   },
  //   {
  //     id: 6,
  //     title: "Painting",
  //     text: `Duo dolore et diam sed ipsum stet amet duo diam.
  //     Rebum amet utamet sed erat sed sed amet magna elitr amet kasd diam duo`,
  //     img_name: service6,
  //     icon_class: "fa fa-3x fa-paint-brush text-primary",
  //   },
  // ];

  return (
    <div className="container-fluid bg-light py-6 px-5">
      <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
        <h1 className="display-5 text-uppercase mb-4">
          {/* We Provide <span className="text-primary">The Best</span> Construction
          Services */}
        </h1>
      </div>
      <div className="row g-5">
        {getData &&
          getData.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6">
              <div className="service-item bg-white d-flex flex-column align-items-center text-center">
                <img
                  className="img-fluid"
                  src={item.img_name}
                  alt={item.img_alt}
                />
                <div className="service-icon bg-white">
                  <i className={item.icon_class}></i>
                </div>
                <div className="px-4 pb-4">
                  <h4 className="text-uppercase mb-3">{item.box_title}</h4>
                  <p>{item.text}</p>
                  <button
                    onClick={() => showBox(item.id)}
                    className="btn text-primary"
                  >
                    Read More <i className="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Services;
