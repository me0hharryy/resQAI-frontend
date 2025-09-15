// src/components/Dashboard.jsx
import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import EventFeed from './EventFeed';
import MapContainer from './MapContainer';
import ActionPanel from './ActionPanel';
import NewIncidentModal from './NewIncidentModal';
import { api } from '../services/api';

export default function Dashboard() {
  const [incidents, setIncidents] = useState({});
  const [resources, setResources] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAllData = useCallback(async () => {
    try {
      const [incidentsData, resourcesData, eventsData] = await Promise.all([
        api.getIncidents(),
        api.getResources(),
        api.getEvents(),
      ]);
      setIncidents(incidentsData);
      setResources(resourcesData);
      setEvents(eventsData);
    } catch (err) {
      setError('Failed to connect to the API. Make sure your backend server is running and CORS is configured.');
      console.error(err);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchAllData().finally(() => setLoading(false));
    const interval = setInterval(fetchAllData, 5000);
    return () => clearInterval(interval);
  }, [fetchAllData]);

  const handleCreateIncident = async (incidentData) => {
    await api.createIncident(incidentData);
    await fetchAllData();
  };

  const handleDispatchUnit = async (incidentId, resourceId) => {
    await api.dispatchUnit(incidentId, resourceId);
    await fetchAllData();
  };

  const handleRecallUnit = async (incidentId, resourceId) => {
    await api.recallUnit(incidentId, resourceId);
    await fetchAllData();
  };

  if (loading) return <div className="h-screen flex justify-center items-center font-bold text-lg">Loading Command Center...</div>;
  if (error) return <div className="h-screen flex justify-center items-center text-red-600 font-bold text-center p-4">{error}</div>;

  return (
    <div className="h-screen flex flex-col bg-gray-100 text-gray-800">
      {isModalOpen && <NewIncidentModal onClose={() => setIsModalOpen(false)} onCreateIncident={handleCreateIncident} />}
      <Header
        resources={resources}
        incidents={incidents}
        onNewIncidentClick={() => setIsModalOpen(true)}
      />
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-[350px_1fr_400px] gap-4 p-4 overflow-hidden">
        <EventFeed events={events} onEventSelect={setSelectedIncidentId} />
        <div className="rounded-lg shadow-md overflow-hidden">
          <MapContainer
            incidents={incidents}
            // --- FIX ---
            // Pass the resources array to the map
            resources={resources}
            selectedIncidentId={selectedIncidentId}
            onSelectIncident={setSelectedIncidentId}
          />
        </div>
        <ActionPanel
          key={selectedIncidentId}
          selectedIncident={incidents[selectedIncidentId]}
          resources={resources}
          onDispatchUnit={handleDispatchUnit}
          onRecallUnit={handleRecallUnit}
        />
      </main>
    </div>
  );
}