import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateIncident() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [operationContext, setOperationContext] = useState("");
    const [location, setLocation] = useState("");
    const [severity, setSeverity] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    //Handle form submission and send new incident data to the backend API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            await api.post("/incidents", {
                title: title.trim(),
                description: description.trim(),
                operationContext: operationContext.trim(),
                location: location.trim(),
                severity
            });

            navigate("/incidents?refresh=true");
        } catch (error) {
            console.log("Error creating incident:", error);
            setErrorMsg(
                error.response?.data?.message || "Failed to create incident. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container form-container">
            <h1>Create New Incident</h1>

            {/* Render error banner if submission fails */}
            {errorMsg && (
                <div className="error-message" role="alert">
                    {errorMsg}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={loading}
                        required
                    />
                </label>

                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        disabled={loading}
                    />
                </label>

                <label>
                    Location:
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Main Lobby, Server Room B"
                        disabled={loading}
                        required
                    />
                </label>

                <label>
                    Operation Context:
                    <input
                        type="text"
                        value={operationContext}
                        onChange={(e) => setOperationContext(e.target.value)}
                        disabled={loading}
                    />
                </label>

                <label>
                    Severity:
                    <select
                        value={severity}
                        onChange={(e) => setSeverity(e.target.value)}
                        disabled={loading}
                    >
                        <option value="">Not specified</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </label>

                <button type="submit" disabled={loading}>
                    {loading ? "AI Analyzing Threat...." : "Submit Incident"}
                </button>
            </form>
        </div>
    );
}