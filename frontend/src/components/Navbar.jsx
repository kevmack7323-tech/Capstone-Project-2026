import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
    <img src={logo} alt="MackSolutions Logo" className="navbrand-logo" style={styles.logo}/>

      <a className="nav-hover" style={styles.link} href="/">Home</a>
      <a className="nav-hover" style={styles.link} href="/incidents">Show Incidents</a>
      <a className="nav-hover" style={styles.link} href="/create">Create Incident</a>
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
    marginBottom: "20px"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
  },
    logo: {
    height: "40px",           
    width: "auto",           
    display: "block"
  },
};