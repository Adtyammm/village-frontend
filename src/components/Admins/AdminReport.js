import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import CONFIG from "../Api/config";

function AdminReport() {
  const [reportings, setReportings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedReport, setSelectedReport] = useState(null);

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

  const acceptedReporting = (id, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are accepting this reporting. Proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Accept",
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

            Swal.fire("Accepted", "Reporting Accepted", "success").then(() => {
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

  const rejectedReporting = (id, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are rejecting this reporting. Please provide a reason:",
      input: "textarea",
      icon: "warning",
      inputPlaceholder: "Enter a Reason for Rejection",
      showCancelButton: true,
      confirmButtonText: "Reject",
      cancelButtonText: "Cancel",
      showLoaderOnConfirm: true,
      reverseButtons: true,
      preConfirm: (reason) => {
        return new Promise((resolve) => {
          axios
            .put(`${CONFIG.BASE_URL}/rep/uReporting/${id}/reason`, {
              work_status: newStatus,
              reason: reason,
            })
            .then((response) => {
              console.log(response.data);
              const updatedList = reportings.map((report) => {
                if (report.complaint_id === id) {
                  return { ...report, work_status: newStatus };
                }
                return report;
              });
              Swal.fire("Rejected", "Reporting Rejected", "success").then(
                () => {
                  window.location.reload();
                }
              );
              setReportings(updatedList);
              resolve();
            })
            .catch((error) => {
              console.error(error);
              Swal.fire("Oops", "Something Went Wrong", "error");
              resolve();
            });
        });
      },
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const openDescriptionModal = (report) => {
    setSelectedReport(report);
  };

  const closeDescriptionModal = () => {
    setSelectedReport(null);
  };

  const filteredReportings = reportings.filter(
    (reporting) => reporting.work_status === "Pending"
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReportings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <Row>
      <Col>
        <h1>Incoming Report</h1>

        <Table bordered>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Complaint Category</th>
              <th>Complaint Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((reporting, index) => (
                <tr key={reporting._id}>
                  <td>{index + indexOfFirstItem + 1}</td>
                  <td>{reporting.complainants_name}</td>
                  <td>{reporting.complaint_category}</td>
                  <td>{reporting.complaint_title}</td>
                  <td style={{ width: "200px", wordBreak: "break-word" }}>
                    {reporting.description.length > 20 ? (
                      <>
                        {reporting.description.slice(0, 30)}...
                        <Button
                          variant="link"
                          className="p-0 ml-1"
                          onClick={() => openDescriptionModal(reporting)}
                        >
                          View Description
                        </Button>
                      </>
                    ) : (
                      reporting.description
                    )}
                  </td>

                  <td>
                    {new Date(reporting.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td>
                    {reporting.work_status !== "pending" && (
                      <Button
                        className="btn_accepted"
                        onClick={() =>
                          acceptedReporting(reporting.complaint_id, "Accepted")
                        }
                      >
                        Accept
                      </Button>
                    )}
                    {reporting.work_status !== "pending" && (
                      <Button
                        variant="danger"
                        className="btn_rejected"
                        onClick={() =>
                          rejectedReporting(reporting.complaint_id, "Rejected")
                        }
                      >
                        Reject
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No reports available.</td>
              </tr>
            )}
          </tbody>
        </Table>

        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredReportings.length}
          onPageChange={handlePageChange}
        />

        <Modal show={selectedReport !== null} onHide={closeDescriptionModal}>
          <Modal.Header closeButton>
            <Modal.Title>Report Description</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedReport && selectedReport.description}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeDescriptionModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  );

  function Pagination({ currentPage, itemsPerPage, totalItems, onPageChange }) {
    const pageNumbers = Math.ceil(totalItems / itemsPerPage);

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

export default AdminReport;
