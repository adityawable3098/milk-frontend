import { useState } from "react";
import axios from "axios";
import { FaUser, FaCalendarAlt, FaFilter, FaSearch, FaWhatsapp } from "react-icons/fa";
import "./summary.css";

export default function MonthlySummary() {
  const [farmerId, setFarmerId] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [summary, setSummary] = useState(null);

  const fetchSummary = () => {
    axios
      .get(`http://localhost:7777/api/summary/monthly/${farmerId}/${year}/${month}`)
      .then((res) => setSummary(res.data))
      .catch((err) => console.log(err));
  };

  const sendWhatsApp = () => {
    if (!summary || !summary.records?.length) {
      alert("No summary available");
      return;
    }

    const farmer = summary.records[0];

    let phone = farmer?.farmerPhone || "";
    phone = phone.replace(/[^0-9]/g, "");

    if (!phone) {
      alert("Farmer phone number missing in API response!");
      return;
    }

    if (phone.startsWith("0")) {
      phone = phone.substring(1);
    }

    phone = "91" + phone;

    // Base message (not encoded emojis)
    const base =
      `Hello ${farmer.farmerName || ""} 👋\n\n` +
      `*Monthly Milk Summary*\n\n` +
      `🍼 Total Milk: ${summary.totalLitres} L\n` +
      `💵 Total Amount: ₹${summary.totalAmount}\n` +
      `📉 Deduction: ₹${summary.totalDeduction}\n` +
      `🟢 Net Payable: ₹${summary.netPayable}\n\n` +
      `😊 Thank you for your contribution!\n— Adu Dairy `;

    let msg = encodeURIComponent(base);

    // manually append ❤️ (red heart) because normal encode eats it
    msg += "%E2%9D%A4";

    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  };

  return (
    <div className="summary-wrapper">
      <div className="container mt-5 content-box">

        <h3 className="fw-bold text-primary text-center mb-4">
          📊 Monthly Summary
        </h3>

        {/* Input Section */}
        <div className="d-flex justify-content-center mb-4">
          <div className="p-4 glass-box" style={{ width: "450px" }}>

            <label className="fw-semibold mb-1">
              <FaUser className="me-2 text-primary" /> Farmer ID
            </label>
            <input
              className="form-control mb-3 glass-input"
              value={farmerId}
              onChange={(e) => setFarmerId(e.target.value)}
              placeholder="Enter Farmer ID"
            />

            <label className="fw-semibold mb-1">
              <FaCalendarAlt className="me-2 text-success" /> Year
            </label>
            <input
              className="form-control mb-3 glass-input"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter Year"
            />

            <label className="fw-semibold mb-1">
              <FaFilter className="me-2 text-warning" /> Month
            </label>
            <input
              className="form-control mb-4 glass-input"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="Enter Month (1–12)"
            />

            <button className="btn btn-primary fw-bold w-100 mt-2" onClick={fetchSummary}>
              <FaSearch className="me-2" /> Get Summary
            </button>
          </div>
        </div>

        {/* Output Section */}
        {summary && summary.records && (
          <div className="p-4 glass-box mt-4 mb-5">

            <h5 className="fw-bold text-secondary mb-3">📌 Database Records</h5>

            <div className="table-responsive">
              <table className="table glass-table text-center align-middle">
                <thead>
                  <tr>
                    <th>Collection ID</th>
                    <th>Farmer ID</th>
                    <th>Farmer Name</th>
                    <th>Entry Date</th>
                    <th>Shift</th>
                    <th>Milk Type</th>
                    <th>Fat</th>
                    <th>SNF</th>
                    <th>Litres</th>
                    <th>Rate</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.records.map((rec, index) => (
                    <tr key={index}>
                      <td>{rec.collectionId}</td>
                      <td>{rec.farmerId}</td>
                      <td>{rec.farmerName}</td>
                      <td>{rec.entryDate}</td>
                      <td>{rec.shift}</td>
                      <td>{rec.milkType}</td>
                      <td>{rec.fat}</td>
                      <td>{rec.snf}</td>
                      <td>{rec.litres}</td>
                      <td>{rec.rate}</td>
                      <td>{rec.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="mt-3 text-end fw-bold">
              Total Litres: <span className="text-primary">{summary.totalLitres} L</span><br />
              Total Amount: <span className="text-success">₹{summary.totalAmount}</span><br />
              Total Deduction: <span className="text-danger">₹{summary.totalDeduction}</span><br />
              Net Payable: <span className="text-info">₹{summary.netPayable}</span>
            </div>

            {/* WhatsApp Button */}
            <div className="mt-3 text-end">
              <button
                className="btn fw-bold d-inline-flex align-items-center"
                style={{
                  backgroundColor: "#25D366",
                  color: "white",
                  borderRadius: "10px",
                  padding: "10px 16px",
                  fontSize: "14px",
                  gap: "8px",
                }}
                onClick={sendWhatsApp}
              >
                <FaWhatsapp size={22} /> Send WhatsApp Summary
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
