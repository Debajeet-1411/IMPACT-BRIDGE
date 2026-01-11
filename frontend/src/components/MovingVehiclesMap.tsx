"use client";

import { useEffect, useState, useMemo, Fragment } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Major Roads in Pune (Approximate coordinates)
const ROAD_NETWORKS: [number, number][][] = [
    // Pune-Bangalore Highway (North-South)
    [
        [18.57, 73.78],
        [18.56, 73.785],
        [18.55, 73.79],
        [18.53, 73.8],
        [18.51, 73.81],
        [18.49, 73.82],
        [18.47, 73.83],
    ],
    [
        [18.58, 73.95],
        [18.57, 73.93],
        [18.56, 73.91],
        [18.55, 73.89],
        [18.54, 73.88],
        [18.53, 73.87],
    ],
    [
        [18.575, 73.8],
        [18.565, 73.82],
        [18.55, 73.84],
        [18.54, 73.85],
        [18.53, 73.855],
        [18.52, 73.86],
    ],
    [
        [18.5, 73.95],
        [18.51, 73.93],
        [18.515, 73.91],
        [18.52, 73.89],
        [18.525, 73.87],
    ],
];

interface Vehicle {
    id: number;
    routeId: number;
    segmentIndex: number;
    direction: 1 | -1;
    segmentProgress: number;
    speed: number;
    current: [number, number];
    pathHistory: [number, number][];
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function MovingVehiclesMap() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    const truckIcon = useMemo(
        () =>
            L.divIcon({
                html: `<div style="font-size:16px;text-shadow:0 0 4px #000;">🚚</div>`,
                className: "",
                iconSize: [20, 20],
                iconAnchor: [10, 10],
            }),
        []
    );

    const center: [number, number] = [18.5204, 73.8567];

    useEffect(() => {
        const initialVehicles: Vehicle[] = Array.from({ length: 12 }).map((_, i) => {
            const routeId = i % ROAD_NETWORKS.length;
            const route = ROAD_NETWORKS[routeId];
            const segmentIndex = Math.floor(Math.random() * (route.length - 1));

            return {
                id: i,
                routeId,
                segmentIndex,
                direction: 1,
                segmentProgress: Math.random(),
                speed: (0.002 + Math.random() * 0.003) / 4,
                current: route[segmentIndex] as [number, number],
                pathHistory: [] as [number, number][],
            };
        });

        setVehicles(initialVehicles);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setVehicles(prev =>
                prev.map(v => {
                    const route = ROAD_NETWORKS[v.routeId];
                    let { segmentIndex, direction, segmentProgress } = v;

                    segmentProgress += v.speed;

                    while (segmentProgress >= 1) {
                        segmentProgress -= 1;
                        segmentIndex += direction;

                        // Reverse safely BEFORE going out of bounds
                        if (segmentIndex >= route.length - 1) {
                            segmentIndex = route.length - 2;
                            direction = -1;
                        }

                        if (segmentIndex <= 0) {
                            segmentIndex = 0;
                            direction = 1;
                        }
                    }

                    const p1 = route[segmentIndex];
                    const p2 = route[segmentIndex + direction];

                    const current: [number, number] = [
                        lerp(p1[0], p2[0], segmentProgress),
                        lerp(p1[1], p2[1], segmentProgress),
                    ];

                    const pathHistory = [...v.pathHistory, current].slice(-20);

                    return {
                        ...v,
                        segmentIndex,
                        direction,
                        segmentProgress,
                        current,
                        pathHistory,
                    };
                })
            );
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <MapContainer
            center={center}
            zoom={12}
            style={{ height: "100%", width: "100%", borderRadius: "1rem" }}
            zoomControl={false}
        >
            <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

            {ROAD_NETWORKS.map((r, i) => (
                <Polyline
                    key={i}
                    positions={r}
                    pathOptions={{ color: "#2F3336", weight: 4, opacity: 0.5 }}
                />
            ))}

            {vehicles.map(v => (
                <Fragment key={v.id}>
                    {v.pathHistory.length > 1 && (
                        <Polyline
                            positions={v.pathHistory}
                            pathOptions={{ color: "#2563EB", weight: 3, opacity: 0.6 }}
                        />
                    )}

                    <Marker position={v.current} icon={truckIcon}>
                        <Popup>
                            <strong>Vehicle #{v.id + 1}</strong>
                        </Popup>
                    </Marker>
                </Fragment>
            ))}
        </MapContainer>
    );
}
