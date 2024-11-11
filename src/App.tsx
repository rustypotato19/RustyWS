import React from "react";
import Home from "./components/Home";
import { AboutUs, OurMission } from "./components/About";
import Services from "./components/Services";
import ContactUs from "./components/ContactUs";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Legal from "./components/Legal";
import Request from "./components/Request";
import Separator from "./components/Separator";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Skills from "./components/Skills";
import FindTicket from "./components/TicketViewer";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import Reviews from "./components/Reviews";
import ReviewsPage from "./components/ReviewsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header />
              <Home />
              <Separator />
              <AboutUs />
              <Separator />
              <OurMission />
              <Separator />
              <Services />
              <Separator />
              <Skills />
              <Separator />
              <Request />
              <Separator />
              <FindTicket />
              <Separator />
              <ContactUs />
              <Separator />
              <Reviews />
              <Footer />
            </div>
          }
        />
        <Route
          path="/legal"
          element={
            <div>
              <Header />
              <Legal />
              <Footer />
            </div>
          }
        />
        <Route
          path="/products"
          element={
            <div>
              <Header />
              <Products />
              <Footer />
            </div>
          }
        />
        <Route
          path="/Reviews"
          element={
            <div>
              <Header />
              <ReviewsPage />
              <Footer />
            </div>
          }
        />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
