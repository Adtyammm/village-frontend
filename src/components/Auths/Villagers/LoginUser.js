import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import logo from "../../../assets/sukamaju.png";

import { Card, Col, Container, Row } from "react-bootstrap";
import { IoArrowBackOutline } from "react-icons/io5";

import CONFIG from "../../Api/config";

function LoginUser() {
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const credentials = {
      nik,
      password,
    };

    try {
      const response = await axios.post(
        `${CONFIG.BASE_URL}/u/uLogin`,
        credentials
      );

      if (response.status === 200) {
        if (response.data.status === "Success" && response.data.code === 200) {
          const userData = {
            user_id: response.data.user_id,
            nik,
            email: response.data.email,
            name: response.data.name,
            account_state: response.data.account_state,
          };

          sessionStorage.setItem("villagers", JSON.stringify(userData));
          console.log(userData);

          if (userData.account_state === "Verified") {
            Swal.fire("Success", "Login Successful", "success").then(
              (result) => {
                window.location.href = "/home";
              }
            );
          } else if (userData.account_state === "Unverified") {
            Swal.fire(
              "Oops",
              "You are not a resident of Kosar Village. You do not have permission to access this page..",
              "error"
            );
          } else if (userData.account_state === "Pending") {
            Swal.fire(
              "Oops",
              "Your account is pending approval. You do not have permission to access this page..",
              "warning"
            );
          }
        } else {
          Swal.fire("Oops", "Invalid credentials", "error");
        }
      } else {
        Swal.fire("Oops", "Invalid credentials", "error");
      }
    } catch (error) {
      console.error("Error during login:", error); // Tambahkan console.log disini
      Swal.fire("Oops", "Wrong Username and Password", "error");
      console.log(error);
    }
  }

  return (
    <Container className="container">
      <div className="header">
        <div className="backbutton">
          <Link to="/home">
            <IoArrowBackOutline size={30} color="white" />
          </Link>
        </div>
      </div>
      <Row className="justify-content-center mt-5">
        <Col className="col">
          <Card className="cardmodal">
            <Card.Body>
              <Card.Title className="text-center">
                <img className="img-logo" src={logo} alt="" />
                <h2>Welcome to</h2>
                <h1>Public Complaint Information System</h1>
                <h1>Sukamaju Village</h1>
              </Card.Title>
              <Card.Text>
                <h2 className="login_title">Login Villagers</h2>
                <input
                  type="text"
                  className="form-control"
                  placeholder="NIK"
                  value={nik}
                  onChange={(e) => setNik(e.target.value)}
                  name="nik"
                />
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                />
                <button className="btnlogin btn btn-block" onClick={login}>
                  Login
                </button>
                <div className="mt-2 text-center" style={{ color: "black" }}>
                  <Link to="/reguser" className="">
                    Register ? ...
                  </Link>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginUser;
