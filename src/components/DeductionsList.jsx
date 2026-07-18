import { useState, useEffect } from "react";
import axios from "axios";
import { FaFileInvoice, FaSearch, FaMoneyBillWave } from "react-icons/fa";

export default function DeductionsList() {
  const [farmerId, setFarmerId] = useState("");
  const [records, setRecords] = useState([]);

  const fetchData = () => {
    if (!farmerId) return;
    axios.get(`http://localhost:7777/api/deductions/farmer/${farmerId}`)
      .then(res => setRecords(res.data))
      .catch(err => console.log(err));
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-start mt-5"
      style={{ minHeight: "70vh" }}
    >
      <div style={{ width: "450px" }}>
        <h3 className="fw-bold text-primary mb-4">
          <FaFileInvoice className="me-2 text-primary" /> Deductions List
        </h3>

        <div
          className="card shadow-lg p-4 border-0"
          style={{ borderRadius: "15px" }}
        >
          <label className="fw-semibold">
            Farmer ID
          </label>

          <div className="d-flex gap-2 mb-3">
            <input
              value={farmerId}
              onChange={(e) => setFarmerId(e.target.value)}
              className="form-control"
              placeholder="Enter Farmer ID"
            />
            <button className="btn btn-primary" onClick={fetchData}>
              <FaSearch />
            </button>
          </div>

          <hr />

          <h6 className="fw-bold mb-2">Deduction Records:</h6>

          {records.length === 0 ? (
            <p className="text-muted">No records found.</p>
          ) : (
            <ul className="list-group">
              {records.map((d, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>
                    <FaMoneyBillWave className="text-danger me-2" />
                    {d.type}
                  </span>
                  <span className="fw-bold text-danger">₹{d.amount}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
