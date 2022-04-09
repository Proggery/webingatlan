import React from "react";
import Carousel from "../components/carousel/Carousel";
import About from "../components/about/About";
import Services from "../components/services/Services";
import Appointment from "../components/appointment/Appointment";
import Portfolio from "../components/portfolio/Portfolio";
import Team from "../components/team/Team";
import Testimonial from "../components/testimonial/Testimonial";
import Blog from "../components/blog/Blog";

const Home = () => {
  return (
    <>
      <Carousel />
      <About />
      <Services />
      <Appointment />
      <Portfolio />
      <Team />
      <Testimonial />
      <Blog />
    </>
  );
};

export default Home;
