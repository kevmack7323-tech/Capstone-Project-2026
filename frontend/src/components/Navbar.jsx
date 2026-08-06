export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <a style={styles.link} href="/">Home</a>
      <a style={styles.link} href="/incidents">Show Incidents</a>
      <a style={styles.link} href="/create">Create Incident</a>
    </nav>
  );
}

const styles = {
  nav: {
    background: "#222",
    padding: "15px 25px",
    display: "flex",
    gap: "25px",
    justifyContent: "center"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
  }
};