import { useState } from "react";
import axios from "axios";
import { FaSearch, FaTint } from "react-icons/fa";
import "./milklist.css"; // 🔥 separate excel glass CSS

export default function MilkList() {
  const [farmerId, setFarmerId] = useState("");
  const [records, setRecords] = useState([]);
  const [msg, setMsg] = useState("");

  const totalAmount = records.reduce((sum, record) => sum + record.amount, 0);
  const totalLitres = records.reduce((sum, record) => sum + record.litres, 0);

  const fetchMilkRecords = async () => {
    if (!farmerId) {
      setMsg("⚠️ Enter Farmer ID");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:7777/api/milk/farmer/${farmerId}`
      );

      setRecords(res.data);
      setMsg(res.data.length === 0 ? "❌ No milk records found" : "");
    } catch (error) {
      setMsg("❌ Error fetching records");
    }
  };

  return (
    <div className="milk-wrapper pt-5">
      <div className="container">

        <h3 className="fw-bold text-primary mb-4 text-center">
          <FaTint className="me-2" /> Milk Records
        </h3>

        {/* Glass Search Card */}
        <div className="milk-glass-card mb-4">
          <div className="row align-items-center">
            <div className="col-md-4 fw-bold">🔍 Find Milk by Farmer ID</div>

            <div className="col-md-5">
              <input
                value={farmerId}
                onChange={(e) => setFarmerId(e.target.value)}
                className="form-control milk-input"
                placeholder="Enter Farmer ID"
              />
            </div>

            <div className="col-md-3">
              <button onClick={fetchMilkRecords} className="btn btn-primary w-100 fw-bold">
                <FaSearch /> Search
              </button>
            </div>
          </div>
        </div>

        {/* Alert Message */}
        {msg && (
          <div className="alert alert-warning fw-bold text-center">{msg}</div>
        )}

        {/* Records Table */}
        {records.length > 0 && (
          <div className="milk-glass-card p-4">

            <div className="table-responsive">
              <table className="table milk-table text-center align-middle">

                <thead>
                  <tr>
                    <th>Farmer Name</th>
                    <th>Date</th>
                    <th>Fat %</th>
                    <th>SNF %</th>
                    <th>Litres</th>
                    <th>Rate (₹)</th>
                    <th>Amount (₹)</th>
                  </tr>
                </thead>

                <tbody>
                  {records.map((r, index) => (
                    <tr key={index}>
                      <td>{r.farmerName ?? "-"}</td>
                      <td>{r.entryDate}</td>
                      <td>{r.fat ?? "-"}</td>
                      <td>{r.snf ?? "-"}</td>
                      <td>{r.litres ?? r.liters}</td>
                      <td>{r.rate}</td>
                      <td className="fw-bold text-success">{r.amount}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* Totals */}
            <div className="mt-3 text-end fw-bold">
              Total Litres: <span className="text-primary">{totalLitres} L</span><br />
              Total Amount: <span className="text-success">₹{totalAmount}</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
