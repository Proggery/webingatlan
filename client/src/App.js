import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";

// LAYOUT
import HomeLayout from "./layouts/HomeLayout";
import AdminLayout from "./layouts/AdminLayout";

// PAGES
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicePage from "./pages/ServicePage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./admin/Admin";

const homePage = (
  <HomeLayout>
    <HomePage />
  </HomeLayout>
);
const aboutPage = (
  <HomeLayout>
    <AboutPage />
  </HomeLayout>
);
const servicePage = (
  <HomeLayout>
    <ServicePage />
  </HomeLayout>
);
const contactPage = (
  <HomeLayout>
    <ContactPage />
  </HomeLayout>
);
const adminPage = (
  <AdminLayout>
    <AdminPage />
  </AdminLayout>
);

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route exact path="/" element={homePage} />
          <Route path="about" element={aboutPage} />
          <Route path="service" element={servicePage} />
          <Route path="contact" element={contactPage} />
          <Route path="admin" element={adminPage} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
