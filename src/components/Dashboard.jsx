import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaTint, FaRupeeSign, FaExclamationCircle } from "react-icons/fa";
import "./dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalFarmers: 0,
    todayMilk: 0,
    revenue: 0,
    pendingDeductions: 0,
  });

  useEffect(() => {
    axios
      .get("https://milk-backend-production-f620.up.railway.app/api/dashboard/summary")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Error loading dashboard stats:", err);
      });
  }, []);

  return (
  
    <div className="dashboard-wrapper">
      <div className="container mt-4">
        <h2 className="fw-bold mb-4 text-primary">📊 Dairy Dashboard</h2>

        <div className="row g-4">

          {/* Card 1 – Total Farmers */}
          <div className="col-md-3">
            <div className="card dashboard-card p-3">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="text-muted">Total Farmers</h6>
                <FaUsers size={24} className="text-primary" />
              </div>
              <h3 className="fw-bold text-success mt-2">
                {stats.totalFarmers}
              </h3>
            </div>
          </div>

          {/* Card 2 – Today Milk */}
          <div className="col-md-3">
            <div className="card dashboard-card p-3">
              <div className="d-flex align-items-center justify-content-between">
                <h6 className="text-muted">Today Milk</h6>
                <FaTint size={24} className="text-info" />
              </div>
              <h3 className="fw-bold text-primary mt-2">
                {stats.todayMilk} L
              </h3>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
}
