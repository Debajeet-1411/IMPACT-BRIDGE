"use client";
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
const iconUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png';
const iconRetinaUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png';
const shadowUrl = 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png';

const customIcon = L.icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Vehicle Icon
const truckIcon = L.divIcon({
    html: `<div style="font-size: 16px; line-height: 1; text-shadow: 0 0 5px #000;">🚚</div>`,
    className: 'custom-vehicle-icon',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

// Major Roads in Pune (Approximate coordinates)
const ROAD_NETWORKS = [
    // Pune-Bangalore Highway (North-South)
    [
        [18.5700, 73.7800], [18.5600, 73.7850], [18.5500, 73.7900],
        [18.5300, 73.8000], [18.5100, 73.8100], [18.4900, 73.8200], [18.4700, 73.8300]
    ],
    // Ahmednagar Road (NorthEast to Center)
    [
        [18.5800, 73.9500], [18.5700, 73.9300], [18.5600, 73.9100],
        [18.5500, 73.8900], [18.5400, 73.8800], [18.5300, 73.8700]
    ],
    // Old Mumbai-Pune Hwy (West to Center)
    [
        [18.5750, 73.8000], [18.5650, 73.8200], [18.5500, 73.8400],
        [18.5400, 73.8500], [18.5300, 73.8550], [18.5200, 73.8600]
    ],
    // Solapur Road (East to Center)
    [
        [18.5000, 73.9500], [18.5100, 73.9300], [18.5150, 73.9100],
        [18.5200, 73.8900], [18.5250, 73.8700]
    ]
];

interface Vehicle {
    id: number;
    routeId: number;
    segmentIndex: number; // Current starting point index
    direction: 1 | -1;    // 1 = moving towards higher indices, -1 = lowering
    segmentProgress: number; // 0 to 1
    speed: number;
    current: [number, number];
    pathHistory: [number, number][]; // For ray tracing trail
}

function lerp(start: number, end: number, t: number) {
    return start * (1 - t) + end * t;
}

export default function MovingVehiclesMap() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    // Pune Center
    const center: [number, number] = [18.5204, 73.8567];

    useEffect(() => {
        // Initialize 12 vehicles assigned to random roads
        const initialVehicles: Vehicle[] = Array.from({ length: 12 }).map((_, i) => {
            const routeId = i % ROAD_NETWORKS.length;
            const route = ROAD_NETWORKS[routeId];
            // Pick a random start point (safe from ends for simplicity, or handle logic)
            // Safety: up to length-2 so forward works
            const startSegment = Math.floor(Math.random() * (route.length - 1));

            return {
                id: i,
                routeId,
                segmentIndex: startSegment,
                direction: 1, // Start moving forward
                segmentProgress: Math.random(),
                // Much slower speed: ~0.005 progress per tick (approx 30km/h simulation)
                // Reduced even further to 1/4th speed
                speed: (0.002 + Math.random() * 0.003) / 4,
                current: route[startSegment] as [number, number],
                pathHistory: []
            };
        });
        setVehicles(initialVehicles);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setVehicles(prev => prev.map(v => {
                const route = ROAD_NETWORKS[v.routeId];
                let nextProgress = v.segmentProgress + v.speed;
                let currentIdx = v.segmentIndex;
                let direction = v.direction;

                // Move to next segment if progress > 1
                if (nextProgress >= 1) {
                    nextProgress = 0;

                    // Logic: You are at 'currentIdx', moving to 'currentIdx + direction'
                    // The move is finished. The 'currentIdx + direction' becomes the new 'currentIdx'
                    const arrivalPoint = currentIdx + direction;
                    currentIdx = arrivalPoint;

                    // Calculate NEXT target to verify bounds
                    let nextTarget = currentIdx + direction;

                    // If we hit the end (length-1) or start (0), reverse direction
                    if (nextTarget >= route.length || nextTarget < 0) {
                        direction *= -1; // Flip direction
                        v.pathHistory = []; // Optional: clear trail on turn-around or keep it? Let's keep smooth
                    }
                }

                const p1 = route[currentIdx];
                // Target is always current + direction
                const p2 = route[currentIdx + direction];

                // Update Trail (keep last 20 points for ray tracing effect)
                // Only add to history if we moved significantly or it's a new frame
                // Actually standard push is fine given the loop speed

                // Interpolate position
                const lat = lerp(p1[0], p2[0], nextProgress);
                const lng = lerp(p1[1], p2[1], nextProgress);
                const currentPos: [number, number] = [lat, lng];

                const newHistory = [...v.pathHistory, currentPos].slice(-20);

                return {
                    ...v,
                    segmentIndex: currentIdx,
                    direction: direction,
                    segmentProgress: nextProgress,
                    current: currentPos,
                    pathHistory: newHistory
                };
            }));
        }, 50); // 20fps update rate

        return () => clearInterval(interval);
    }, []);

    return (
        <MapContainer
            center={center}
            zoom={12}
            style={{ height: '100%', width: '100%', borderRadius: '1rem', background: '#16181C' }}
            zoomControl={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {/* Draw Base Roads (Optional: Faint lines to show infrastructure) */}
            {ROAD_NETWORKS.map((route, i) => (
                <Polyline key={`road-${i}`} positions={route as L.LatLngExpression[]} pathOptions={{ color: '#2F3336', weight: 4, opacity: 0.5 }} />
            ))}

            {vehicles.map(v => (
                <div key={v.id}>
                    {/* Ray Tracing Trail - Only render if we have points */}
                    {v.pathHistory.length > 1 && (
                        <Polyline
                            positions={v.pathHistory}
                            pathOptions={{ color: '#2563EB', weight: 3, opacity: 0.6 }}
                        />
                    )}

                    {/* The Vehicle */}
                    <Marker position={v.current} icon={truckIcon}>
                        <Popup className="custom-popup">
                            <div className="text-black font-bold text-xs p-1">Vehicle #{v.id + 1}</div>
                        </Popup>
                    </Marker>
                </div>
            ))}
        </MapContainer>
    );
}
