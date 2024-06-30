import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { BsArrowRightSquare, BsTriangle, BsTriangleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import CONFIG from "../Api/config";

function ModalReporting({ reporting, index }) {
  const [voteCount, setVoteCount] = useState(reporting.vote);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (hasVoted) {
      return;
    }
    axios
      .put(`${CONFIG.BASE_URL}/rep/vReporting/vote/${reporting.complaint_id}`, {
        vote: voteCount + 1,
      })
      .then((response) => {
        setVoteCount(voteCount + 1);
        setHasVoted(true);
        sessionStorage.setItem(`voted-${reporting.complaint_id}`, true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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

  const formattedDate = new Date(reporting.complaint_date).toLocaleDateString();
  const formattedDates = new Date(reporting.updatedAt).toLocaleDateString();

  const complaintDate = new Date(reporting.complaint_date);
  const updatedDate = new Date(reporting.updatedAt);
  const timeDifference = updatedDate - complaintDate;

  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hoursDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutesDifference = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
  );

  return (
    <div className="row">
      <div className="col">
        <Card className="cardmodal">
          <Card.Body>
            <Card.Title>
              {hasVoted ? (
                <button className="btnvoteup">
                  <BsTriangleFill className="vote_done" size={30} />
                </button>
              ) : (
                <button className="btnvoteup" onClick={handleVote}>
                  <BsTriangle size={30} />
                </button>
              )}

              {reporting.complaint_title}
              <Link to={`/detailkeluhan/${reporting.complaint_id}`}>
                <button className="btndetail">
                  <BsArrowRightSquare size={30} />
                </button>
              </Link>
            </Card.Title>
            <p
              style={{
                marginLeft: "15px",
                float: "left",
              }}
            >
              {voteCount}
            </p>
            <Card.Text
              style={{
                marginLeft: "40px",
              }}
            >
              {reporting.complainants_name} |{" "}
              <b className={statusClass}>{statusText}</b>
              <br></br>
              <span>Laporan dibuat: {formattedDate}</span>
              <br></br>
              {/* Hanya tampilkan tanggal selesai jika status bukan "Processed" */}
              {reporting.work_status !== "Accepted" && (
                <>
                  <span>Laporan selesai: {formattedDates}</span>
                  <br></br>
                  <span>
                    Durasi: {daysDifference} hari {hoursDifference} jam{" "}
                    {minutesDifference} menit
                  </span>
                </>
              )}
              <br />
              {/* Tampilkan data sentimen terbaru */}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ModalReporting;
