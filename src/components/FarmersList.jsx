import { useEffect, useState } from "react";
import axios from "axios";
import "./farmers.css";

export default function FarmersList() {

  const [farmers, setFarmers] = useState([]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editFarmer, setEditFarmer] = useState({
    farmerId: "",
    name: "",
    phone: "",
    village: "",
    totalMilk: 0,
    totalPrice: 0,
    deductions: 0,
    netPayable: 0
  });

  // =========================
  // Fetch Farmers
  // =========================
  const fetchFarmers = () => {
    axios
      .get("https://milk-backend-production-f620.up.railway.app/api/farmers")
      .then((res) => setFarmers(res.data))
      .catch(() => alert("Failed to load farmers"));
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  // =========================
  // Delete Farmer
  // =========================
  const handleDelete = async (id) => {

    if (!window.confirm("Delete this farmer?")) return;

    try {

      await axios.delete(`http://localhost:7777/api/farmers/${id}`);

      alert("Farmer deleted successfully");

      fetchFarmers();

    } catch (error) {

      console.error(error);

      alert("Delete failed");

    }

  };

  // =========================
  // Open Update Modal
  // =========================
  const handleUpdate = (farmer) => {

    setEditFarmer({ ...farmer });

    setShowModal(true);

  };

  // =========================
  // Handle Form Change
  // =========================
  const handleChange = (e) => {

    setEditFarmer({
      ...editFarmer,
      [e.target.name]: e.target.value
    });

  };

  // =========================
  // Save Update
  // =========================
  const saveUpdate = async () => {

    try {

      await axios.put(
        `http://localhost:7777/api/farmers/${editFarmer.farmerId}`,
        editFarmer
      );

      alert("Farmer updated successfully");

      setShowModal(false);

      fetchFarmers();

    } catch (error) {

      console.error(error);

      alert("Update failed");

    }

  };

  return (

    <div className="farmers-wrapper">

      <div className="container-fluid mt-4 content-box">

        <h2 className="fw-bold mb-4 text-primary text-center">
          👨‍🌾 Farmers Directory
        </h2>

        <div className="table-responsive glass-table">

          <table className="table table-bordered table-hover text-center align-middle">

            <thead className="table-primary">
              <tr>
                <th>Farmer ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Village</th>
                <th>Created Date</th>
                <th>Total Milk (L)</th>
                <th>Total Milk Price (₹)</th>
                <th>Deductions (₹)</th>
                <th>Net Payable (₹)</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {farmers.length > 0 ? (

                farmers.map((f) => (

                  <tr key={f.farmerId}>

                    <td>{f.farmerId}</td>
                    <td className="fw-bold">{f.name}</td>
                    <td>{f.phone}</td>
                    <td>{f.village}</td>
                    <td>{f.createdAt ? f.createdAt.slice(0,10) : "-"}</td>
                    <td>{f.totalMilk ?? 0}</td>
                    <td>{f.totalPrice ?? 0}</td>
                    <td>{f.deductions ?? 0}</td>
                    <td>{f.netPayable ?? 0}</td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleUpdate(f)}
                      >
                        Update
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(f.farmerId)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="10">No farmers found</td>
                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =========================
         EDIT MODAL
      ========================= */}

      {showModal && (

        <div className="modal-overlay">

          <div className="modal-box">

            <h4>Edit Farmer</h4>

            <input
              name="name"
              value={editFarmer.name}
              onChange={handleChange}
              placeholder="Farmer Name"
            />

            <input
              name="phone"
              value={editFarmer.phone}
              onChange={handleChange}
              placeholder="Phone"
            />

            <input
              name="village"
              value={editFarmer.village}
              onChange={handleChange}
              placeholder="Village"
            />

            <div className="modal-buttons">

              <button className="btn btn-success" onClick={saveUpdate}>
                Save
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}