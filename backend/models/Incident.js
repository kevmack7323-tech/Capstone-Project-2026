import mongoose from 'mongoose';
//Mongoose Schema defining the structure of an incident in document
const incidentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },

    // User-selected physical severity
    severity: {
        type: String,
        enum: ["Low", "Medium", "High", "Critical"],
        default: "Low",
        required: true
    },

    // calculated by ai
    ai_risk_level: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'],
        default: "Low"
    },

    // Automated Ai Fields
    aiSummary: { type: String },
    tacticalRecommendations: [{ type: String }],

    status: {
        type: String,
        enum: ["Open", "In Progress", "Resolved"],
        default: "Open"
    },
}, { timestamps: true });

const Incident = mongoose.model('Incident', incidentSchema);

export default Incident;