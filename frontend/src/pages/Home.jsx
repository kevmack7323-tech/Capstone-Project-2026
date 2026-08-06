export default function Home() {
  return (
      <div className="home-container">
      <header className="home-header">
        <h1 className="brand-title">MackSolutions</h1>
        <p className="brand-tagline">Security Operations Incident Tracker</p>
      </header>

      <section className="home-content">
        <p className="home-description">
        This application provides security teams with a centralized platform
        to log, review, and manage incidents across any operational environment.
        It supports consistent reporting, improves situational awareness, and
        helps supervisors & control room operators monitor severity levels, risk factors, and response
        context in real time.
      </p>

      <p className="home-description">
        Use the button below to access all recorded incidents and begin
        managing your security data.
      </p>

        <button
          className="home-button"
          onClick={() => (window.location.href = "/incidents")}
        >
          Show Incidents
        </button>
      </section>
      </div>
  );
}
