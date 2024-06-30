import React, { useEffect, useState } from "react";

import { Container, Row, Col, Nav, Tab } from "react-bootstrap";
import AdminDashboard from "./AdminDashboard";
import AdminReportings from "./AdminReportings";
import AdminReport from "./AdminReport";
import Swal from "sweetalert2";
import AdminUser from "./AdminUser";
import AdminAllUsers from "./AdminAllUsers";

function AdminPanel() {
  const [showAdminContent, setShowAdminContent] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("loggedInUser");
    if (!storedUser) {
      Swal.fire({
        title: "Oops",
        text: "You are not logged in. Please log in to view this page.",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Log In",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/login";
        } else {
          window.location.href = "/";
        }
      });
      return;
    }
    setShowAdminContent(true);
  }, []);

  return (
    <Container className="tampilanadmin">
      {showAdminContent && (
        <Tab.Container id="left-tabs-example" defaultActiveKey="dashboard">
          <Row className="">
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                <h2>
                  <b>Admin Panel</b>
                </h2>
                <Nav.Item>
                  <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="laporan">Reportings</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="villagers">Villagers</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="dashboard">
                  <AdminDashboard />
                </Tab.Pane>
                <Tab.Pane eventKey="laporan">
                  <AdminReportings />
                  <AdminReport />
                </Tab.Pane>
                <Tab.Pane eventKey="villagers">
                  <AdminAllUsers />
                  <AdminUser />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
    </Container>
  );
}

export default AdminPanel;
