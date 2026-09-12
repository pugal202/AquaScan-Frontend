import { useNavigate } from "react-router-dom";

const stats = [
  {
    label: "Total Analyses",
    value: "128",
    change: "+12 this month",
    icon: "◈",
  },
  {
    label: "Objects Detected",
    value: "96",
    change: "Across all scans",
    icon: "⌁",
  },
  {
    label: "Pending Reviews",
    value: "14",
    change: "Requires attention",
    icon: "!",
  },
  {
    label: "Avg. Confidence",
    value: "92.4%",
    change: "AI detection accuracy",
    icon: "✓",
  },
];

const recentAnalyses = [
  {
    id: "001",
    object: "Pipe / Cable",
    location: "Visakhapatnam Offshore",
    confidence: "94.6%",
    status: "Pending",
    time: "Today, 10:42 AM",
  },
  {
    id: "002",
    object: "Ghost Net",
    location: "Visakhapatnam Offshore",
    confidence: "91.3%",
    status: "Approved",
    time: "Yesterday, 04:18 PM",
  },
  {
    id: "003",
    object: "Cylinder / Drum / Mine",
    location: "Chennai Offshore",
    confidence: "87.8%",
    status: "Rejected",
    time: "09 Sep 2026, 01:32 PM",
  },
  {
    id: "004",
    object: "Shipwreck / Structure",
    location: "Visakhapatnam Offshore",
    confidence: "96.1%",
    status: "Approved",
    time: "08 Sep 2026, 11:06 AM",
  },
];

function Home() {
  const navigate = useNavigate();

  const getStatusStyle = (status: string) => {
    if (status === "Approved") {
      return "border-emerald-400/20 bg-emerald-400/10 text-emerald-400";
    }

    if (status === "Rejected") {
      return "border-red-400/20 bg-red-400/10 text-red-400";
    }

    return "border-yellow-400/20 bg-yellow-400/10 text-yellow-400";
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <p className="text-sm font-medium text-cyan-400">
              UNDERWATER DEBRIS INTELLIGENCE
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
              AquaScan<span className="text-cyan-400">-AI</span>
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Detect, classify, and review underwater debris using
              AI-powered sonar image analysis.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/upload")}
            className="w-full rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
          >
            + New Analysis
          </button>

        </div>
      </section>


      {/* STAT CARDS */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:border-cyan-400/20"
          >

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm text-slate-500">
                  {stat.label}
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-100">
                  {stat.value}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-lg font-bold text-cyan-400">
                {stat.icon}
              </div>

            </div>

            <p className="mt-3 text-xs text-slate-500">
              {stat.change}
            </p>

          </div>
        ))}

      </section>


      {/* MAIN DASHBOARD GRID */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* RECENT ANALYSES */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 xl:col-span-2">

          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-lg font-semibold text-slate-100">
                Recent Analyses
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Latest underwater debris detections.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/history")}
              className="self-start text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
            >
              View History →
            </button>

          </div>


          <div className="space-y-3">

            {recentAnalyses.map((analysis) => (
              <button
                key={analysis.id}
                type="button"
                onClick={() => navigate(`/results/${analysis.id}`)}
                className="group w-full rounded-xl border border-slate-800 bg-slate-950 p-4 text-left transition hover:border-cyan-400/30 hover:bg-slate-950/80"
              >

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex min-w-0 items-center gap-4">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                      ◈
                    </div>

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-2">

                        <p className="truncate text-sm font-semibold text-slate-200">
                          {analysis.object}
                        </p>

                        <span
                          className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${getStatusStyle(
                            analysis.status
                          )}`}
                        >
                          {analysis.status}
                        </span>

                      </div>

                      <p className="mt-1 truncate text-xs text-slate-500">
                        {analysis.location}
                      </p>

                    </div>

                  </div>


                  <div className="flex items-center justify-between gap-5 sm:justify-end">

                    <div className="sm:text-right">

                      <p className="text-xs text-slate-600">
                        Confidence
                      </p>

                      <p className="mt-1 text-sm font-bold text-cyan-400">
                        {analysis.confidence}
                      </p>

                    </div>

                    <div className="hidden text-right sm:block">

                      <p className="text-xs text-slate-600">
                        Date
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {analysis.time}
                      </p>

                    </div>

                    <span className="text-slate-600 transition group-hover:text-cyan-400">
                      →
                    </span>

                  </div>

                </div>

              </button>
            ))}

          </div>

        </div>


        {/* QUICK ACTIONS */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <h2 className="text-lg font-semibold text-slate-100">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your analysis workflow.
          </p>


          <div className="mt-5 space-y-3">

            <button
              type="button"
              onClick={() => navigate("/upload")}
              className="w-full rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4 text-left transition hover:border-cyan-400/40 hover:bg-cyan-400/10"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
                  ↑
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-200">
                    Upload Sonar Image
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Start a new AI analysis
                  </p>
                </div>

              </div>

            </button>


            <button
              type="button"
              onClick={() => navigate("/history")}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-4 text-left transition hover:border-slate-700 hover:bg-slate-950/70"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-slate-400">
                  ◷
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-200">
                    Analysis History
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Review previous detections
                  </p>
                </div>

              </div>

            </button>


            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 p-4 text-left transition hover:border-slate-700 hover:bg-slate-950/70"
            >

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-slate-400">
                  ○
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-200">
                    Profile & Security
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Manage your account
                  </p>
                </div>

              </div>

            </button>

          </div>

        </div>

      </section>


      {/* SYSTEM STATUS */}
      <section className="rounded-2xl border border-emerald-400/10 bg-emerald-400/5 p-5">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/10">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
            </div>

            <div>
              <p className="text-sm font-semibold text-emerald-400">
                AI Analysis System Online
              </p>

              <p className="mt-1 text-xs text-slate-500">
                AquaScan-AI monitoring and analysis services are active.
              </p>
            </div>

          </div>

          <span className="w-fit rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-400">
            SYSTEM ONLINE
          </span>

        </div>

      </section>

    </div>
  );
}

export default Home;