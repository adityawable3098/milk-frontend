import { useState } from "react";
import axios from "axios";
import "./addmilk.css";

export default function AddMilk() {
  const [farmerId, setFarmerId] = useState("");
  const [liters, setLiters] = useState("");
  const [fat, setFat] = useState("");
  const [snf, setSnf] = useState("");
  const [rate, setRate] = useState("");
  const [shift, setShift] = useState("");      // ⭐ new state
  const [milkType, setMilkType] = useState(""); // ⭐ new state
  const [loading, setLoading] = useState(false);

  const totalPayment =
    liters && rate ? (parseFloat(liters) * parseFloat(rate)).toFixed(2) : 0;

  async function saveMilk() {
    if (!farmerId || !liters || !fat || !snf || !rate || !shift || !milkType) {
      alert("All fields including Shift and Milk Type are required");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:7777/api/milk", {
        farmerId: parseInt(farmerId),
        litres: parseFloat(liters),
        fat: parseFloat(fat),
        snf: parseFloat(snf),
        rate: parseFloat(rate),
        amount: parseFloat(totalPayment),
        shift: shift,            // ⭐ send shift
        milkType: milkType,      // ⭐ send milk type
        entryDate: new Date().toISOString().slice(0, 10),
      });

      alert("Milk entry saved successfully!");

      setFarmerId("");
      setLiters("");
      setFat("");
      setSnf("");
      setRate("");
      setShift("");      // reset new fields
      setMilkType("");

    } catch (err) {
      alert("Error saving milk entry");
    }

    setLoading(false);
  }

  return (
    <div className="milk-page">
      <div className="milk-box">
        <h2 className="milk-title">🥛 Add Milk Entry</h2>

        <input
          className="milk-input"
          placeholder="Farmer ID"
          value={farmerId}
          onChange={(e) => setFarmerId(e.target.value)}
        />

        {/* ⭐ Shift Dropdown */}
        <select
          className="milk-input"
          value={shift}
          onChange={(e) => setShift(e.target.value)}
        >
          <option value="">Select Shift</option>
          <option value="morning">Morning</option>
          <option value="evening">Evening</option>
        </select>

        {/* ⭐ Milk Type Dropdown */}
        <select
          className="milk-input"
          value={milkType}
          onChange={(e) => setMilkType(e.target.value)}
        >
          
          <option value="cow">Cow</option>
          <option value="buffalo">Buffalo</option>
          <option value="">Select Milk Type</option>
        </select>

        <input
          className="milk-input"
          placeholder="Liters"
          value={liters}
          onChange={(e) => setLiters(e.target.value)}
        />

        <input
          className="milk-input"
          placeholder="FAT %"
          value={fat}
          onChange={(e) => setFat(e.target.value)}
        />

        <input
          className="milk-input"
          placeholder="SNF %"
          value={snf}
          onChange={(e) => setSnf(e.target.value)}
        />

        <input
          className="milk-input"
          placeholder="Rate ₹"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />

        <div className="milk-total">
          Total Payment <span>₹ {totalPayment}</span>
        </div>

        <button className="milk-btn" onClick={saveMilk} disabled={loading}>
          {loading ? "Saving..." : "Save Entry"}
        </button>
      </div>
    </div>
  );
}
