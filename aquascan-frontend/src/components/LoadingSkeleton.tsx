function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">

      {/* Page Header */}
      <div>
        <div className="h-8 w-56 rounded-lg bg-slate-800" />
        <div className="mt-3 h-4 w-80 max-w-full rounded bg-slate-800" />
      </div>

      {/* Main Result Skeleton */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* Image Skeleton */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="h-5 w-32 rounded bg-slate-800" />
              <div className="mt-2 h-3 w-48 rounded bg-slate-800" />
            </div>

            <div className="h-6 w-24 rounded-full bg-slate-800" />
          </div>

          <div className="flex min-h-[320px] items-center justify-center rounded-xl bg-slate-950">
            <div className="h-16 w-16 rounded-full bg-slate-800" />
          </div>

        </div>

        {/* Information Skeleton */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <div className="h-5 w-44 rounded bg-slate-800" />

          <div className="mt-2 h-3 w-64 rounded bg-slate-800" />

          {/* Object */}
          <div className="mt-6 rounded-xl bg-slate-950 p-4">
            <div className="h-3 w-28 rounded bg-slate-800" />
            <div className="mt-3 h-6 w-48 rounded bg-slate-800" />
          </div>

          {/* Confidence */}
          <div className="mt-4 rounded-xl bg-slate-950 p-4">
            <div className="flex justify-between">
              <div className="h-3 w-32 rounded bg-slate-800" />
              <div className="h-6 w-16 rounded bg-slate-800" />
            </div>

            <div className="mt-4 h-2 rounded-full bg-slate-800" />
          </div>

          {/* Status */}
          <div className="mt-4 rounded-xl bg-slate-950 p-4">
            <div className="h-3 w-24 rounded bg-slate-800" />
            <div className="mt-3 h-7 w-28 rounded-full bg-slate-800" />
          </div>

          {/* Buttons */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="h-12 rounded-xl bg-slate-800" />
            <div className="h-12 rounded-xl bg-slate-800" />
          </div>

        </div>

      </div>

      {/* Map Skeleton */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

        <div className="mb-4">
          <div className="h-5 w-36 rounded bg-slate-800" />
          <div className="mt-2 h-3 w-72 max-w-full rounded bg-slate-800" />
        </div>

        <div className="h-[350px] rounded-xl bg-slate-800" />

      </div>

    </div>
  );
}

export default LoadingSkeleton;