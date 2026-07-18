import { useEffect, useState } from "react";
import axios from "axios";
import "./empmagement.css";

export default function EmployeeManagement() {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    mobile: "",
    password: ""
  });

  /* reset modal state */

  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmployeeId, setResetEmployeeId] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {

    setLoading(true);

    axios.get("http://localhost:7777/api/admin/employees")
      .then(res => setEmployees(res.data))
      .catch(() => alert("Error loading employees"))
      .finally(() => setLoading(false));
  };

  const createEmployee = () => {

    if (!newEmployee.name || !newEmployee.mobile || !newEmployee.password) {
      alert("Please fill all fields");
      return;
    }

    axios.post("http://localhost:7777/api/admin/createEmployee", newEmployee)
      .then(() => {

        alert("Employee Created Successfully");

        setNewEmployee({
          name: "",
          mobile: "",
          password: ""
        });

        fetchEmployees();
      })
      .catch(() => alert("Error creating employee"));
  };

  const deleteEmployee = (id) => {

    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    axios.delete(`http://localhost:7777/api/admin/deleteEmployee/${id}`)
      .then(() => fetchEmployees());
  };

  const disableEmployee = (id) => {
    axios.put(`http://localhost:7777/api/admin/disableEmployee/${id}`)
      .then(() => fetchEmployees());
  };

  const enableEmployee = (id) => {
    axios.put(`http://localhost:7777/api/admin/enableEmployee/${id}`)
      .then(() => fetchEmployees());
  };

  /* open modal */

  const openResetModal = (id) => {
    setResetEmployeeId(id);
    setShowResetModal(true);
  };

  /* update password */

  const updatePassword = () => {

    if (!newPassword) {
      alert("Enter new password");
      return;
    }

    axios.put(`http://localhost:7777/api/admin/resetPassword/${resetEmployeeId}`, {
      password: newPassword
    })
      .then(() => {

        alert("Password reset successfully");

        setShowResetModal(false);
        setNewPassword("");
      })
      .catch(() => alert("Error resetting password"));
  };

  return (

    <div className="employee-page">

      <div className="glass-card">

        <h2 className="page-title">👨‍💼 Employee Management</h2>

        {/* CREATE EMPLOYEE */}

        <div className="form-row">

          <input
            placeholder="Employee Name"
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
          />

          <input
            placeholder="Mobile Number"
            value={newEmployee.mobile}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, mobile: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={newEmployee.password}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, password: e.target.value })
            }
          />

          <button onClick={createEmployee}>Create</button>

        </div>

        {/* EMPLOYEE TABLE */}

        {loading ? (

          <div className="loading">Loading employees...</div>

        ) : (

          <table className="employee-table">

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {employees.length === 0 ? (

                <tr>
                  <td colSpan="5" className="no-data">
                    No Employees Found
                  </td>
                </tr>

              ) : (

                employees.map(emp => (

                  <tr key={emp.id}>

                    <td>{emp.id}</td>
                    <td>{emp.name}</td>
                    <td>{emp.mobile}</td>

                    <td>
                      <span className={`status ${
                        emp.status === "ACTIVE"
                          ? "active"
                          : "disabled"
                      }`}>
                        {emp.status}
                      </span>
                    </td>

                    <td>

                      <button
                        className="btn-delete"
                        onClick={() => deleteEmployee(emp.id)}
                      >
                        Delete
                      </button>

                      {emp.status === "ACTIVE" ? (

                        <button
                          className="btn-disable"
                          onClick={() => disableEmployee(emp.id)}
                        >
                          Disable
                        </button>

                      ) : (

                        <button
                          className="btn-enable"
                          onClick={() => enableEmployee(emp.id)}
                        >
                          Enable
                        </button>

                      )}

                      <button
                        className="btn-reset"
                        onClick={() => openResetModal(emp.id)}
                      >
                        Reset Password
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        )}

      </div>

      {/* RESET PASSWORD MODAL */}

      {showResetModal && (

        <div className="reset-modal">

          <div className="reset-card">

            <h3>Reset Password</h3>

            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <div className="reset-buttons">

              <button className="btn-save" onClick={updatePassword}>
                Update
              </button>

              <button
                className="btn-cancel"
                onClick={() => setShowResetModal(false)}
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