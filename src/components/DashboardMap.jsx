import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';

// Set a default center, e.g., for Mumbai
const defaultCenter = [19.0760, 72.8777];

const DashboardMap = ({ resources, hazardZone }) => {
  return (
    <MapContainer center={defaultCenter} zoom={12} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Render the hazard zone from GeoJSON data */}
      {hazardZone && <GeoJSON data={hazardZone} style={{ color: 'red', weight: 2, opacity: 0.5 }} />}

      {/* Map over the resources and create a marker for each */}
      {resources.map(resource => (
        <Marker key={resource.id} position={[resource.lat, resource.lon]}>
          <Popup>
            <b>{resource.type}: {resource.id}</b><br />
            Status: {resource.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
export default DashboardMap;