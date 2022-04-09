import React from "react";
import TopBar from "../components/topBar/TopBar";
import NavBar from "../components/navBar/NavBar";
import Footer from "../components/footer/Footer";

const HomeLayout = (props) => {
  return (
    <>
      <TopBar />
      <NavBar />
      {props.children}
      <Footer />
    </>
  );
};

export default HomeLayout;
