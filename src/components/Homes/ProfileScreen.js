/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    Button,
    Card,
    Col,
    Container,
    Modal,
    Nav,
    Row,
    Tab,
} from "react-bootstrap";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";


import CONFIG from "../Api/config";

function ProfileScreen() {
  const [nik, setNik] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const userData = sessionStorage.getItem("villagers");
    if (userData) {
      const { nik, name, email } = JSON.parse(userData);
      setNik(nik);
      setName(name);
      setEmail(email);
    }
  }, []);

  return (
    <Container>
      <div className="header">
        <div className="backbutton">
          <Link to="/home">
            <IoArrowBackOutline size={30} color="white" />
          </Link>
        </div>
        <div className="juduldetailpengaduan">
          <h1>Profile Users</h1>
        </div>
      </div>
      <div className="bs">
        <Tab.Container id="left-tabs-example" defaultActiveKey="history">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="history">History</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="profile">My Profile</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="profile">
                  <Card>
                    <Card.Body>
                      <Card.Title
                        style={{ marginBottom: "30px", fontWeight: "bold" }}
                      >
                        My Profile
                      </Card.Title>
                      <Card.Title className="myprf">NIK</Card.Title>
                      <Card.Text>{nik}</Card.Text>
                      <Card.Title className="myprf">Name</Card.Title>
                      <Card.Text>{name}</Card.Text>
                      <Card.Title className="myprf">Email</Card.Title>
                      <Card.Text>{email}</Card.Text>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="history">
                  <Container>
                    <MyReportings />
                  </Container>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </Container>
  );
}

export default ProfileScreen;

export function MyReportings() {
  const [reportingData, setReportingData] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem("villagers"));
  const userId = userData ? userData.user_id : null;

  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleOpenModal = (report) => {
    setSelectedReport(report);
    setShowModal(true);
  };

  useEffect(() => {
    if (userId) {
      fetchReportingData();
    }
  }, [userId]);

  const fetchReportingData = async () => {
    try {
      const response = await axios.get(
        `${CONFIG.BASE_URL}/rep/gReporting/user/${userId}`,
        {
          params: {
            userId: userId,
          },
        }
      );
      const data = response.data.data;
      setReportingData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "pending-status-prof";
      case "Accepted":
        return "accepted-status-prof";
      case "Rejected":
        return "rejected-status-prof";
      case "Completed":
        return "completed-status-prof";
      default:
        return null;
    }
  };

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title style={{ fontWeight: "bold" }}>
            Reporting History
          </Card.Title>
          {reportingData.map((report) => (
            <Card key={report.complaint_id} className="my-3">
              <Card.Body>
                <Card.Title
                  className="myprf"
                  style={{
                    marginBottom: "30px",
                    fontWeight: "bold",
                    textAlign: "center",
                    borderBottom: "2px solid #ccc",
                    paddingBottom: "10px",
                  }}
                >
                  {report.complaint_title}
                </Card.Title>
                <Card.Title className="myprf">Name</Card.Title>
                <Card.Text>{report.complainants_name}</Card.Text>
                <Card.Title className="myprf">Category</Card.Title>
                <Card.Text>{report.complaint_category}</Card.Text>
                <Card.Title className="myprf">Description</Card.Title>
                <Card.Text>{report.description}</Card.Text>
                <Card.Title className="myprf">Work Status</Card.Title>
                <Card.Text className={getStatusColor(report.work_status)}>
                  {report.work_status}
                </Card.Text>
                {report.work_status === "Rejected" && (
                  <>
                    <Button
                      onClick={() => handleOpenModal(report)}
                      className="alasanpenolakan w-50 m-auto d-flex justify-content-center"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Lihat Alasan Penolakan
                    </Button>

                    <Modal show={showModal} onHide={handleModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Alasan Penolakan</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        {selectedReport && selectedReport.reason}
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleModal}>
                          Tutup
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>
                )}
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
}
