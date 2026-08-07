import express from "express";
import connectDB from "./config/db.js";
import dotenv, { configDotenv } from "dotenv";
import incidentRoutes from "./routes/incidentRoutes.js";
import cors from "cors";

configDotenv()

const app = express();
//Middleware for parsing JSON request bodies and enabling CORS
app.use(express.json());
app.use(cors());
app.use("/api/incidents", incidentRoutes);

app.get("/", (req, res) => {
    res.send("Server is Running")
});

const PORT = process.env.PORT;
//Connect to MongoDB database to store and retrieve incident records
connectDB()

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
});