import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../../assets/subang.png";
import CONFIG from "../../Api/config";

function RegisterAdmins() {
  const [name, setName] = useState("");
  const [nip, setNIP] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    const employee = {
      name,
      nip,
      position,
      status,
      username,
      password,
    };

    try {
      const response = await axios.post(
        `${CONFIG.BASE_URL}/emp/cEmployee`,
        employee
      );
      console.log(response.data);
      if (response.status === 200) {
        Swal.fire("Congrats", "Employee Created Successfully", "success").then(
          (result) => {
            window.location.href = "/login";
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
    return (
      name !== "" &&
      nip !== "" &&
      position !== "" &&
      status !== "" &&
      username !== "" &&
      password !== ""
    );
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
                <h2>Admin</h2>
                <Row>
                  <Col>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="NIP"
                      value={nip}
                      onChange={(e) => {
                        setNIP(e.target.value);
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
                      placeholder="Position"
                      value={position}
                      onChange={(e) => {
                        setPosition(e.target.value);
                      }}
                    />
                  </Col>
                  <Col>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Status"
                      value={status}
                      onChange={(e) => {
                        setStatus(e.target.value);
                      }}
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </Col>
                </Row>

                <Button
                  className="btn btn-primary mt-3"
                  onClick={register}
                  disabled={!isFormValid()}
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

export default RegisterAdmins;
