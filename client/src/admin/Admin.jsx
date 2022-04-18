import * as React from "react";
import "./css/admin.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled, Paper, Box, Container, Button } from "@mui/material";
import Login from "./components/login/Login";
import AccountBox from "./components/accountBox/AccountBox";
import AdminBox from "./components/adminBox/AdminBox";
import SliderBox from "./components/sliderBox/SliderBox";
import AboutBox from "./components/aboutBox/AboutBox";
import ServicesBox from "./components/servicesBox/ServicesBox";
import PortfolioBox from "./components/portfolioBox/PortfolioBox";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  lineHeight: "60px",
}));

const Admin = () => {
  const navigate = useNavigate();
  const { isSuccess } = useSelector((state) => state.login);
  const successSave = localStorage.getItem("success");

  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setSuccess(isSuccess);
  },[]);

  const handleLogout = () => {
    localStorage.removeItem("success");
    localStorage.removeItem("id");
    navigate("/admin")
  };

  return (
    <Container id="admin" sx={{ mt: 8 }}>
      {success || successSave === "true" ? (
        <Box className="admin__content">
          <Button onClick={handleLogout}>kilépés</Button>
          {/* <Item className="header__box__item" sx={{ p: "30px" }}>
            <HeaderBox />
          </Item>
          <Item className="share__box__item" sx={{ p: "30px" }}>
            <ShareBox />
          </Item> */}
          <Item className="" sx={{ p: "30px" }}>
            <PortfolioBox />
          </Item>
          <Item className="" sx={{ p: "30px" }}>
            <ServicesBox />
          </Item>
          <Item className="" sx={{ p: "30px" }}>
            <AboutBox />
          </Item>
          <Item className="" sx={{ p: "30px" }}>
            <AccountBox />
          </Item>
          <Item className="" sx={{ p: "30px" }}>
            <SliderBox />
          </Item>
          <Item className="" sx={{ p: "30px" }}>
            <AdminBox />
          </Item>
        </Box>
      ) : (
        <Box className="admin__content">
          <Login />
        </Box>
      )}
    </Container>
  );
};

export default Admin;