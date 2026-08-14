// src/components/IncidentCharts.jsx
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, CartesianGrid 
} from 'recharts';
import { formatSeverityData, formatTimeLineData } from '../utils/dashboardHelpers';

export default function IncidentCharts({ incidents, isOpen, onClose }) {
  if (!isOpen) return null;

  const severityData = formatSeverityData(incidents);
  const timelineData = formatTimeLineData(incidents);

  return (
    <div style={{
      background: '#0f172a',
      border: '1px solid #1e3a8a',
      borderRadius: '8px',
      padding: '20px',
      marginBottom: '20px',
      color: '#fff',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#60a5fa', margin: 0 }}>Operations Analytics & Metrics</h2>
          <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' }}>Live operational breakdown and severity trends</p>
        </div>
        <button 
          onClick={onClose}
          style={{
            background: '#1e293b',
            color: '#cbd5e1',
            border: '1px solid #334155',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: '600'
          }}
        >
          ✕ Close Panel
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Severity Breakdown */}
        <div style={{ background: '#1e293b', padding: '15px', borderRadius: '6px', border: '1px solid #334155' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '15px', color: '#e2e8f0' }}>Incidents by Severity</h3>
          <div style={{ height: '220px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="severity" stroke="#94a3b8" />
                <YAxis allowDecimals={false} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '4px' }} />
                <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Timeline Trend */}
        <div style={{ background: '#1e293b', padding: '15px', borderRadius: '6px', border: '1px solid #334155' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '15px', color: '#e2e8f0' }}>Incident Trend Over Time</h3>
          <div style={{ height: '220px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="date" stroke="#94a3b8" />
                <YAxis allowDecimals={false} stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', borderRadius: '4px' }} />
                <Line type="monotone" dataKey="incidents" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}