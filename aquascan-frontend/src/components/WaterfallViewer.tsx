import type { Detection } from "../types/detection";

interface WaterfallViewerProps {
  detection: Detection | null;
}

function WaterfallViewer({ detection }: WaterfallViewerProps) {
  if (!detection) {
    return (
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-slate-500">
          Select a detection to view sonar evidence.
        </p>
      </section>
    );
  }

  // Mock sonar image dimensions
  const imageWidth = 512;
  const imageHeight = 384;

  const [x1, y1, x2, y2] = detection.bbox;

  const left = (x1 / imageWidth) * 100;
  const top = (y1 / imageHeight) * 100;
  const width = ((x2 - x1) / imageWidth) * 100;
  const height = ((y2 - y1) / imageHeight) * 100;

  const detectionColor =
    detection.class_id === 3
      ? "border-yellow-400 bg-yellow-400/10 text-yellow-400"
      : detection.class_id === 1
      ? "border-orange-400 bg-orange-400/10 text-orange-400"
      : "border-red-400 bg-red-400/10 text-red-400";

  return (
    <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-cyan-400">
            Sonar Evidence
          </p>

          <h2 className="mt-1 font-semibold capitalize text-slate-100">
            {detection.class_name.replaceAll("_", " ")}
          </h2>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-500">
            Detection
          </p>

          <p className="text-sm font-medium text-slate-300">
            {detection.id}
          </p>
        </div>
      </div>

      {/* Sonar Viewer */}
      <div className="p-5">
        <div
          className="relative h-[420px] overflow-hidden rounded-lg border border-slate-700"
          style={{
            backgroundColor: "#07111f",
            backgroundImage: `
              linear-gradient(
                rgba(34, 211, 238, 0.08) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(34, 211, 238, 0.08) 1px,
                transparent 1px
              ),
              radial-gradient(
                ellipse at center,
                rgba(100, 116, 139, 0.45),
                rgba(2, 6, 23, 0.95) 70%
              )
            `,
            backgroundSize: "40px 40px, 40px 40px, 100% 100%",
          }}
        >

          {/* Sonar grid */}
          <div className="absolute inset-x-0 top-1/4 border-t border-cyan-400/10" />
          <div className="absolute inset-x-0 top-1/2 border-t border-cyan-400/10" />
          <div className="absolute inset-x-0 top-3/4 border-t border-cyan-400/10" />

          {/* AI Bounding Box */}
          <div
            className={`absolute rounded-sm border-2 ${detectionColor}`}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${width}%`,
              height: `${height}%`,
            }}
          >
            <div className="absolute -top-7 left-0 rounded bg-slate-950 px-2 py-1 text-xs font-semibold capitalize">
              {detection.class_name.replaceAll("_", " ")}
            </div>

            {/* Detection center */}
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current shadow-[0_0_20px_currentColor]" />
          </div>

          {/* Viewer labels */}
          <span className="absolute left-3 top-3 text-xs text-slate-500">
            RANGE 0m
          </span>

          <span className="absolute bottom-3 left-3 text-xs text-slate-500">
            SONAR WATERFALL
          </span>

          <span className="absolute right-3 top-3 text-xs text-emerald-400">
            ● LIVE ANALYSIS
          </span>

        </div>

        {/* Detection Information */}
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
            <p className="text-xs text-slate-500">
              Class
            </p>

            <p className="mt-1 text-sm capitalize text-slate-200">
              {detection.class_name.replaceAll("_", " ")}
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
            <p className="text-xs text-slate-500">
              Confidence
            </p>

            <p className="mt-1 text-sm font-semibold text-cyan-400">
              {(detection.confidence * 100).toFixed(0)}%
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
            <p className="text-xs text-slate-500">
              Source
            </p>

            <p className="mt-1 truncate text-sm text-slate-200">
              {detection.source_image}
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
            <p className="text-xs text-slate-500">
              Status
            </p>

            <p
              className={`mt-1 text-sm capitalize ${
                detection.triage_status === "confirmed"
                  ? "text-emerald-400"
                  : detection.triage_status === "rejected"
                  ? "text-red-400"
                  : "text-yellow-400"
              }`}
            >
              ● {detection.triage_status}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default WaterfallViewer;