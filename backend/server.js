import express from "express";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import dotenv, { configDotenv } from "dotenv";
import incidentRoutes from "./routes/incidentRoutes.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"

configDotenv()

const app = express();

// Create HTTP server from express app
const server = http.createServer(app);

// Initialize Socket.io and configure CORS for frontend
const io = new Server( server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

// Make io accessible to route controllers
app.set("socketio", io);

//Middleware for parsing JSON request bodies and enabling CORS
app.use(cors());
app.use(express.json());
app.use("/api/incidents", incidentRoutes);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Server is Running")
});

// Socket.io connection listener
io.on("connection", (socket) => {
    console.log(`Operator connected via WebSocket: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`Operator disconnected: ${socket.id}`)
    });
})

const PORT = process.env.PORT || 5500;
//Connect to MongoDB database to store and retrieve incident records
connectDB()

server.listen(PORT, () => {
console.log(`Server running on port ${PORT} with WebSocket support`)
});