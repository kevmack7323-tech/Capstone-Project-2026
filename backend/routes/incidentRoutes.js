import express from "express";
import {
  getIncidents,
  createIncident,
  updateIncident,
  deleteIncident
} from "../controllers/incidentController.js";

const router = express.Router();

router.get("/", getIncidents);
router.post("/", createIncident);
router.put("/:id", updateIncident);
router.delete("/:id", deleteIncident);

export default router;
