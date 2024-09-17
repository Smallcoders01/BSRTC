import React from "react";
import { Container, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Directory.css"; // Import custom CSS for exact styling
import Footer from '../Footer/footer';

const DirectoryComponent = () => {
  const officerData = [
    {
      name: "Sri Sanjay Kumar Agrawal, I.A.S.",
      designation: "Secretary",
      office: "0612-2547070",
      mobile: "-",
      email: "Transec-bih@nic.in",
    },
    {
      name: "Sri Abhay Jha, I.A.S.",
      designation: "Administrator",
      office: "0612-2222173",
      mobile: "-",
      email: "adrbsrtc@gmail.com",
    },
    {
      name: "Sri Anu Kumar, B.A.S.",
      designation: "Chief of Administration",
      office: "0612-2506164",
      mobile: "9608247671",
      email: "bsrtcreports@gmail.com",
    },
  ];

  return (
    <><Container className="mt-4 office-details-container">
      <nav className="office-nav">
        <ul>
          <li className="head-office active one">
            <div className="yellow">
              BSRTC Head Office
            </div></li>
          <li>PATNA Division</li>
          <li>GAYA Division</li>
          <li>BHAGALPUR Division</li>
          <li>MUZAFFARPUR Division</li>
          <li>DARBHANGA Division</li>
          <li>PURNIA Division</li>
        </ul>
      </nav>
      <div className="table-responsive">
        <Table bordered hover className="custom-table text-center">
          <thead>
            <tr>
              <th>OFFICER NAME</th>
              <th>DESIGNATION</th>
              <th>OFFICE</th>
              <th>MOBILE NUMBER</th>
              <th>EMAIL ID</th>
            </tr>
          </thead>
          <tbody>
            {officerData.map((officer, index) => (
              <tr key={index}>
                <td>{officer.name}</td>
                <td>{officer.designation}</td>
                <td>{officer.office}</td>
                <td>{officer.mobile}</td>
                <td>{officer.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container><Footer /></>
  );
};

export default DirectoryComponent;
