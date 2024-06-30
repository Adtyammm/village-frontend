import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import CONFIG from "../Api/config";

function AdminReportings() {
  const [reportings, setReportings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${CONFIG.BASE_URL}/rep/gReporting`);
      setReportings(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastReporting = currentPage * perPage;
  const indexOfFirstReporting = indexOfLastReporting - perPage;
  const currentReportings = reportings.slice(
    indexOfFirstReporting,
    indexOfLastReporting
  );

  const completedReporting = (id, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are marking this reporting as finished. Proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Finish",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(`${CONFIG.BASE_URL}/rep/uReporting/${id}`, {
            work_status: newStatus,
          })
          .then((response) => {
            console.log(response.data);

            const updatedList = reportings.map((report) => {
              if (report.complaint_id === id) {
                return { ...report, work_status: newStatus };
              }
              return report;
            });

            Swal.fire("Finished", "Reporting Finished", "success").then(() => {
              window.location.reload();
            });

            setReportings(updatedList);
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Oops", "Something Went Wrong", "error");
          });
      }
    });
  };

  return (
    <Row>
      <Col>
        <h1>All Reportings</h1>
        <Table bordered>
          <thead>
            <tr>
              <th>No</th>
              <th>Villagers Name</th>
              <th>Complaint Title</th>
              <th>Reason Rejected</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentReportings.map((reporting, index) => {
              let statusText = reporting.work_status;
              let statusClass = "";
              switch (reporting.work_status) {
                case "Pending":
                  return null;
                case "Accepted":
                  statusText = "Processed";
                  statusClass = "accepted-status";
                  break;
                case "Rejected":
                  statusClass = "rejected-status";
                  break;
                case "Completed":
                  statusClass = "completed-status";
                  break;
                default:
                  break;
              }
              return (
                <tr key={reporting._id}>
                  <td>{index + indexOfFirstReporting + 1}</td>
                  <td>{reporting.complainants_name}</td>
                  <td>{reporting.complaint_title}</td>
                  <td style={{ width: "200px", wordBreak: "break-word" }}>
                    {reporting.reason}
                  </td>
                  <td className={statusClass}>{statusText}</td>
                  <td>
                    {reporting.work_status !== "Completed" &&
                      reporting.work_status !== "Rejected" && (
                        <Button
                          variant="info"
                          className="btn-action"
                          onClick={() =>
                            completedReporting(
                              reporting.complaint_id,
                              "Completed"
                            )
                          }
                        >
                          Completed
                        </Button>
                      )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Pagination
          currentPage={currentPage}
          perPage={perPage}
          totalReportings={reportings.length}
          onPageChange={handlePageChange}
        />
      </Col>
    </Row>
  );

  function Pagination({ currentPage, perPage, totalReportings, onPageChange }) {
    const pageNumbers = Math.ceil(totalReportings / perPage);

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

export default AdminReportings;
