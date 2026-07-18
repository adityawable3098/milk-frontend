import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeePanel() {

  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "EMPLOYEE") {
      alert("Unauthorized! Employee access only");
      navigate("/login");
    }
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>👨‍🏫 Employee Panel</h2>

      <div style={styles.menu}>
        <button onClick={() => navigate("/add-farmer")}>➕ Add Farmer</button>
        <button onClick={() => navigate("/add-milk")}>🥛 Add Milk</button>
        <button onClick={() => navigate("/milk")}>📌 View Milk Records</button>
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
    fontSize: "26px",
    marginBottom: "15px",
    color: "#198754"
  },
  menu: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  }
};
