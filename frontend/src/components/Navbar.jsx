import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";


//Navigation bar for switching between pages in the application
export default function Navbar() {
const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav style={styles.nav}>
      <img
        src={logo}
        alt="MackSolutions Logo"
        className="navbrand-logo"
        style={styles.logo}
      />

      <Link className="nav-hover" style={styles.link} to="/">
        Home
      </Link>
      <Link className="nav-hover" style={styles.link} to="/incidents">
        Show Incidents
      </Link>

      {user ? (
        <>
          <Link className="nav-hover" style={styles.link} to="/create">
            Create Incident
          </Link>

          <div style={styles.userSection}>
            <div style={styles.userInfo}>
              <span style={styles.userName}>{user.name}</span>
              <span style={styles.userRole}>{user.role || "Officer"}</span>
            </div>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <div style={styles.authLinks}>
          <Link className="nav-hover" style={styles.link} to="/login">
            Login
          </Link>
          <Link className="nav-hover" style={styles.registerLink} to="/register">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    background: "#030303",
    padding: "15px 25px",
    display: "flex",
    gap: "25px",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
  },
  registerLink: {
    color: "#3b82f6",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
  },
  logo: {
    height: "40px",
    width: "auto",
    display: "block",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginLeft: "auto",
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    color: "white",
    fontSize: "14px",
  },
  userName: {
    fontWeight: "bold",
  },
  userRole: {
    fontSize: "12px",
    color: "#3b82f6",
  },
  logoutBtn: {
    background: "rgba(239, 68, 68, 0.2)",
    color: "#fca5a5",
    border: "1px solid rgba(239, 68, 68, 0.4)",
    padding: "6px 12px",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  authLinks: {
    display: "flex",
    gap: "15px",
    marginLeft: "auto",
  },
};