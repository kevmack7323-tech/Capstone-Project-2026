import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateIncident() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [operationContext, setOperationContext] = useState("");
    const [aiRisk, setAiRisk] = useState("");
    const [severity, setSeverity] = useState("");
    const navigate = useNavigate();
    //Handle form submission and send new incident data to the backend API
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/incidents", {
                title,
                description,
                operationContext,
                ai_risk_level: aiRisk,
                severity
            });

            navigate("/incidents?refresh=true");
        } catch (error) {
            console.log("Error creating incident:", error);
        }
    };

    return (
        <div className="container form-container">
            <h1>Create New Incident</h1>

            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Description:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                    />
                </label>

                <label>
                    Operation Context:
                    <input
                        type="text"
                        value={operationContext}
                        onChange={(e) => setOperationContext(e.target.value)}
                    />
                </label>

                <label>
                    Severity:
                    <select
                        value={severity}
                        onChange={(e) => setSeverity(e.target.value)}
                    >
                        <option value="">Not specified</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </label>

                <label>
                    AI Risk Level:
                    <select
                        value={aiRisk}
                        onChange={(e) => setAiRisk(e.target.value)}
                        required
                    >
                        <option value="">Select Risk Level</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </label>

                <button type="submit">
                    Submit Incident
                </button>
            </form>
        </div>
    );
}