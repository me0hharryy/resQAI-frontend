// src/components/ActionPanel.jsx
import React, { useState, useEffect } from 'react';
import { Send, AlertTriangle, ChevronsRight, RotateCcw } from 'lucide-react';

export default function ActionPanel({ selectedIncident, resources, onDispatchUnit, onRecallUnit }) {
    const [showAvailableUnits, setShowAvailableUnits] = useState(false);

    useEffect(() => {
        setShowAvailableUnits(false);
    }, [selectedIncident]);

    const getResource = (unitId) => resources.find(r => r.id === unitId);

    const availableUnitsForDispatch = resources.filter(r =>
        r.status === 'Available' &&
        selectedIncident &&
        !selectedIncident.assignedUnits.includes(r.id)
    );

    const priorityClasses = "text-xs font-bold inline-block py-1 px-3 rounded-full";
    const statusClasses = "text-xs font-semibold inline-block py-1 px-3 rounded-full bg-gray-200 text-gray-700";

    return (
        <div className="bg-white rounded-lg shadow-md flex flex-col h-full">
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
                <h3 className="font-bold text-lg text-gray-900">
                    {selectedIncident ? `Incident Details` : 'Details & Actions'}
                </h3>
            </div>

            <div className="flex-grow p-4 overflow-y-auto min-h-0">
                {selectedIncident ? (
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-start gap-4">
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-blue-600">{selectedIncident.id}</p>
                                    <h4 className="text-xl font-semibold text-gray-900">{selectedIncident.title}</h4>
                                    <p className="text-sm text-gray-500">{selectedIncident.location}</p>
                                </div>
                                <div className={`${priorityClasses} ${selectedIncident.priority === 'CRITICAL' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                                    {selectedIncident.priority}
                                </div>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                            <h5 className="font-bold text-gray-800 mb-1 text-sm">AI Recommendation</h5>
                            <p className="text-sm text-gray-700">{selectedIncident.aiRecommendation}</p>
                        </div>

                        <div>
                            <h5 className="font-bold mb-2 text-gray-800 text-sm">Assigned Units</h5>
                            <ul className="space-y-2 text-sm max-h-48 overflow-y-auto">
                                {selectedIncident.assignedUnits.map(unitId => {
                                    const resource = getResource(unitId);
                                    if (!resource) return null;
                                    return (
                                        <li key={unitId} className="flex justify-between items-center p-2 bg-gray-100 rounded-md">
                                            <span className="text-gray-800 font-semibold">{unitId}</span>
                                            <div className="flex items-center gap-2">
                                                <div className={statusClasses}>
                                                    {resource.status}
                                                </div>
                                                <button
                                                    // --- CORRECTED FUNCTION CALL ---
                                                    onClick={() => onRecallUnit(selectedIncident.id, resource.id)}
                                                    className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-700 p-1.5 rounded-md transition-colors"
                                                    title="Recall Unit"
                                                >
                                                    <RotateCcw size={14} />
                                                </button>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-bold mb-2 text-gray-800 text-sm">Action Log</h5>
                            <ul className="space-y-1 text-xs font-mono text-gray-500 p-2 bg-gray-100 rounded-md max-h-40 overflow-y-auto">
                                {selectedIncident.log.map((entry, index) => <li key={index}>{entry}</li>)}
                            </ul>
                        </div>

                        {showAvailableUnits && (
                            <div>
                                <h5 className="font-bold mb-2 text-gray-800 text-sm">Available Units</h5>
                                <ul className="space-y-2 text-sm border-t border-gray-200 pt-3 max-h-40 overflow-y-auto">
                                    {availableUnitsForDispatch.length > 0 ? (
                                        availableUnitsForDispatch.map(unit => (
                                            <li key={unit.id} className="flex justify-between items-center p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                                                <span className="text-gray-800">{unit.id} ({unit.type})</span>
                                                <button onClick={() => onDispatchUnit(selectedIncident.id, unit.id)} className="flex items-center gap-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-md text-xs transition-colors">
                                                    Dispatch <ChevronsRight size={14} />
                                                </button>
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 p-2">No additional units available.</p>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center text-gray-400 mt-10 flex flex-col items-center gap-4">
                        <AlertTriangle size={48} />
                        <p className="text-lg">No Incident Selected</p>
                        <p className="max-w-xs">Click an event or map marker to see details.</p>
                    </div>
                )}
            </div>
            {selectedIncident && (
                <div className="p-4 border-t border-gray-200 flex-shrink-0">
                    <button onClick={() => setShowAvailableUnits(!showAvailableUnits)} className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white font-bold py-2.5 px-4 rounded-lg transition-colors">
                        <Send size={16} />
                        {showAvailableUnits ? 'Hide Units' : 'Dispatch Units'}
                    </button>
                </div>
            )}
        </div>
    );
}