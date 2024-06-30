import React from "react";
import { Tab, Container, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import LatestReportings from "../Reportings/LatestReportings";
import AcceptedReportings from "../Reportings/AcceptedReportings";
import FinishedReportings from "../Reportings/FinishedReportings";
import RejectedReportings from "../Reportings/RejectedReportings";

function HomeScreen() {
  return (
    <Container className="homes">
      <h1 className="judul">Welcome to</h1>
      <h2 className="judul2">
        Public Complaint Information System <br></br> Sukamaju Village
      </h2>

      <Container className="tampilanhome">
        <h2 className="text-center">
          <b>Complaint List</b>
        </h2>
        <Tabs
          defaultActiveKey="latestreporting"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="latestreporting" title="Latest">
            <LatestReportings />
          </Tab>
          <Tab eventKey="processedreporting" title="Processed">
            <AcceptedReportings />
          </Tab>
          <Tab eventKey="completedreporting" title="Resolved">
            <FinishedReportings />
          </Tab>
          <Tab eventKey="rejectedreporting" title="Rejected">
            <RejectedReportings />
          </Tab>
        </Tabs>
        <div className="fixed-bottom w-50 m-auto">
          <Link to="/tambahkeluhan" className="btn pengaduan btn-block">
            Create Reporting
          </Link>
        </div>
      </Container>
    </Container>
  );
}

export default HomeScreen;
