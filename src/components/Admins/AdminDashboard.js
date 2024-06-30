import axios from "axios";
import { Chart, LinearScale, registerables } from "chart.js";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import CONFIG from "../Api/config";

function AdminDashboard() {
  const [, setReportings] = useState([]);
  const [totalAmountReportings, setTotalAmountReportings] = useState(0);
  const [totalAmountReportingsAccepted, setTotalAmountReportingsAccepted] =
    useState(0);
  const [totalAmountReportingsRejected, setTotalAmountReportingsRejected] =
    useState(0);
  const [totalAmountReportingsPending, setTotalAmountReportingsPending] =
    useState(0);
  const [totalAmountReportingsCompleted, setTotalAmountReportingsCompleted] =
    useState(0);

  Chart.register(...registerables);
  Chart.register(LinearScale);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${CONFIG.BASE_URL}/rep/gReporting`);
      const data = response.data.data;

      if (Array.isArray(data)) {
        setReportings(data);

        const totalAmountReportings = data.length;
        setTotalAmountReportings(totalAmountReportings);

        const totalAmountReportingsAccepted = data.filter(
          (reporting) => reporting.work_status === "Accepted"
        ).length;
        setTotalAmountReportingsAccepted(totalAmountReportingsAccepted);

        const totalAmountReportingsCompleted = data.filter(
          (reporting) => reporting.work_status === "Completed"
        ).length;
        setTotalAmountReportingsCompleted(totalAmountReportingsCompleted);

        const totalAmountReportingsRejected = data.filter(
          (reporting) => reporting.work_status === "Rejected"
        ).length;
        setTotalAmountReportingsRejected(totalAmountReportingsRejected);

        const totalAmountReportingsPending = data.filter(
          (reporting) => reporting.work_status === "Pending"
        ).length;
        setTotalAmountReportingsPending(totalAmountReportingsPending);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const chartData = {
    labels: [
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
    ],

    datasets: [
      {
        label: "Total Amount Reportings",
        type: "bar",
        data: [totalAmountReportings],
        backgroundColor: "#02a0fc",
        borderWidth: 1,
        borderRadius: 10,
      },
      {
        label: "Process",
        type: "bar",
        data: [totalAmountReportingsAccepted],
        backgroundColor: "#fec400",
        borderWidth: 1,
        borderRadius: 10,
      },
      {
        label: "Completed",
        type: "bar",
        data: [totalAmountReportingsCompleted],
        backgroundColor: "#14bd96",
        borderWidth: 1,
        borderRadius: 10,
      },
      {
        label: "Rejected",
        type: "bar",
        data: [totalAmountReportingsRejected],
        backgroundColor: "#f12b2c",
        borderWidth: 1,
        borderRadius: 10,
      },
      {
        label: "Pending",
        type: "bar",
        data: [totalAmountReportingsPending],
        backgroundColor: "#696969",
        borderWidth: 1,
        borderRadius: 10,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
  };

  return (
    <Container className="dashboard-container">
      <h1>Dashboard</h1>
      <div className="incoming_report dashboard-box-incoming">
        <p>Incoming Reports</p>
        <p className="numbers">{totalAmountReportings}</p>
      </div>
      <div className="reportings_accepted dashboard-box">
        <p>Processed</p>
        <p className="numbers">{totalAmountReportingsAccepted}</p>
      </div>
      <div className="reportings_completed dashboard-box">
        <p>Completed</p>
        <p className="numbers">{totalAmountReportingsCompleted}</p>
      </div>
      <div className="reportings_rejected dashboard-box">
        <p>Rejected</p>
        <p className="numbers">{totalAmountReportingsRejected}</p>
      </div>
      <div className="reportings_pending dashboard-box">
        <p>Pending</p>
        <p className="numbers">{totalAmountReportingsPending}</p>
      </div>
      <div className="chart-container justify-content-center">
        <h1>Report Statistics</h1>
        <div>
          <Bar data={chartData} options={options} />
        </div>
      </div>
    </Container>
  );
}

export default AdminDashboard;
