import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import logo from "../../../assets/sukamaju.png";
import CONFIG from "../../Api/config";

function RegisterUser() {
  const [nik, setNIK] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    const villagers = {
      nik,
      email,
      name,
      password,
      account_state: "Pending",
    };

    console.log(villagers);
    try {
      const response = await axios.post(
        `${CONFIG.BASE_URL}/u/cUsers`,
        villagers
      );
      console.log(response);
      console.log(response.data);
      if (response.status === 200) {
        Swal.fire("Congrats", "Villagers Created Successfully", "success").then(
          (result) => {
            window.location.href = "/loguser";
          }
        );
      } else {
        Swal.fire("Oops", "Something went wrong", "error");
      }
    } catch (error) {
      Swal.fire("Oops", "Something went wrong", "error");
      console.log(error);
    }
  }

  const isFormValid = () => {
    return nik !== "" && email !== "" && name !== "" && password !== "";
  };

  const isEmailValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <Container className="container">
      <div className="header">
        <div className="backbutton">
          <Link to="/home">
            <IoArrowBackOutline size={30} color="white" />
          </Link>
        </div>
      </div>
      <Row className="justify-content-center mt-5 mb-5">
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
                <h2>Villagers</h2>
                <input
                  type="text"
                  className="form-control"
                  placeholder="NIK"
                  value={nik}
                  onChange={(e) => {
                    setNIK(e.target.value);
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {!isEmailValid() && (
                  <p className="text-danger">
                    Please enter a valid Gmail address
                  </p>
                )}
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <Button
                  className="btn btn-primary mt-3"
                  onClick={register}
                  disabled={!isFormValid() || !isEmailValid()}
                >
                  Register
                </Button>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterUser;
