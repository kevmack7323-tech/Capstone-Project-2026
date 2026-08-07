import express from "express";
import {
  getIncidents,
  getIncidentById,
  createIncident,
  updateIncident,
  deleteIncident
} from "../controllers/incidentController.js";

const router = express.Router();

//Get all incidents
router.get("/", getIncidents);

//Get a single incident by its ID
router.get("/:id", getIncidentById);

//Create a new incident and save it to the database
router.post("/", createIncident);

//Update an existing incident using its unique ID
router.put("/:id", updateIncident);

//Delete an incident from the database
router.delete("/:id", deleteIncident);

export default router;
