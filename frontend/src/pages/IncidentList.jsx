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
        <div>
            <h1>MoMA Security Incidents</h1>

            {incidents.map(incident => (
                <div key={incident._id}>
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