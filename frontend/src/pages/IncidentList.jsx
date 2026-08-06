import api from "../api/axios.js"
import { useEffect, useState } from "react"

export default function IncidentList() {

    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const result = await api.get("/incidents");
                setIncidents(result.data);
            } catch (error) {
                console.log("Error fetching incidents:", error)
            }
        };

        fetchIncidents();
    }, []);

    return (
        <div style={{ padding: "20px" }} >
            <h1>MoMA Security Incidents</h1>
            <a href="/create">
                <button>New Incident</button>
            </a>
            {incidents.map(incident => (
                <div key={incident._id} style={{ border: "1px solid grey", padding: "10px", margin: "10px 0" }} >
                    <h2>{incident.title}</h2>
                    <p>{incident.description}</p>
                    <p><strong>Severity:</strong> {incident.severity}</p>
                    <p><strong>AI Risk:</strong> {incident.ai_risk_level}</p>
                    <p><strong>Context:</strong> {incident.operationContext}</p>
                </div>
            ))}
        </div>
    );
}