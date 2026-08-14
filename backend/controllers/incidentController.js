import Incident from "../models/Incident.js";
import { analyzeIncident } from "../services/aiService.js";

// GET ALL INCIDENTS
export const getIncidents = async (req, res) => {
  try {
    const { severity } = req.query;

    const filter = severity ? { severity } : {};
    const incidents = (await Incident.find(filter)).toSorted({ createdAt: -1 });
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET A SINGLE INCIDENT BY ID
export const getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.status(200).json(incident);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//CREATE INCIDENT
export const createIncident = async (req, res) => {
  try {
    const { title, description, location, severity } = req.body;

    // Automatically evaluate risk & recommedations via AI
    const aiIntelligence = await analyzeIncident({ title, description, location, severity });

    // Create document with AI-computed fields
    const incident = await Incident.create({
      title,
      description,
      location,
      severity,
      riskLevel: aiIntelligence.riskLevel,
      aiSummary: aiIntelligence.aiSummary,
      tacticalRecommendations: aiIntelligence.tacticalRecommendations
    });

    // Grab the io instance and emit the newly created document
    const io = req.app.get("socketio");
    if (io) {
      io.emit("incidentCreated", incident);
    }
    res.status(201).json(incident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE INCIDENT
export const updateIncident = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location, severity, status } = req.body;

    // Re-evaluate AI threat level based on updated operational details
    const aiIntelligence = await analyzeIncident({ title, description, location, severity });

    const updatedIncident = await Incident.findByIdAndUpdate(
      id,
      {
        title,
        description,
        location,
        severity,
        status,
        riskLevel: aiIntelligence.riskLevel,
        aiSummary: aiIntelligence.aiSummary,
        tacticalRecommendations: aiIntelligence.tacticalRecommendations
      },
      { new: true }
    );
    // Broadcast the updated incident to all clients
    const io = req.app.get("socketio");
    if (io) {
      io.emit("incidentUpdated", updatedIncident);
    }
    res.status(200).json(updatedIncident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE INCIDENT
export const deleteIncident = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedIncident = await Incident.findByIdAndDelete(req.params.id);

    if (!deletedIncident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    // Broadcast the updated incident to all clients
    const io = req.app.get("socketio");
    if (io) {
      io.emit("incidentDeleted", id);
    }
    res.status(200).json({ message: "Incident deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
