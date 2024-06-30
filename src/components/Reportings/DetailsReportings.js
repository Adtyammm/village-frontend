import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import CONFIG from "../Api/config";

function DetailsReporting({ match }) {
  const [reportings, setReportings] = useState();
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [showSentimentModal, setShowSentimentModal] = useState(false);
  const [sentimen, setSentimen] = useState("");
  const [sentimenSent, setSentimenSent] = useState(false); // State untuk menandakan bahwa sentimen telah dikirim
  const { complaint_id } = useParams();

  useEffect(() => {
    const fetchReportingsByID = async () => {
      try {
        const response = await axios.get(
          `${CONFIG.BASE_URL}/rep/gReportingByID/${complaint_id}`
        );

        const data = response.data.data;
        if (data) {
          setReportings(data);
        } else {
          console.log("Data tidak ditemukan");
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchReportingsByID();
  }, [complaint_id, sentimenSent]); // Tambahkan sentimenSent ke dalam dependencies untuk fetch ulang data

  const handleReasonModal = () => {
    setShowReasonModal(!showReasonModal);
  };

  const handleSentimentModal = () => {
    setShowSentimentModal(!showSentimentModal);
  };

  const handleSendSentimen = async () => {
    try {
      const response = await axios.post(
        `${CONFIG.BASE_URL}/rep/prediksiSentimen`,
        {
          text: sentimen,
          reportId: complaint_id,
        }
      );
      console.log("Sentimen berhasil dikirim:", response.data);
      setShowSentimentModal(false);
      setSentimenSent(true); // Setelah berhasil mengirim, atur sentimenSent menjadi true
    } catch (error) {
      console.error("Error:", error);
    }
  };

  let statusClass = "";
  let backgroundColor = "";
  let textColor = "";

  if (reportings && reportings.work_status) {
    switch (reportings.work_status) {
      case "Pending":
        statusClass = "pending-status";
        break;
      case "Accepted":
        statusClass = "accepted-status";
        backgroundColor = "#fec400";
        textColor = "white";
        break;
      case "Rejected":
        statusClass = "rejected-status";
        backgroundColor = "#f12b2c";
        textColor = "white";
        break;
      case "Completed":
        statusClass = "completed-status";
        backgroundColor = "#14bd96";
        textColor = "white";
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    if (sentimenSent) {
      setSentimenSent(false); // Setelah fetch ulang data, atur sentimenSent kembali ke false
    }
  }, [sentimenSent]);

  return (
    <Container>
      <div className="header">
        <div className="backbutton">
          <Link to="/home">
            <IoArrowBackOutline size={30} color="white" />
          </Link>
        </div>
        <div className="juduldetailpengaduan">
          <h1>Details Reportings</h1>
        </div>
      </div>

      <div className="tampilanhome row justify-content-around bs m-5">
        <div className="col">
          {reportings ? (
            <>
              <Container>
                <Row className="text-center">
                  <Col style={{ borderRight: "1px solid black" }}>
                    <strong>Complainants Name</strong> <br></br>{" "}
                    {reportings.complainants_name}
                  </Col>
                  <Col style={{ borderRight: "1px solid black" }}>
                    <strong>Category</strong> <br></br>{" "}
                    {reportings.complaint_category}
                  </Col>
                  <Col>
                    <strong>Status</strong> <br></br>
                    <b
                      className={statusClass}
                      style={{
                        padding: "5px",
                        backgroundColor,
                        color: textColor,
                        borderRadius: "5px",
                      }}
                    >
                      {reportings.work_status === "Diterima"
                        ? "Diproses"
                        : reportings.work_status}
                    </b>
                  </Col>
                </Row>
              </Container>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <Row className="tampilanhome row justify-content-around bs m-5">
        {reportings ? (
          <>
            <h1 className="text-center mb-3">Details</h1>
            <br></br>
            <p className="text-center mb-2">{reportings.description}</p>
            <div className="text-center">
              {reportings.work_status === "Rejected" && (
                <Button
                  onClick={handleReasonModal}
                  className="alasanpenolakan w-50 m-auto"
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    marginBottom: "10px",
                  }}
                >
                  Alasan Kenapa Ditolak
                </Button>
              )}
              <br />
              <br />
              <Button
                onClick={handleSentimentModal}
                className="sentimen w-10 m-auto"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Kirim Ulasan
              </Button>
            </div>

            <Modal show={showReasonModal} onHide={handleReasonModal}>
              <Modal.Header closeButton>
                <Modal.Title>Alasan Kenapa Ditolak</Modal.Title>
              </Modal.Header>
              <Modal.Body>{reportings.reason}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleReasonModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal show={showSentimentModal} onHide={handleSentimentModal}>
              <Modal.Header closeButton>
                <Modal.Title>Send Sentimen</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <textarea
                  rows="4"
                  className="form-control"
                  placeholder="Type your sentiment here..."
                  value={sentimen}
                  onChange={(e) => setSentimen(e.target.value)}
                ></textarea>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleSentimentModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSendSentimen}>
                  Send Sentimen
                </Button>
              </Modal.Footer>
            </Modal>

            {reportings.sentiments && reportings.sentiments.length > 0 && (
              <Table striped bordered hover className="mt-5">
                <thead>
                  <tr>
                    <th>Ulasan</th>
                    <th>Sentiment Label</th>
                  </tr>
                </thead>
                <tbody>
                  {reportings.sentiments.map((sentiment) => (
                    <tr key={sentiment._id}>
                      <td>{sentiment.text}</td>
                      <td
                        style={{
                          color:
                            sentiment.sentiment_label === "negatif"
                              ? "red"
                              : "blue",
                        }}
                      >
                        {sentiment.sentiment_label === "negatif"
                          ? "Tidak Memuaskan"
                          : "Memuaskan"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Row>
    </Container>
  );
}

export default DetailsReporting;
