import api from "../api/axios.js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function IncidentList() {
    const [incidents, setIncidents] = useState([]);
    const [severityFilter, setSeverityFilter] = useState("");

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const shouldRefresh = queryParams.get("refresh");

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const url = severityFilter
                    ? `/incidents?severity=${severityFilter}`
                    : "/incidents";
                const result = await api.get(url);
                setIncidents(Array.isArray(result.data) ? result.data : [])
            } catch (error) {
                console.log("Error fetching incidents:", error)
            }
        };

        fetchIncidents();
    }, [severityFilter, location.search]);

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
        critical: 4,
        high: 3,
        medium: 2,
        low: 1
    };

    const incidentArray = Array.isArray(incidents)
        ? incidents.filter(i => i && typeof i === 'object')
        : [];

    const sortedIncidents = [...incidentArray].sort((a, b) => {
        const aKey = (a.severity || "").trim().toLowerCase();
        const bKey = (b.severity || "").trim().toLowerCase();

        const aSeverity = severityOrder[aKey] ?? 0;
        const bSeverity = severityOrder[bKey] ?? 0;

        return bSeverity - aSeverity;
    });

    return (
        <div className="container">
            <h1>MoMA Security Incidents</h1>
            <a href="/create">
                <button className="btn-primary">New Incident</button>
            </a>
            {sortedIncidents.map(incident => (
                <div key={incident._id} className="incident-card" >
                    <h2>{incident.title}</h2>
                    <p>{incident.description}</p>
                    <div className="incident-severity">
                        <p>
                            <strong>Severity:</strong>
                            <span className={`badge badge-${getSeverityClass(incident.severity) || "unknown"}`}>
                                {incident.severity || "Not specified"}
                            </span>
                        </p>
                    </div>
                    <p>
                        <strong>AI Risk:</strong>
                        <span className={`badge badge-${getRiskClass(incident.aiRisk, incident.ai_risk_level) || "unknown"}`}>
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