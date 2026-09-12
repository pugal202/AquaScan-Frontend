import type { Detection } from "../types/detection";

interface MissionOverviewProps {
  detections: Detection[];
}

function MissionOverview({
  detections,
}: MissionOverviewProps) {
  const classStats = [
    {
      name: "Ghost Net",
      classId: 3,
      color: "text-yellow-400",
      dot: "bg-yellow-400",
    },
    {
      name: "Pipe / Cable",
      classId: 0,
      color: "text-red-400",
      dot: "bg-red-400",
    },
    {
      name: "Cylinder / Mine",
      classId: 1,
      color: "text-orange-400",
      dot: "bg-orange-400",
    },
    {
      name: "Shipwreck / Structure",
      classId: 2,
      color: "text-red-400",
      dot: "bg-red-400",
    },
  ];

  const statusStats = [
    {
      name: "Confirmed",
      value: detections.filter(
        (d) => d.triage_status === "confirmed"
      ).length,
      color: "text-emerald-400",
      dot: "bg-emerald-400",
    },
    {
      name: "Pending",
      value: detections.filter(
        (d) => d.triage_status === "pending"
      ).length,
      color: "text-yellow-400",
      dot: "bg-yellow-400",
    },
    {
      name: "Rejected",
      value: detections.filter(
        (d) => d.triage_status === "rejected"
      ).length,
      color: "text-red-400",
      dot: "bg-red-400",
    },
  ];

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-cyan-400">
            Mission Overview
          </p>

          <h2 className="mt-1 text-lg font-semibold text-slate-100">
            Detection Intelligence
          </h2>
        </div>

        <div className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1">
          <span className="text-xs text-cyan-400">
            {detections.length} total targets
          </span>
        </div>
      </div>

      {/* Class Statistics */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

        {classStats.map((stat) => {
          const matchingDetections = detections.filter(
            (detection) =>
              detection.class_id === stat.classId
          );

          const averageConfidence =
            matchingDetections.length > 0
              ? matchingDetections.reduce(
                  (sum, detection) =>
                    sum + detection.confidence,
                  0
                ) / matchingDetections.length
              : 0;

          return (
            <div
              key={stat.name}
              className="rounded-lg border border-slate-800 bg-slate-950 p-4"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${stat.dot}`}
                />

                <p className="text-sm text-slate-400">
                  {stat.name}
                </p>
              </div>

              <div className="mt-3 flex items-end justify-between">
                <p className={`text-2xl font-bold ${stat.color}`}>
                  {matchingDetections.length}
                </p>

                <p className="text-xs text-slate-500">
                  {matchingDetections.length > 0
                    ? `${(
                        averageConfidence * 100
                      ).toFixed(0)}% avg`
                    : "No detections"}
                </p>
              </div>
            </div>
          );
        })}

      </div>

      {/* Triage Status */}
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">

        {statusStats.map((stat) => (
          <div
            key={stat.name}
            className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-4 py-3"
          >
            <div className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full ${stat.dot}`}
              />

              <span className="text-sm text-slate-400">
                {stat.name}
              </span>
            </div>

            <span
              className={`text-lg font-semibold ${stat.color}`}
            >
              {stat.value}
            </span>
          </div>
        ))}

      </div>

    </section>
  );
}

export default MissionOverview;