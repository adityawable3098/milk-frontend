import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {

  const navigate = useNavigate();

  // Role based guard
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "ADMIN") {
      alert("Unauthorized! Admin access only");
      navigate("/login");
    }
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>🛠 Admin Dashboard</h2>

      <div style={styles.menu}>
        <button onClick={() => navigate("/farmers")}>👨‍🌾 Farmers</button>
        <button onClick={() => navigate("/add-farmer")}>➕ Add Farmer</button>
        <button onClick={() => navigate("/milk-records")}>🥛 Milk Records</button>
        <button onClick={() => navigate("/summary")}>📊 Monthly Summary</button>
        <button onClick={() => navigate("/milk-entry")}>➕ Milk Entry</button>
        <button onClick={() => navigate("/deductions")}>➕ Deductions</button>
        <button onClick={() => navigate("/add-deduction")}>➕ Add Deduction</button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "30px"
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#0b5ed7"
  },
  menu: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  }
};
