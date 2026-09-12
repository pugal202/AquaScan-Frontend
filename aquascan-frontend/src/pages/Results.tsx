import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

type ReviewStatus = "Pending Review" | "Approved" | "Rejected";

interface AnalysisResult {
  id: string;
  objectType: string;
  confidence: number;
  status: ReviewStatus;
  location: [number, number];
  image: string | null;
  fileName: string;
  date: string;
}

function Results() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // =========================
  // LOAD ANALYSIS
  // =========================
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const savedAnalysis = sessionStorage.getItem(
          "aquascan-analysis"
        );

        if (savedAnalysis) {
          const parsed = JSON.parse(savedAnalysis);

          setResult({
            id: id || parsed.id || "001",
            objectType: parsed.objectType || "Pipe / Cable",
            confidence:
              typeof parsed.confidence === "number"
                ? parsed.confidence
                : 94.6,
            status: parsed.status || "Pending Review",
            location:
              Array.isArray(parsed.location) &&
              parsed.location.length === 2
                ? parsed.location
                : [13.0827, 80.2707],
            image: parsed.image || null,
            fileName:
              parsed.fileName || "sonar_image",
            date:
              parsed.date ||
              new Date().toLocaleString(),
          });
        } else {
          // Fallback demo result
          setResult({
            id: id || "001",
            objectType: "Pipe / Cable",
            confidence: 94.6,
            status: "Pending Review",
            location: [13.0827, 80.2707],
            image: null,
            fileName: "Demo Sonar Image",
            date: new Date().toLocaleString(),
          });
        }
      } catch (error) {
        console.error(
          "Unable to load analysis:",
          error
        );

        setResult({
          id: id || "001",
          objectType: "Pipe / Cable",
          confidence: 94.6,
          status: "Pending Review",
          location: [13.0827, 80.2707],
          image: null,
          fileName: "Demo Sonar Image",
          date: new Date().toLocaleString(),
        });
      }

      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [id]);

  // =========================
  // UPDATE REVIEW STATUS
  // =========================
  const updateStatus = (
    newStatus: "Approved" | "Rejected"
  ) => {
    if (!result) return;

    const updatedResult = {
      ...result,
      status: newStatus,
    };

    setResult(updatedResult);

    // Save updated result
    sessionStorage.setItem(
      "aquascan-analysis",
      JSON.stringify(updatedResult)
    );

    // Save status separately for History
    sessionStorage.setItem(
      `aquascan-status-${result.id}`,
      newStatus
    );
  };

  // =========================
  // LOADING SKELETON
  // =========================
  if (loading || !result) {
    return (
      <div className="animate-pulse space-y-6">

        {/* HEADER */}
        <div>
          <div className="h-8 w-56 rounded-lg bg-slate-800 sm:h-9 sm:w-64" />

          <div className="mt-3 h-4 w-full max-w-md rounded bg-slate-800" />
        </div>

        {/* MAIN AREA */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

          {/* IMAGE */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

            <div className="mb-4 flex items-center justify-between">

              <div>
                <div className="h-5 w-32 rounded bg-slate-800" />

                <div className="mt-2 h-4 w-48 rounded bg-slate-800" />
              </div>

              <div className="h-6 w-24 rounded-full bg-slate-800" />

            </div>

            <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-slate-800 bg-slate-950 sm:min-h-[320px]">

              <div className="w-full px-6 text-center">

                <div className="mx-auto h-16 w-16 rounded-full bg-slate-800" />

                <div className="mx-auto mt-4 h-5 w-52 max-w-full rounded bg-slate-800" />

                <div className="mx-auto mt-3 h-4 w-72 max-w-full rounded bg-slate-800" />

              </div>

            </div>

          </div>

          {/* INFORMATION */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

            <div className="h-5 w-48 rounded bg-slate-800" />

            <div className="mt-2 h-4 w-full max-w-xs rounded bg-slate-800" />

            <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="h-4 w-28 rounded bg-slate-800" />
              <div className="mt-3 h-6 w-44 rounded bg-slate-800" />
            </div>

            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="flex justify-between">
                <div className="h-4 w-32 rounded bg-slate-800" />
                <div className="h-6 w-16 rounded bg-slate-800" />
              </div>

              <div className="mt-4 h-2 rounded-full bg-slate-800" />
            </div>

            <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4">
              <div className="h-4 w-24 rounded bg-slate-800" />
              <div className="mt-3 h-7 w-32 rounded-full bg-slate-800" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="h-12 rounded-xl bg-slate-800" />
              <div className="h-12 rounded-xl bg-slate-800" />
            </div>

          </div>

        </div>

        {/* MAP */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <div className="mb-4">
            <div className="h-5 w-40 rounded bg-slate-800" />

            <div className="mt-2 h-4 w-full max-w-sm rounded bg-slate-800" />
          </div>

          <div className="h-[280px] rounded-xl bg-slate-800 sm:h-[350px]" />

        </div>

      </div>
    );
  }

  // =========================
  // STATUS STYLE
  // =========================
  const getStatusStyle = () => {
    if (result.status === "Approved") {
      return "bg-emerald-500/10 text-emerald-400 border-emerald-400/20";
    }

    if (result.status === "Rejected") {
      return "bg-red-500/10 text-red-400 border-red-400/20";
    }

    return "bg-yellow-500/10 text-yellow-400 border-yellow-400/20";
  };

  // =========================
  // RESULTS PAGE
  // =========================
  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>

        <h1 className="text-3xl font-bold text-slate-100">
          Analysis Results
        </h1>

        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Review the detected underwater debris and analysis information.
        </p>

      </div>

      {/* RESULT GRID */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* =========================
            SONAR IMAGE
        ========================== */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5">

          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h2 className="text-lg font-semibold text-slate-100">
                Sonar Image
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {result.fileName}
              </p>

            </div>

            <span className="w-fit rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400">
              Analysis #{result.id}
            </span>

          </div>

          {/* IMAGE */}
          {result.image ? (
            <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-slate-700 bg-slate-950 p-3 sm:min-h-[320px]">

              <img
                src={result.image}
                alt="Uploaded sonar analysis"
                className="max-h-[500px] w-full rounded-lg object-contain"
              />

            </div>
          ) : (
            <div className="flex min-h-[280px] items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950 sm:min-h-[320px]">

              <div className="px-6 text-center">

                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 text-3xl">
                  🌊
                </div>

                <h3 className="text-base font-semibold text-slate-200 sm:text-lg">
                  Sonar image preview
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  No uploaded image is available for this analysis.
                </p>

                <p className="mt-3 text-xs text-cyan-500">
                  DEMO PREVIEW
                </p>

              </div>

            </div>
          )}

        </div>

        {/* =========================
            ANALYSIS INFORMATION
        ========================== */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5">

          <h2 className="text-lg font-semibold text-slate-100">
            Detection Information
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            AI-generated analysis of the uploaded sonar image.
          </p>

          {/* OBJECT TYPE */}
          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4">

            <p className="text-sm text-slate-500">
              Detected Object
            </p>

            <p className="mt-1 text-xl font-semibold text-slate-100">
              {result.objectType}
            </p>

          </div>

          {/* CONFIDENCE */}
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4">

            <div className="flex items-center justify-between gap-4">

              <p className="text-sm text-slate-500">
                Confidence Score
              </p>

              <p className="text-xl font-bold text-cyan-400">
                {result.confidence}%
              </p>

            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">

              <div
                className="h-full rounded-full bg-cyan-500 transition-all duration-700"
                style={{
                  width: `${result.confidence}%`,
                }}
              />

            </div>

          </div>

          {/* STATUS */}
          <div className="mt-4 rounded-xl border border-slate-800 bg-slate-950 p-4">

            <p className="text-sm text-slate-500">
              Review Status
            </p>

            <span
              className={`mt-2 inline-flex rounded-full border px-3 py-1 text-sm font-medium ${getStatusStyle()}`}
            >
              {result.status}
            </span>

          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">

            <button
              type="button"
              onClick={() => updateStatus("Approved")}
              disabled={result.status === "Approved"}
              className={`rounded-xl px-4 py-3 font-semibold transition active:scale-[0.98] ${
                result.status === "Approved"
                  ? "cursor-not-allowed bg-emerald-500/30 text-emerald-300"
                  : "bg-emerald-500 text-slate-950 hover:bg-emerald-400"
              }`}
            >
              ✓ {result.status === "Approved" ? "Approved" : "Approve"}
            </button>

            <button
              type="button"
              onClick={() => updateStatus("Rejected")}
              disabled={result.status === "Rejected"}
              className={`rounded-xl px-4 py-3 font-semibold transition active:scale-[0.98] ${
                result.status === "Rejected"
                  ? "cursor-not-allowed border border-red-500/20 bg-red-500/20 text-red-300"
                  : "border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20"
              }`}
            >
              ✕ {result.status === "Rejected" ? "Rejected" : "Reject"}
            </button>

          </div>

          {/* LAST UPDATED */}
          <p className="mt-4 text-xs text-slate-600">
            Analysis uploaded: {result.date}
          </p>

        </div>

      </div>

      {/* =========================
          MAP
      ========================== */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-5">

        <div className="mb-4">

          <h2 className="text-lg font-semibold text-slate-100">
            Debris Location
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Approximate location associated with this analysis.
          </p>

        </div>

        <div className="h-[280px] overflow-hidden rounded-xl sm:h-[350px]">

          <MapContainer
            center={result.location}
            zoom={12}
            scrollWheelZoom={false}
            className="h-full w-full"
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={result.location}>

              <Popup>
                <div className="text-sm">
                  <strong>Detected debris</strong>
                  <br />
                  {result.objectType}
                  <br />
                  Confidence: {result.confidence}%
                </div>
              </Popup>

            </Marker>

          </MapContainer>

        </div>

      </div>

    </div>
  );
}

export default Results;