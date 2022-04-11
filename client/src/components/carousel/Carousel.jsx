import React, { useEffect } from "react";
import "./carousel.css";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { loadGetData } from "../../redux/slider/reducers/thunks";

import carousel1 from "../../img/carousel-1.jpg";
import carousel2 from "../../img/carousel-2.jpg";

const Carousel = () => {
  const dispatch = useDispatch();
  const { getData } = useSelector((state) => state.slider);

  useEffect(() => {
    dispatch(loadGetData());
  }, [dispatch]);

  return (
    <Swiper
      id="home__carousel"
      navigation={true}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Navigation, Autoplay]}
      className="mySwiper"
    >
      {getData &&
        getData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="img__frame">
              <img
                height="700"
                src={`http://localhost:5555/static/images/slider/${item.img_name}`}
                alt=""
              />
            </div>
            <div className="carousel__text">
              <i className="fa fa-home fa-4x text-primary mb-4 d-none d-sm-block"></i>
              <h3 className="display-2 text-uppercase text-white mb-md-4">
                {item.title}
              </h3>
              <Link to="#" className="btn btn-primary py-md-3 px-md-5 mt-2">
                Get A Quote
              </Link>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Carousel;
