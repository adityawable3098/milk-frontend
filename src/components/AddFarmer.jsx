import { useState } from "react";
import axios from "axios";
import { FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "./addFarmer.css"; // ⭐ NEW

export default function AddFarmer() {
  const [farmerName, setFarmerName] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
  const [msg, setMsg] = useState("");

  const saveFarmer = async () => {
    if (!farmerName || !phone || !village) {
      setMsg("⚠️ All fields are required");
      return;
    }

    try {
      await axios.post("http://localhost:7777/api/farmers", {
        name: farmerName,
        phone,
        village,
      });

      setMsg("✅ Farmer added successfully!");

      setFarmerName("");
      setPhone("");
      setVillage("");
    } catch (err) {
      setMsg("❌ Failed to save farmer.");
    }
  };

  return (
    <div className="addfarmer-page">
      <div className="addfarmer-card shadow-lg">
        <h3 className="fw-bold text-primary text-center mb-4">
          👨‍🌾 Add Farmer
        </h3>

        {msg && <div className="alert alert-info py-2">{msg}</div>}

        <div className="mb-3 input-group glass-input-group">
          <span className="input-group-text glass-addon">
            <FaUser />
          </span>
          <input
            className="form-control glass-input"
            placeholder="Farmer Name"
            value={farmerName}
            onChange={(e) => setFarmerName(e.target.value)}
          />
        </div>

        <div className="mb-3 input-group glass-input-group">
          <span className="input-group-text glass-addon">
            <FaPhone />
          </span>
          <input
            className="form-control glass-input"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="number"
          />
        </div>

        <div className="mb-3 input-group glass-input-group">
          <span className="input-group-text glass-addon">
            <FaMapMarkerAlt />
          </span>
          <input
            className="form-control glass-input"
            placeholder="Village"
            value={village}
            onChange={(e) => setVillage(e.target.value)}
          />
        </div>

        <button
          onClick={saveFarmer}
          className="btn btn-primary w-100 fw-bold addfarmer-btn"
        >
          ➕ Save Farmer
        </button>
      </div>
    </div>
  );
}
