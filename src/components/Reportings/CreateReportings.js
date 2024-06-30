import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { IoArrowBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import CONFIG from "../Api/config";

function CreateReporting() {
  const [showCreateReportContent, setShowCreateReportContent] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUser = sessionStorage.getItem("villagers");
    if (!storedUser) {
      Swal.fire({
        title: "Oops",
        text: "You are not logged in. Please log in to make a reportings",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Log In",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/loguser";
        } else {
          window.location.href = "/home";
        }
      });
      return;
    }
    const userData = JSON.parse(storedUser);
    setUserId(userData.user_id);
    setUserName(userData.name);
    setShowCreateReportContent(true);
  }, []);

  const [complaint_category, setcomplaint_category] = useState("");
  const [complaint_title, setcomplaint_title] = useState();
  const [description, setdescription] = useState();

  async function addComplaint() {
    const newreporting = {
      complainants_name: userName,
      complaint_category,
      complaint_title,
      description,
      work_status: "Pending",
      user_id: userId,
    };

    console.log(newreporting);

    if (!complaint_category || !complaint_title || !description) {
      Swal.fire("Oops", "Please fill in all inputs", "error");
      return;
    }

    try {
      const result = await axios.post(`${CONFIG.BASE_URL}/rep/cReporting`, {
        ...newreporting,
        user_id: userId,
      });

      console.log(result);
      Swal.fire("Okay", "Success Create Reporting", "success").then(
        (result) => {
          window.location.href = "/home";
        }
      );
    } catch (error) {
      console.log(error);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  }

  return (
    <Container className="container">
      {showCreateReportContent && (
        <div className="container">
          <div className="header">
            <div className="backbutton">
              <Link to="/home">
                <IoArrowBackOutline size={30} color="white" />
              </Link>
            </div>
            <div className="jdltambahkeluhan">
              <h1 className="jdlcreate">Complaint Form</h1>
            </div>
          </div>
          <div className="subjudul col-md">
            <h1 className="jdlcreate">
              Please Submit Your Complaint Directly To Us
            </h1>
          </div>
          <div className="tampilanhome row justify-content-around bs m-5">
            {/* // Nama mengikuti pengguna login register */}
            <div className="col">
              {/* <label className="labelform">Nama</label>
              <input
                type="text"
                className="form-control"
                placeholder="Masukkan Nama"
                value={complainants_name}
                onChange={(e) => {
                  setcomplainants_name(e.target.value);
                }}
              /> */}
              <label className="labelform">Category</label>
              <select
                id="inputState"
                className="form-control custom-select"
                value={complaint_category}
                onChange={(e) => {
                  setcomplaint_category(e.target.value);
                }}
              >
                <option value="">Select Category</option>
                <option>Infrastruktur</option>
                <option>Pelayan Publik</option>
                <option>Keamanan dan Ketertiban</option>
                <option>Kesehatan Masyarakat</option>
                <option>Lingkungan</option>
              </select>
              <label className="labelform">Complaint Title</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Complaint Title"
                value={complaint_title}
                onChange={(e) => {
                  setcomplaint_title(e.target.value);
                }}
              />
              <label className="labelform">Description</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Complaint Content"
                value={description}
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
              />

              <button
                className="btn tambahkeluhan mt-2 btn-block"
                onClick={addComplaint}
              >
                Add Complaint
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default CreateReporting;
