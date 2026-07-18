import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg.jpg";

export default function Login({ setUser }) {

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (!mobile || !password) {
      alert("Please enter mobile and password");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://milk-backend-production-f620.up.railway.app/api/auth/login", {
        mobile,
        password
      });

      const role = response.data.role?.trim().toUpperCase();

      const userData = {
        mobile: response.data.mobile,
        role
      };

      localStorage.setItem("user", JSON.stringify(userData));

      if (setUser) setUser(userData);

      alert("Login Successful!");

      if (role === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/milk-entry");
      }

    } catch (err) {
      alert("Invalid credentials");
    }

    setLoading(false);
  }

  return (
    <div style={{ ...styles.page, backgroundImage: `url(${bgImage})` }}>
      <div style={styles.overlay}></div>

      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={styles.title}>🔐 Login</h2>

        <input
          style={styles.input}
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} disabled={loading}>
          {loading ? "Logging..." : "Login"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "fixed",
    top: 0,
    left: 0,
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 0,
  },

  form: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "25px",
    borderRadius: "10px",
  },

  title: {
    color: "white",
    fontSize: "28px",
    fontWeight: "bold",
    textShadow: "0 3px 6px rgba(0,0,0,0.6)",
  },

  input: {
    width: "260px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid rgba(255,255,255,0.5)",
    background: "rgba(255,255,255,0.25)",
    color: "white",
    fontSize: "14px",
    outline: "none",
    backdropFilter: "blur(6px)",
    boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
  },

  button: {
    width: "120px",
    alignSelf: "center",
    padding: "8px",
    fontSize: "15px",
    background: "rgba(0,123,255,0.7)",
    borderRadius: "6px",
    border: "1px solid rgba(255,255,255,0.4)",
    color: "white",
    cursor: "pointer",
    backdropFilter: "blur(6px)",
    boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
    transition: "all 0.3s ease-in-out"
  }
};