import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Detection } from "../types/detection";

interface AnomalyMapProps {
  detections: Detection[];
  selectedId: string | null;
  onSelect: (detection: Detection) => void;
}

function AnomalyMap({
  detections,
  selectedId,
  onSelect,
}: AnomalyMapProps) {
  useEffect(() => {
    const map = L.map("aquascan-map", {
      zoomControl: true,
    }).setView([17.67, 83.29], 13);

    // OpenStreetMap
    L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
        className: "aquascan-map-tiles",
      }
    ).addTo(map);

    // Sonar survey zone
    const surveyArea: [number, number][] = [
      [17.69, 83.27],
      [17.69, 83.32],
      [17.64, 83.32],
      [17.64, 83.27],
    ];

    L.polygon(surveyArea, {
      color: "#22d3ee",
      weight: 2,
      fillColor: "#22d3ee",
      fillOpacity: 0.08,
      dashArray: "8 6",
    }).addTo(map);

    // Survey zone label
    L.marker([17.685, 83.295], {
      icon: L.divIcon({
        className: "survey-label",
        html: `
          <div style="
            background: rgba(2, 6, 23, 0.90);
            border: 1px solid rgba(34, 211, 238, 0.5);
            color: #67e8f9;
            padding: 6px 10px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            white-space: nowrap;
          ">
            SONAR SURVEY ZONE
          </div>
        `,
      }),
    }).addTo(map);

    // Detection markers
    detections.forEach((detection) => {
      let color = "#facc15";

      // Status gets priority over anomaly class
      if (detection.triage_status === "confirmed") {
        color = "#22c55e";
      } else if (detection.triage_status === "rejected") {
        color = "#ef4444";
      } else if (detection.class_id === 3) {
        color = "#facc15";
      } else if (detection.class_id === 1) {
        color = "#fb923c";
      } else {
        color = "#ef4444";
      }

      const isSelected =
        detection.id === selectedId;

      const marker = L.circleMarker(
        [detection.lat, detection.lon],
        {
          radius: isSelected ? 12 : 8,
          color,
          fillColor: color,
          fillOpacity: 0.9,
          weight: isSelected ? 3 : 2,
        }
      ).addTo(map);

      // Tooltip
      marker.bindTooltip(
        `${detection.class_name.replaceAll(
          "_",
          " "
        )} • ${(detection.confidence * 100).toFixed(
          0
        )}% • ${detection.triage_status}`
      );

      // Click marker
      marker.on("click", () => {
        onSelect(detection);
      });
    });

    return () => {
      map.remove();
    };
  }, [detections, selectedId, onSelect]);

  return (
    <div className="relative h-full w-full">

      {/* Map */}
      <div
        id="aquascan-map"
        className="h-full w-full"
      />

      {/* Marine Survey Information */}
      <div className="absolute left-4 top-4 z-[500] rounded-lg border border-slate-700 bg-slate-950/90 px-4 py-3 shadow-xl backdrop-blur">
        <p className="text-xs uppercase tracking-wider text-cyan-400">
          Marine Survey
        </p>

        <p className="mt-1 text-sm font-medium text-slate-200">
          Visakhapatnam Offshore
        </p>

        <p className="mt-1 text-xs text-slate-500">
          Active sonar detection zone
        </p>
      </div>

      {/* Live Analysis */}
      <div className="absolute right-4 top-4 z-[500] flex items-center gap-2 rounded-full border border-emerald-400/20 bg-slate-950/90 px-3 py-2 backdrop-blur">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

        <span className="text-xs font-medium text-emerald-400">
          SONAR ANALYSIS ACTIVE
        </span>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[500] rounded-lg border border-slate-700 bg-slate-950/95 p-3 shadow-xl backdrop-blur">

        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Detection Legend
        </p>

        <div className="space-y-2 text-xs">

          {/* Pending classes */}
          <p className="pt-1 text-[10px] uppercase tracking-wider text-slate-600">
            Pending Detection
          </p>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="text-slate-300">
              Ghost Net
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-orange-400" />
            <span className="text-slate-300">
              Cylinder / Drum / Mine
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="text-slate-300">
              Pipe / Cable / Structure
            </span>
          </div>

          {/* Triage status */}
          <p className="mt-2 border-t border-slate-800 pt-2 text-[10px] uppercase tracking-wider text-slate-600">
            Triage Status
          </p>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-green-500" />
            <span className="text-slate-300">
              Confirmed
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="text-slate-300">
              Rejected
            </span>
          </div>

          {/* Survey zone */}
          <div className="mt-2 border-t border-slate-800 pt-2">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 border border-cyan-400 bg-cyan-400/10" />
              <span className="text-slate-300">
                Sonar Survey Zone
              </span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default AnomalyMap;