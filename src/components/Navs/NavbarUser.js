import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/sukamaju.png";
import Swal from "sweetalert2";

const NavbarUser = () => {
  const villageUsers = JSON.parse(sessionStorage.getItem("villagers"));

  function logout() {
    Swal.fire({
      title: "Logout",
      text: "Are you sure you want to logout??",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("villagers");
        Swal.fire("Okay", "Logout Success", "success").then(() => {
          window.location.href = "/loguser";
        });
      }
    });
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img className="img-logo" src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto right">
            {villageUsers ? (
              <>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <NavDropdown title={villageUsers.name} id="basic-nav-dropdown">
                  <NavDropdown.Item href="" onClick={logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/reguser">Register</Nav.Link>
                <Nav.Link href="/loguser">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarUser;
