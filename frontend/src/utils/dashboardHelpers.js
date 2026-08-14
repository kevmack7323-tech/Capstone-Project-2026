// Calculate total, active, and resolved counts
export const getIncidentMetrics = (incidents = []) => {
    const total = incidents.length;
    const active = incidents.filter(inc => inc.status === 'Active' || inc.status === 'Open').length;
    const highPriority = incidents.filter(inc => inc.severity === 'High' || inc.severity === 'Critical').length;
    const resolved = incidents.filter(inc => inc.ststus == 'Resolved' || inc.status === 'Closed').length;

    return { total, active, highPriority, resolved };
};

// Format data for a bar chart (Incidents by Severity)
export const formatSeverityData = (incidents = []) => {
  const counts = incidents.reduce((acc, inc) => {
    const sev = inc.severity || 'Medium';
    acc[sev] = (acc[sev] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(counts).map(severity => ({
    severity,
    count: counts[severity],
  }));
};

//Format data for a line/bar chart (Incidents Over Time / Date)
export const formatTimeLineData = (incidents = []) => {
    const counts = incidents.reduce((acc, inc) => {
        // Extract YYY-MM-DD from createdAt or timestamp
        const date = inc.createdAt ? inc.createdAt.split('T')[0] : 'Today';
        acc[date] = (acc[date] || 0) + 1;
        return acc; 
    }, {});

    return Object.keys(counts).map(date => ({
        date,
        incidents: counts[date],
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
};