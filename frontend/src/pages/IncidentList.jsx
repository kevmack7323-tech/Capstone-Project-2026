import api from "../api/axios.js";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client"
import IncidentCharts from "../components/IncidentCharts.jsx";
import { getIncidentMetrics } from "../utils/dashboardHelpers.js";

export default function IncidentList() {
    const [incidents, setIncidents] = useState([]);
    const [severityFilter, setSeverityFilter] = useState("");
    const [showAnalytics, setShowAnalytics] = useState(false);

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

        // initialize Socket.io connection to backend server
        const socket = io("http://localhost:5500");

        // listen for live incident creation broadcasts
        socket.on("incidentCreated", (newincident) => {
            setIncidents((prevIncidents) => [newincident, ...prevIncidents]);
        });

        // CLeanup socket connection on component unmount 
        return() => {
            socket.disconnect();
        };
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

    const severityOrder = { //Sort incidents by severity so the most critical issues appear first
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

    const metrics = getIncidentMetrics(incidentArray);

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                    <h1>MoMA Security Incidents</h1>
                    <p style={{ color: '#555', fontSize: '13px', margin: '4px 0 0 0' }}>
                        Total Tracked: <strong>{metrics.total}</strong> | Active Critical: <strong style={{ color: '#dc2626' }}>{metrics.highPriority}</strong>
                    </p>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <button 
                        onClick={() => setShowAnalytics(!showAnalytics)}
                        className="btn-primary"
                        style={{ background: showAnalytics ? '#1e293b' : undefined, margin: 0 }}
                    >
                        ☰ {showAnalytics ? 'Hide Analytics' : 'Analytics Dashboard'}
                    </button>

                    <a href="/create">
                        <button className="btn-primary" style={{ margin: 0 }}>New Incident</button>
                    </a> 
                </div>
            </div>

            {/* Collapsible Analytics Dashboard Panel matching app theme */}
            <IncidentCharts 
                incidents={incidentArray} 
                isOpen={showAnalytics} 
                onClose={() => setShowAnalytics(false)} 
            />

            {sortedIncidents.map(incident => (
                <div key={incident._id} className="incident-card">
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