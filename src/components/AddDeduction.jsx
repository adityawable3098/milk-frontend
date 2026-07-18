import { useState } from "react";
import axios from "axios";
import { FaUserTag, FaTags, FaRupeeSign, FaSave } from "react-icons/fa";
import "./summary.css"; // reuse your glass css

export default function AddDeduction() {
  const [farmerId, setFarmerId] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");

  const saveDeduction = () => {
    axios
      .post("http://localhost:7777/api/deductions", {
        farmerId,
        type,
        amount,
      })
      .then(() => alert("Deduction Saved Successfully"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="summary-wrapper d-flex justify-content-center align-items-start pt-5">
      <div className="container content-box" style={{ width: "450px" }}>
        <h3 className="fw-bold text-primary mb-4">
          <FaTags className="me-2 text-warning" /> Add Deduction
        </h3>

        {/* Glass Card */}
        <div className="p-4 glass-box">

          {/* Farmer ID */}
          <label className="fw-semibold mb-1">
            <FaUserTag className="me-2 text-primary" /> Farmer ID
          </label>
          <input
            className="form-control mb-3 glass-input"
            placeholder="Enter Farmer ID"
            value={farmerId}
            onChange={(e) => setFarmerId(e.target.value)}
          />

          {/* Type */}
          <label className="fw-semibold mb-1">
            <FaTags className="me-2 text-success" /> Type
          </label>
          <input
            className="form-control mb-3 glass-input"
            placeholder="Enter Deduction Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />

          {/* Amount */}
          <label className="fw-semibold mb-1">
            <FaRupeeSign className="me-2 text-danger" /> Amount
          </label>
          <input
            className="form-control mb-4 glass-input"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          {/* Save Button */}
          <button className="btn btn-primary fw-bold w-100" onClick={saveDeduction}>
            <FaSave className="me-2" /> Save Deduction
          </button>

        </div>
      </div>
    </div>
  );
}
