import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import CONFIG from "../Api/config";

function AdminAllUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${CONFIG.BASE_URL}/u/gUsers`);
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastUser = currentPage * perPage;
  const indexOfFirstUser = indexOfLastUser - perPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <Row>
      <Col>
        <h1>All User</h1>
        <Table bordered>
          <thead>
            <tr>
              <th>No</th>
              <th>Nik</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => {
              let statusText = user.account_state;
              let statusClass = "";
              switch (user.account_state) {
                case "Pending":
                  return null;
                case "Verified":
                  statusClass = "completed-status";
                  break;
                case "Unverified":
                  statusClass = "rejected-status";
                  break;

                default:
                  break;
              }
              return (
                <tr key={user._id}>
                  <td>{index + indexOfFirstUser + 1}</td>
                  <td>{user.nik}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className={statusClass}>{statusText}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Pagination
          currentPage={currentPage}
          perPage={perPage}
          totalusers={users.length}
          onPageChange={handlePageChange}
        />
      </Col>
    </Row>
  );

  function Pagination({ currentPage, perPage, totalusers, onPageChange }) {
    const pageNumbers = Math.ceil(totalusers / perPage);

    return (
      <nav>
        <ul className="pagination">
          {Array.from({ length: pageNumbers }, (_, i) => i + 1).map(
            (pageNumber) => (
              <li
                key={pageNumber}
                className={`page-item${
                  currentPage === pageNumber ? " active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    );
  }
}

export default AdminAllUsers;
