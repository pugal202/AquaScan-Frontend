import { useEffect, useMemo, useState } from "react";
import type { Detection } from "../types/detection";

interface DetectionListProps {
  detections: Detection[];
  selectedId: string | null;
  onSelect: (detection: Detection) => void;
  onFilterChange: (detections: Detection[]) => void;
}

function DetectionList({
  detections,
  selectedId,
  onSelect,
  onFilterChange,
}: DetectionListProps) {
  const [search, setSearch] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredDetections = useMemo(() => {
    return detections.filter((detection) => {
      const matchesSearch =
        detection.class_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        detection.id
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesClass =
        classFilter === "all" ||
        detection.class_name === classFilter;

      const matchesStatus =
        statusFilter === "all" ||
        detection.triage_status === statusFilter;

      return (
        matchesSearch &&
        matchesClass &&
        matchesStatus
      );
    });
  }, [
    detections,
    search,
    classFilter,
    statusFilter,
  ]);

  // Send filtered detections to App.tsx
  useEffect(() => {
    onFilterChange(filteredDetections);
  }, [filteredDetections, onFilterChange]);

  const clearFilters = () => {
    setSearch("");
    setClassFilter("all");
    setStatusFilter("all");
  };

  return (
    <div className="flex h-full min-h-[600px] flex-col">

      {/* Header */}
      <div className="border-b border-slate-800 px-5 py-4">
        <h2 className="font-semibold text-slate-100">
          Detections
        </h2>

        <p className="text-xs text-slate-500">
          AI-detected marine anomalies
        </p>
      </div>

      {/* Search + Filters */}
      <div className="space-y-3 border-b border-slate-800 p-4">

        {/* Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search detections..."
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 outline-none placeholder:text-slate-600 focus:border-cyan-400"
        />

        {/* Class Filter */}
        <select
          value={classFilter}
          onChange={(e) => setClassFilter(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300 outline-none focus:border-cyan-400"
        >
          <option value="all">
            All anomaly types
          </option>

          <option value="ghost_net_filament">
            Ghost Net
          </option>

          <option value="pipe_cable">
            Pipe / Cable
          </option>

          <option value="cylinder_drum_mine">
            Cylinder / Drum / Mine
          </option>

          <option value="shipwreck_structure">
            Shipwreck / Structure
          </option>
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-300 outline-none focus:border-cyan-400"
        >
          <option value="all">
            All statuses
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="confirmed">
            Confirmed
          </option>

          <option value="rejected">
            Rejected
          </option>
        </select>

        {/* Clear Filters */}
        {(search ||
          classFilter !== "all" ||
          statusFilter !== "all") && (
          <button
            onClick={clearFilters}
            className="w-full rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-400 transition hover:border-slate-600 hover:text-slate-200"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Result Count */}
      <div className="border-b border-slate-800 px-4 py-2">
        <p className="text-xs text-slate-500">
          Showing {filteredDetections.length} of{" "}
          {detections.length} detections
        </p>
      </div>

      {/* Detection List */}
      <div className="min-h-0 flex-1 overflow-y-auto">

        {filteredDetections.length === 0 ? (
          <div className="p-6 text-center text-sm text-slate-500">
            No detections found.
          </div>
        ) : (
          filteredDetections.map((detection) => {
            const isSelected =
              detection.id === selectedId;

            const statusColor =
              detection.triage_status === "confirmed"
                ? "bg-emerald-400/10 text-emerald-400"
                : detection.triage_status === "rejected"
                ? "bg-red-400/10 text-red-400"
                : "bg-yellow-400/10 text-yellow-400";

            return (
              <button
                key={detection.id}
                onClick={() => onSelect(detection)}
                className={`w-full border-b border-slate-800 p-4 text-left transition ${
                  isSelected
                    ? "bg-cyan-400/10"
                    : "hover:bg-slate-800/60"
                }`}
              >
                {/* Detection Name + Confidence */}
                <div className="flex items-center justify-between gap-2">

                  <span className="font-medium capitalize text-slate-200">
                    {detection.class_name.replaceAll(
                      "_",
                      " "
                    )}
                  </span>

                  <span className="text-xs font-semibold text-cyan-400">
                    {(detection.confidence * 100).toFixed(0)}%
                  </span>

                </div>

                {/* ID + Status */}
                <div className="mt-2 flex items-center justify-between">

                  <span className="text-xs text-slate-500">
                    {detection.id}
                  </span>

                  <span
                    className={`rounded-full px-2 py-1 text-xs capitalize ${statusColor}`}
                  >
                    ● {detection.triage_status}
                  </span>

                </div>
              </button>
            );
          })
        )}

      </div>
    </div>
  );
}

export default DetectionList;