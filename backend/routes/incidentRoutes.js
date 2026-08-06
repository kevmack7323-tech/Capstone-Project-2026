import express from "express";
import {
  getIncidents,
  getIncidentById,
  createIncident,
  updateIncident,
  deleteIncident
} from "../controllers/incidentController.js";

const router = express.Router();

router.get("/", getIncidents);
router.get("/:id", getIncidentById);
router.post("/", createIncident);
router.put("/:id", updateIncident);
router.delete("/:id", deleteIncident);

export default router;
