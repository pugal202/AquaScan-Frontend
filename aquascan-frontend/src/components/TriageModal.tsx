import type { Detection } from "../types/detection";

interface TriageModalProps {
  detection: Detection;
  onConfirm: () => void;
  onReject: () => void;
  onClose: () => void;
}

function TriageModal({
  detection,
  onConfirm,
  onReject,
  onClose,
}: TriageModalProps) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">

        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-cyan-400">
              Human Verification
            </p>

            <h2 className="mt-2 text-xl font-semibold capitalize text-slate-100">
              {detection.class_name.replaceAll("_", " ")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {detection.id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-xl text-slate-500 hover:text-slate-200"
          >
            ×
          </button>
        </div>

        <div className="mt-6 rounded-lg border border-slate-800 bg-slate-950 p-4">
          <div className="flex justify-between">
            <span className="text-sm text-slate-400">
              AI Confidence
            </span>

            <span className="font-semibold text-cyan-400">
              {(detection.confidence * 100).toFixed(0)}%
            </span>
          </div>

          <div className="mt-3 flex justify-between">
            <span className="text-sm text-slate-400">
              Current Status
            </span>

            <span className="capitalize text-yellow-400">
              {detection.triage_status}
            </span>
          </div>
        </div>

        <p className="mt-5 text-sm text-slate-400">
          Review this AI detection and select the appropriate action.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={onReject}
            className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 font-medium text-red-400 transition hover:bg-red-500/20"
          >
            ✕ Reject
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-emerald-500 px-4 py-3 font-medium text-slate-950 transition hover:bg-emerald-400"
          >
            ✓ Confirm
          </button>
        </div>

      </div>
    </div>
  );
}

export default TriageModal;