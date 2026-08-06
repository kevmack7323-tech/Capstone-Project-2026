import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function EditIncident() {
  const { id } = useParams();
  const [incident, setIncident] = useState(null);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const result = await api.get(`/incidents/${id}`);
        setIncident(result.data);
      } catch (error) {
        console.log("Error fetching incident:", error);
      }
    };

    fetchIncident();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/incidents/${id}`, incident);
      window.location.href = "/";
    } catch (error) {
      console.log("Error updating incident:", error);
    }
  };

  if (!incident) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Incident</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={incident.title}
            onChange={(e) => setIncident({ ...incident, title: e.target.value })}
          />
        </label>

        <label>
          Description:
          <textarea
            value={incident.description}
            onChange={(e) =>
              setIncident({ ...incident, description: e.target.value })
            }
          />
        </label>

        <label>
          Operation Context:
          <input
            type="text"
            value={incident.operationContext}
            onChange={(e) =>
              setIncident({ ...incident, operationContext: e.target.value })
            }
          />
        </label>

        <label>
          AI Risk Level:
          <select
            value={incident.ai_risk_level}
            onChange={(e) =>
              setIncident({ ...incident, ai_risk_level: e.target.value })
            }
          >
            <option value="">Select Risk Level</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </label>

        <label>
          Severity:
          <select
            value={incident.severity}
            onChange={(e) =>
              setIncident({ ...incident, severity: e.target.value })
            }
          >
            <option value="">Not specified</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </label>

        <button type="submit">Update Incident</button>
      </form>
    </div>
  );
}
