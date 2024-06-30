import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";

import AdminPanel from "./components/Admins/AdminPanel";
import LoginAdmins from "./components/Auths/Admins/LoginAdmins";
import RegisterAdmins from "./components/Auths/Admins/RegisterAdmins";
import LoginUser from "./components/Auths/Villagers/LoginUser";
import RegisterUser from "./components/Auths/Villagers/RegisterUser";
import HomeScreen from "./components/Homes/HomeScreen";
import ProfileScreen from "./components/Homes/ProfileScreen";
import ProfileVillageScreen from "./components/Homes/ProfileVillageScreen";
import Welcome from "./components/Homes/WelcomeScreen";
import NavbarPage from "./components/Navs/NavbarPage";
import NavbarUser from "./components/Navs/NavbarUser";
import CreateReporting from "./components/Reportings/CreateReportings";
import DetailsReporting from "./components/Reportings/DetailsReportings";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Welcome />} />
          <Route
            path="/home"
            element={
              <>
                <NavbarUser />
                <HomeScreen />
              </>
            }
          />
          <Route path="/profilevillage" element={<ProfileVillageScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/tambahkeluhan" element={<CreateReporting />} />
          <Route path="/register" element={<RegisterAdmins />} />
          <Route path="/login" element={<LoginAdmins />} />
          <Route path="/reguser" element={<RegisterUser />} />
          <Route path="/loguser" element={<LoginUser />} />

          <Route
            path="/admin"
            element={
              <>
                <NavbarPage />
                <AdminPanel />
              </>
            }
          />
          <Route
            path="/detailkeluhan/:complaint_id"
            element={<DetailsReporting />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
