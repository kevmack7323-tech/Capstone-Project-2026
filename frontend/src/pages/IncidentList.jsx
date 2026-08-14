import api from "../api/axios.js";
import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { io } from "socket.io-client";
import IncidentCharts from "../components/IncidentCharts.jsx";
import { getIncidentMetrics } from "../utils/dashboardHelpers.js";

export default function IncidentList() {
    const [incidents, setIncidents] = useState([]);
    const [severityFilter, setSeverityFilter] = useState("");
    const severityFilterRef = useRef(severityFilter);
    const [showAnalytics, setShowAnalytics] = useState(false);

    const location = useLocation();

    // Sync severityFilter state with URL search params
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const filterFromUrl = queryParams.get("severity") || "";
        setSeverityFilter(filterFromUrl);
    }, [location.search]);

    // Keep ref updated with latest filter state
    useEffect(() => {
        severityFilterRef.current = severityFilter;
    }, [severityFilter]);

    // Fetch incidents
    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const url = severityFilter
                    ? `/incidents?severity=${severityFilter}`
                    : "/incidents";
                const result = await api.get(url);
                setIncidents(Array.isArray(result.data) ? result.data : []);
            } catch (error) {
                console.log("Error fetching incidents:", error);
            }
        };

        fetchIncidents();
    }, [severityFilter, location.search]);

    // Initialize Socket.io connection
    useEffect(() => {
        const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5500";
        const socket = io(SOCKET_URL);

        socket.on("incidentCreated", (newincident) => {
            setIncidents((prev) => {
                const currentFilter = severityFilterRef.current;
                if (currentFilter && newincident.severity?.toLowerCase() !== currentFilter.toLowerCase()) {
                    return prev;
                }
                return [newincident, ...prev];
            });
        });

        socket.on("incidentUpdated", (updatedIncident) => {
            setIncidents((prev) => {
                const currentFilter = severityFilterRef.current;
                const matchesFilter = !currentFilter ||
                    updatedIncident.severity?.toLowerCase() === currentFilter.toLowerCase();

                if (!matchesFilter) {
                    return prev.filter((inc) => inc._id !== updatedIncident._id);
                }

                const exists = prev.some((inc) => inc._id === updatedIncident._id);
                if (exists) {
                    return prev.map((inc) =>
                        inc._id === updatedIncident._id ? updatedIncident : inc
                    );
                }
                return [updatedIncident, ...prev];
            });
        });

        socket.on("incidentDeleted", (deletedId) => {
            setIncidents((prev) => prev.filter((inc) => inc._id !== deletedId));
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/incidents/${id}`);
            setIncidents((prevIncidents) => prevIncidents.filter((i) => i._id !== id));
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

    // Map risk level in mongoose schema
    const getRiskClass = (riskLevel) => {
        if (!riskLevel) return "unknown";
        const normalized = riskLevel.toLowerCase();
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

                    <Link to="/create">
                        <button className="btn-primary" style={{ margin: 0 }}>New Incident</button>
                    </Link>
                </div>
            </div>

            <IncidentCharts
                incidents={incidentArray}
                isOpen={showAnalytics}
                onClose={() => setShowAnalytics(false)}
            />

            {/* Incident Cards Feed */}
            {sortedIncidents.map((incident) => (
                <div key={incident._id} className="incident-card">
                    <h2>{incident.title}</h2>
                    <p className="incident-description">{incident.description}</p>

                    {incident.location && (
                        <p className="meta-line">
                            <strong>Location:</strong> {incident.location}
                        </p>
                    )}

                    <p className="meta-line">
                        <strong>Severity:</strong>{" "}
                        <span className={`badge badge-${getSeverityClass(incident.severity)}`}>
                            {incident.severity || "Not specified"}
                        </span>
                    </p>

                    {/* AI Risk Level */}
                    <p className="meta-line">
                        <strong>AI Risk:</strong>{" "}
                        <span className={`badge badge-${getRiskClass(incident.riskLevel)}`}>
                            {incident.riskLevel || "Not specified"}
                        </span>
                    </p>

                    {/* AI Summary */}
                    {incident.aiSummary && (
                        <p className="meta-line" style={{ marginTop: '8px' }}>
                            <strong>AI Summary:</strong> {incident.aiSummary}
                        </p>
                    )}

                    {/* AI Tactical Recommendations */}
                    {incident.tacticalRecommendations && incident.tacticalRecommendations.length > 0 && (
                        <div className="meta-line" style={{ marginTop: '8px' }}>
                            <strong>Tactical Recommendations:</strong>
                            <ul style={{ margin: '4px 0 0 20px', padding: 0 }}>
                                {incident.tacticalRecommendations.map((rec, index) => (
                                    <li key={index}>{rec}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="card-actions">
                        <Link to={`/edit/${incident._id}`}>
                            <button className="btn-edit">Edit</button>
                        </Link>
                        <button className="btn-delete" onClick={() => handleDelete(incident._id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}