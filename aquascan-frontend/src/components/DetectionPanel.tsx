import type { Detection } from "../types/detection";

interface DetectionPanelProps {
  detection: Detection | null;
  onReview: () => void;
}

function DetectionPanel({
  detection,
  onReview,
}: DetectionPanelProps) {
  if (!detection) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-slate-500">
        Select a detection to view details
      </div>
    );
  }

  const statusColor =
    detection.triage_status === "confirmed"
      ? "bg-emerald-400/10 text-emerald-400"
      : detection.triage_status === "rejected"
      ? "bg-red-400/10 text-red-400"
      : "bg-yellow-400/10 text-yellow-400";

  return (
    <div className="h-full overflow-y-auto">

      {/* Header */}
      <div className="border-b border-slate-800 px-5 py-4">
        <p className="text-xs uppercase tracking-wider text-cyan-400">
          Detection Details
        </p>

        <h2 className="mt-1 text-lg font-semibold capitalize text-slate-100">
          {detection.class_name.replaceAll("_", " ")}
        </h2>

        <p className="text-xs text-slate-500">
          {detection.id}
        </p>
      </div>

      <div className="space-y-5 p-5">

        {/* Confidence */}
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">
            AI Confidence
          </p>

          <div className="mt-2 flex items-end gap-2">
            <span className="text-4xl font-bold text-cyan-400">
              {(detection.confidence * 100).toFixed(0)}%
            </span>

            <span className="pb-1 text-xs text-slate-500">
              model confidence
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-cyan-400"
              style={{
                width: `${detection.confidence * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Location */}
        <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Location
          </p>

          <p className="mt-2 text-sm text-slate-200">
            {detection.lat.toFixed(4)}° N
          </p>

          <p className="text-sm text-slate-200">
            {detection.lon.toFixed(4)}° E
          </p>
        </div>

        {/* Source Image */}
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Source Image
          </p>

          <p className="mt-2 text-sm text-slate-300">
            {detection.source_image}
          </p>
        </div>

        {/* Triage Status */}
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Triage Status
          </p>

          <span
            className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm capitalize ${statusColor}`}
          >
            ● {detection.triage_status}
          </span>
        </div>

        {/* Review Button */}
        {detection.triage_status === "pending" && (
          <button
            onClick={onReview}
            className="w-full rounded-lg bg-cyan-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            Review Detection
          </button>
        )}

      </div>
    </div>
  );
}

export default DetectionPanel;