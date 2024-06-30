import React from "react";
import logo from "../../assets/sukamaju.png";
import { Link } from "react-router-dom";

const WelcomeScreen = () => {
  return (
    <div className="welcome-page">
      <div className="wrapper">
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <h2>Welcome To</h2>
        <h1>Public Complaint Information System</h1>
        <h1>Sukamaju Village</h1>
        <h2 className="msk">Login as</h2>
        <div className="button-container">
          <Link to="/home" className="button">
            Villagers
          </Link>

          <Link to="/admin" className="button">
            Village Government
          </Link>
        </div>
        <div className="profile">
          Do you want to see the profile of this village?
          <Link to="/profilevillage"> Village Profile</Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
