function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950">

      {/* Main Header */}
      <div className="flex flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10">
              <span className="text-lg text-cyan-400">
                ◈
              </span>
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-cyan-400">
                AquaScan-AI
              </h1>

              <p className="text-sm text-slate-400">
                Intelligent Marine Debris Detection & Monitoring
              </p>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="flex items-center gap-3 rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-4 py-3">

          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-40" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
          </span>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
              System Online
            </p>

            <p className="text-xs text-slate-500">
              AI detection engine active
            </p>
          </div>

        </div>

      </div>

      {/* Mission Bar */}
      <div className="grid grid-cols-1 border-t border-slate-800 bg-slate-900/40 sm:grid-cols-3">

        {/* Mission */}
        <div className="border-b border-slate-800 px-6 py-3 sm:border-b-0 sm:border-r">
          <p className="text-[10px] uppercase tracking-widest text-slate-500">
            Mission
          </p>

          <p className="mt-1 text-sm font-medium text-slate-200">
            VISAKHAPATNAM-01
          </p>
        </div>

        {/* Survey Area */}
        <div className="border-b border-slate-800 px-6 py-3 sm:border-b-0 sm:border-r">
          <p className="text-[10px] uppercase tracking-widest text-slate-500">
            Survey Area
          </p>

          <p className="mt-1 text-sm font-medium text-slate-200">
            Visakhapatnam Offshore
          </p>
        </div>

        {/* Scan Status */}
        <div className="px-6 py-3">
          <p className="text-[10px] uppercase tracking-widest text-slate-500">
            Scan Status
          </p>

          <div className="mt-1 flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

            <p className="text-sm font-medium text-cyan-400">
              SONAR ANALYSIS ACTIVE
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Header;