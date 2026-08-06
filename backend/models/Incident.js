import mongoose from 'mongoose';

const incidentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    operationContext: { type: String, required: true },
    severity: { type: String, required: false, default: "Not specified" },
    ai_risk_level: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], required: true },
    status: { type: String, default: 'Active' },
    description: String
}, { timestamps: true });

const Incident = mongoose.model('Incident', incidentSchema);

export default Incident;