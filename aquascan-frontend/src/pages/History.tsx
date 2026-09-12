import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Analysis {
  id: string;
  objectType: string;
  confidence: number;
  status: "Approved" | "Pending Review" | "Rejected";
  location: string;
  date: string;
  time: string;
}

function History() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Demo history data
  // Later this will come from your backend/API
  const analyses: Analysis[] = [
    {
      id: "001",
      objectType: "Pipe / Cable",
      confidence: 94.6,
      status: "Pending Review",
      location: "Visakhapatnam Offshore",
      date: "12 Sep 2026",
      time: "10:42 AM",
    },
    {
      id: "002",
      objectType: "Ghost Net",
      confidence: 91.8,
      status: "Approved",
      location: "Chennai Coast",
      date: "11 Sep 2026",
      time: "03:18 PM",
    },
    {
      id: "003",
      objectType: "Cylinder / Drum / Mine",
      confidence: 88.4,
      status: "Approved",
      location: "Kochi Offshore",
      date: "10 Sep 2026",
      time: "11:25 AM",
    },
    {
      id: "004",
      objectType: "Shipwreck / Structure",
      confidence: 96.2,
      status: "Pending Review",
      location: "Mumbai Offshore",
      date: "09 Sep 2026",
      time: "05:47 PM",
    },
    {
      id: "005",
      objectType: "Ghost Net",
      confidence: 79.6,
      status: "Rejected",
      location: "Visakhapatnam Offshore",
      date: "08 Sep 2026",
      time: "09:32 AM",
    },
    {
      id: "006",
      objectType: "Pipe / Cable",
      confidence: 93.1,
      status: "Approved",
      location: "Goa Coast",
      date: "07 Sep 2026",
      time: "02:14 PM",
    },
  ];

  // Filter + search
  const filteredAnalyses = analyses.filter((analysis) => {
    const matchesFilter =
      filter === "All" || analysis.status === filter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      analysis.id.toLowerCase().includes(searchText) ||
      analysis.objectType.toLowerCase().includes(searchText) ||
      analysis.location.toLowerCase().includes(searchText);

    return matchesFilter && matchesSearch;
  });

  const getStatusStyle = (status: Analysis["status"]) => {
    if (status === "Approved") {
      return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    }

    if (status === "Rejected") {
      return "bg-red-500/10 text-red-400 border border-red-500/20";
    }

    return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
  };

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
            AQUASCAN AI
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            Analysis History
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
            View and manage previous underwater debris detection analyses.
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


      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5">
          <p className="text-sm text-slate-500">
            Total Analyses
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-100">
            126
          </p>

          <p className="mt-1 text-xs text-cyan-400">
            All recorded analyses
          </p>
        </div>


        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5">
          <p className="text-sm text-slate-500">
            Approved
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-400">
            89
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Verified detections
          </p>
        </div>


        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5">
          <p className="text-sm text-slate-500">
            Pending Review
          </p>

          <p className="mt-2 text-2xl font-bold text-yellow-400">
            14
          </p>

          <p className="mt-1 text-xs text-yellow-400">
            Requires attention
          </p>
        </div>


        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5">
          <p className="text-sm text-slate-500">
            Avg. Confidence
          </p>

          <p className="mt-2 text-2xl font-bold text-cyan-400">
            92.4%
          </p>

          <p className="mt-1 text-xs text-emerald-400">
            High detection accuracy
          </p>
        </div>

      </div>


      {/* HISTORY PANEL */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5">

        {/* PANEL HEADER */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h2 className="text-lg font-semibold text-slate-100">
              Previous Analyses
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Browse detected underwater objects and their review status.
            </p>
          </div>


          {/* SEARCH */}
          <div className="w-full lg:max-w-sm">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search object or location..."
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

        </div>


        {/* FILTERS */}
        <div className="mt-5 flex gap-2 overflow-x-auto pb-1">

          {["All", "Approved", "Pending Review", "Rejected"].map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`whitespace-nowrap rounded-lg px-4 py-2 text-xs font-medium transition ${
                  filter === item
                    ? "bg-cyan-400/10 text-cyan-400"
                    : "bg-slate-950 text-slate-500 hover:text-slate-300"
                }`}
              >
                {item}
              </button>
            )
          )}

        </div>


        {/* DESKTOP TABLE */}
        <div className="mt-5 hidden overflow-x-auto rounded-xl border border-slate-800 md:block">

          <table className="w-full min-w-[850px] text-left">

            <thead className="border-b border-slate-800 bg-slate-950">
              <tr>
                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Analysis
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Detected Object
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Confidence
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Location
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Status
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Date
                </th>

                <th className="px-4 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Action
                </th>
              </tr>
            </thead>


            <tbody className="divide-y divide-slate-800">

              {filteredAnalyses.map((analysis) => (
                <tr
                  key={analysis.id}
                  className="transition hover:bg-slate-950/70"
                >

                  <td className="px-4 py-4">
                    <span className="font-semibold text-cyan-400">
                      #{analysis.id}
                    </span>
                  </td>


                  <td className="px-4 py-4">
                    <span className="font-medium text-slate-200">
                      {analysis.objectType}
                    </span>
                  </td>


                  <td className="px-4 py-4">
                    <span className="font-semibold text-slate-200">
                      {analysis.confidence}%
                    </span>
                  </td>


                  <td className="px-4 py-4">
                    <p className="text-sm text-slate-300">
                      {analysis.location}
                    </p>
                  </td>


                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(
                        analysis.status
                      )}`}
                    >
                      {analysis.status}
                    </span>
                  </td>


                  <td className="px-4 py-4">
                    <p className="text-sm text-slate-300">
                      {analysis.date}
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      {analysis.time}
                    </p>
                  </td>


                  <td className="px-4 py-4">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/results/${analysis.id}`)
                      }
                      className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-400"
                    >
                      View
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>


        {/* MOBILE CARDS */}
        <div className="mt-5 space-y-3 md:hidden">

          {filteredAnalyses.map((analysis) => (
            <div
              key={analysis.id}
              className="rounded-xl border border-slate-800 bg-slate-950 p-4"
            >

              <div className="flex items-start justify-between gap-3">

                <div>
                  <p className="text-xs font-semibold text-cyan-400">
                    ANALYSIS #{analysis.id}
                  </p>

                  <h3 className="mt-1 text-base font-semibold text-slate-100">
                    {analysis.objectType}
                  </h3>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium ${getStatusStyle(
                    analysis.status
                  )}`}
                >
                  {analysis.status}
                </span>

              </div>


              <div className="mt-4 grid grid-cols-2 gap-3">

                <div>
                  <p className="text-[11px] text-slate-600">
                    Confidence
                  </p>

                  <p className="mt-1 text-sm font-semibold text-cyan-400">
                    {analysis.confidence}%
                  </p>
                </div>


                <div>
                  <p className="text-[11px] text-slate-600">
                    Date
                  </p>

                  <p className="mt-1 text-sm text-slate-300">
                    {analysis.date}
                  </p>
                </div>

              </div>


              <div className="mt-3">

                <p className="text-[11px] text-slate-600">
                  Location
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  {analysis.location}
                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  navigate(`/results/${analysis.id}`)
                }
                className="mt-4 w-full rounded-lg border border-slate-700 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-400"
              >
                View Analysis →
              </button>

            </div>
          ))}

        </div>


        {/* EMPTY STATE */}
        {filteredAnalyses.length === 0 && (
          <div className="mt-5 rounded-xl border border-dashed border-slate-800 bg-slate-950 p-10 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-xl text-slate-500">
              ◌
            </div>

            <h3 className="mt-4 font-semibold text-slate-300">
              No analyses found
            </h3>

            <p className="mt-1 text-sm text-slate-600">
              Try changing your search or filter.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default History;