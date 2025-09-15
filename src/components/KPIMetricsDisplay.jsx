import React from 'react';

export default function KPIMetricsDisplay({ metrics }) {
  return (
    <div className="kpi-metrics">
      <div>Incidents: {metrics.incidents_count}</div>
      <div>Average Response Time: {metrics.avg_response_time} min</div>
      <div>Resource Utilization: {metrics.resource_utilization}%</div>
      <div>Shelter Occupancy: {metrics.shelter_occupancy}%</div>
    </div>
  );
}
