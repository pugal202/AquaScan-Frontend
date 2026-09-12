import type { Detection } from "../types/detection";

interface StatsPanelProps {
  detections: Detection[];
}

function StatsPanel({ detections }: StatsPanelProps) {
  const totalDetections = detections.length;

  const ghostNets = detections.filter(
    (detection) => detection.class_id === 3
  ).length;

  const highConfidence = detections.filter(
    (detection) => detection.confidence >= 0.85
  ).length;

  const pendingReview = detections.filter(
    (detection) => detection.triage_status === "pending"
  ).length;

  const stats = [
    {
      label: "Total Detections",
      value: totalDetections,
    },
    {
      label: "Ghost Nets",
      value: ghostNets,
    },
    {
      label: "High Confidence",
      value: highConfidence,
    },
    {
      label: "Pending Review",
      value: pendingReview,
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl border border-slate-800 bg-slate-900/70 p-5"
        >
          <p className="text-sm text-slate-400">
            {stat.label}
          </p>

          <p className="mt-2 text-3xl font-bold text-slate-100">
            {stat.value}
          </p>
        </div>
      ))}
    </section>
  );
}

export default StatsPanel;