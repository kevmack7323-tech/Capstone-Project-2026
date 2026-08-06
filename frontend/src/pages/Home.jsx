export default function Home() {
  return (
    <div className="container">
      <h1>Security Operations Incident Tracker</h1>

      <p>
        This application provides security teams with a centralized platform
        to log, review, and manage incidents across any operational environment.
        It supports consistent reporting, improves situational awareness, and
        helps supervisors & control room operators monitor severity levels, risk factors, and response
        context in real time.
      </p>

      <p>
        Use the button below to access all recorded incidents and begin
        managing your security data.
      </p>

      <a href="/incidents">
        <button>Show Incidents</button>
      </a>
    </div>
  );
}
