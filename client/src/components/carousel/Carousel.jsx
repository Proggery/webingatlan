import React from "react";
import "./carousel.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import carousel1 from "../../img/carousel-1.jpg";
import carousel2 from "../../img/carousel-2.jpg";

const Carousel = () => {
  return (
    <Swiper
      id="home__carousel"
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
    >
      <SwiperSlide>
        <div className="img__frame">
          <img src={carousel1} alt="" />
        </div>
        <div className="carousel__text">
          <i className="fa fa-home fa-4x text-primary mb-4 d-none d-sm-block"></i>
          <h3 className="display-2 text-uppercase text-white mb-md-4">
            Build Your Dream House With Us
          </h3>
          <Link to="#" className="btn btn-primary py-md-3 px-md-5 mt-2">
            Get A Quote
          </Link>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="img__frame">
          <img src={carousel2} alt="" />
        </div>
        <div className="carousel__text">
          <i class="fa fa-tools fa-4x text-primary mb-4 d-none d-sm-block"></i>
          <h3 class="display-2 text-uppercase text-white mb-md-4">
            We Are Trusted For Your Project
          </h3>
          <Link to="#" class="btn btn-primary py-md-3 px-md-5 mt-2">
            Contact Us
          </Link>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Carousel;
