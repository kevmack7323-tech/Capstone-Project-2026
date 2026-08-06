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

    const handleDelete = async (id) => {
        try {
            await api.delete(`/incidents/${id}`);
            setIncidents(incidents.filter(i => i._id !== id));
        } catch (error) {
            console.log("Error deleting incident:", error);
        }
    };

    const getSeverityClass = (severity) => {
        if (!severity) return "unknown";

        const normalized = severity.toLowerCase();

        if (["low", "medium", "high", "critical"].includes(normalized)) {
            return normalized;
        }

        return "unknown";
    };

    const getRiskClass = (aiRisk, ai_risk_level) => {
        const value = aiRisk || ai_risk_level;
        if (!value) return "unknown";

        const normalized = value.toLowerCase();

        if (["low", "medium", "high", "critical"].includes(normalized)) {
            return normalized;
        }

        return "unknown";
    };


    return (
        <div className="container" style={{ padding: "20px" }} >
            <h1>MoMA Security Incidents</h1>
            <a href="/create">
                <button>New Incident</button>
            </a>
            {incidents.map(incident => (
                <div key={incident._id} style={{ border: "1px solid grey", padding: "10px", margin: "10px 0" }} >
                    <h2>{incident.title}</h2>
                    <p>{incident.description}</p>
                    <p>
                        <strong>Severity:</strong>
                        <span className={`badge badge-${getSeverityClass(incident.severity)}`}>
                            {incident.severity || "Not specified"}
                        </span>

                    </p>
                    <p>
                        <strong>AI Risk:</strong>
                        <span className={`badge badge-${getRiskClass(incident.aiRisk, incident.ai_risk_level)}`}>
                            {incident.aiRisk || incident.ai_risk_level || "Not specified"}
                        </span>

                    </p>
                    <p><strong>Context:</strong> {incident.operationContext}</p>
                    <a href={`/edit/${incident._id}`}><button>Edit</button></a>
                    <button onClick={() => handleDelete(incident._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}