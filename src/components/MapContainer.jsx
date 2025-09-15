// src/components/MapContainer.jsx
import React, { useEffect, useRef } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const resourceIcons = {
    Engine: new L.Icon({ iconUrl: 'https://img.icons8.com/ios-filled/50/000000/fire-truck.png', iconSize: [30, 30] }),
    Truck: new L.Icon({ iconUrl: 'https://img.icons8.com/ios-filled/50/000000/truck.png', iconSize: [30, 30] }),
    Ambulance: new L.Icon({ iconUrl: 'https://img.icons8.com/ios-filled/50/000000/ambulance.png', iconSize: [30, 30] }),
    'Fast Response Unit': new L.Icon({ iconUrl: 'https://img.icons8.com/ios-filled/50/000000/car.png', iconSize: [25, 25] }),
    Command: new L.Icon({ iconUrl: 'https://img.icons8.com/ios-filled/50/000000/suv.png', iconSize: [30, 30] }),
    Default: new L.Icon({ iconUrl: 'https://img.icons8.com/ios-filled/50/000000/vehicle.png', iconSize: [25, 25] })
};

export default function MapContainer({ incidents, resources, selectedIncidentId, onSelectIncident }) {
  const mapRef = useRef(null);
  const incidentMarkerRefs = useRef({});

  const incidentIcon = (priority) => new L.DivIcon({
    className: `incident-blip-marker ${priority === 'CRITICAL' ? 'critical' : ''}`,
    iconSize: [16, 16],
  });

  useEffect(() => {
    if (selectedIncidentId && incidentMarkerRefs.current[selectedIncidentId] && mapRef.current) {
      const marker = incidentMarkerRefs.current[selectedIncidentId];
      mapRef.current.flyTo(marker.getLatLng(), 14, {
          animate: true,
          duration: 1.5
      });
      marker.openPopup();
    }
  }, [selectedIncidentId]);

  return (
    <div className="h-full w-full">
      <LeafletMap
        center={[30.71510, 76.75591]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        {Object.values(incidents).map((incident) => (
          <Marker
            key={incident.id}
            position={incident.position}
            icon={incidentIcon(incident.priority)}
            ref={(el) => (incidentMarkerRefs.current[incident.id] = el)}
            eventHandlers={{ click: () => onSelectIncident(incident.id) }}
            zIndexOffset={1000}
          >
            <Tooltip permanent direction="top" offset={[0, -8]} opacity={0.9} className="font-sans !bg-white !text-black !border-gray-300">
              {incident.id}
            </Tooltip>
            <Popup>
              <div className="text-black">
                <h3 className="font-bold text-base m-0">{incident.title}</h3>
                <p className="text-sm m-0">{incident.id}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* --- SAFEGUARD --- */}
        {/* Ensure resources is an array before mapping */}
        {Array.isArray(resources) && resources.map((resource) => (
            <Marker
                key={resource.id}
                position={resource.position}
                icon={resourceIcons[resource.type] || resourceIcons.Default}
            >
                <Tooltip direction="bottom" offset={[0, 10]} opacity={0.8}>
                    <span className="font-bold">{resource.id}</span> - {resource.status}
                </Tooltip>
            </Marker>
        ))}
      </LeafletMap>
    </div>
  );
}