import api from "../api/axios.js"
import { useEffect, useState } from "react"

export default function IncidentList() {

    const [incidents, setIncidents] = useState([]);
    const [severityFilter, setSeverityFilter] = useState("");
    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const url = severityFilter
                    ? `/incidents?severity=${severityFilter}`
                    : "/incidents";
                const result = await api.get(url);
                setIncidents(result.data);
            } catch (error) {
                console.log("Error fetching incidents:", error)
            }
        };

        fetchIncidents();
    }, [severityFilter]);

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

    const severityOrder = {
        Critical: 4,
        High: 3,
        Medium: 2,
        Low: 1
    };

    const sortedIncidents = [...incidents].sort((a, b) => {
        return severityOrder[b.severity] - severityOrder[a.severity];
    })

    return (
        <div className="container">
            <h1>MoMA Security Incidents</h1>
            <a href="/create">
                <button>New Incident</button>
            </a>
            {sortedIncidents.map(incident => (
                <div key={incident._id} className="incident-card" >
                    <h2>{incident.title}</h2>
                    <p>{incident.description}</p>
                    <div className="incident-severity">
                        <p>
                            <strong>Severity:</strong>
                            <span className={`badge badge-${getSeverityClass(incident.severity)}`}>
                                {incident.severity || "Not specified"}
                            </span>

                        </p>
                    </div>
                    <p>
                        <strong>AI Risk:</strong>
                        <span className={`badge badge-${getRiskClass(incident.aiRisk, incident.ai_risk_level)}`}>
                            {incident.aiRisk || incident.ai_risk_level || "Not specified"}
                        </span>

                    </p>
                    <p><strong>Context:</strong> {incident.operationContext}</p>
                    <a href={`/edit/${incident._id}`}><button className="btn-primary">Edit</button></a>
                    <button className="btn-danger" onClick={() => handleDelete(incident._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}