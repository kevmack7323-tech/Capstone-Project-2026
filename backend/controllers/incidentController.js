import Incident from "../models/Incident.js";

export const getIncidents = async (req, res) => {
  try {
     const { severity } = req.query;

    const filter = severity ? { severity } : {};
    const incidents = await Incident.find(filter);
    res.status(200).json(incidents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

export const createIncident = async (req, res) => {
  try {
    const incident = await Incident.create(req.body);
    res.status(201).json(incident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateIncident = async (req, res) => {
  try {
    const updatedIncident = await Incident.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedIncident);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteIncident = async (req, res) => {
  try {
    await Incident.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Incident deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
