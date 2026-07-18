import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
export default function Navbar({ user, setUser }) {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const role = user?.role?.toUpperCase();

  return (

    <nav className="navbar navbar-expand-lg bg-dairy">

      {/* LOGO */}
      <Link
        className="navbar-brand fw-bold"
        to={role === "ADMIN" ? "/dashboard" : "/milk-entry"}
      >
        🐄 Milk Collection
      </Link>

      {/* MOBILE MENU BUTTON */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarMenu"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarMenu">

        <ul className="navbar-nav ms-auto align-items-center">

          {/* ADMIN MENU */}
          {role === "ADMIN" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  <i className="bi bi-speedometer2 me-1"></i>
                  Dashboard
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/farmers">
                  <i className="bi bi-people me-1"></i>
                  Farmers
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/summary">
                  <i className="bi bi-bar-chart me-1"></i>
                  Monthly Summary
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/employees">
                  <i className="bi bi-person-badge me-1"></i>
                  Employees
                </Link>
              </li>
            </>
          )}

          {/* COMMON MENU */}

          <li className="nav-item">
            <Link className="nav-link" to="/milk-entry">
              <i className="bi bi-droplet me-1"></i>
              Milk Entry
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/add-farmer">
              <i className="bi bi-person-plus me-1"></i>
              Add Farmer
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/add-deduction">
              <i className="bi bi-cash-coin me-1"></i>
              Deduction
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/milk-records">
              <i className="bi bi-list-check me-1"></i>
              Records
            </Link>
          </li>

          {/* LOGOUT */}
          {role && (
            <li className="nav-item ms-3">
              <button
                className="btn btn-danger btn-sm"
                onClick={logout}
              >
                <i className="bi bi-box-arrow-right me-1"></i>
                Logout
              </button>
            </li>
          )}

        </ul>

      </div>

    </nav>
  );
}