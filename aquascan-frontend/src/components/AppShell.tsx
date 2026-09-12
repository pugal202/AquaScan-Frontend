import { NavLink, Outlet, useLocation } from "react-router-dom";

function AppShell() {
  const location = useLocation();

  const navItems = [
    {
      path: "/",
      label: "Dashboard",
      icon: "⌂",
    },
    {
      path: "/upload",
      label: "Upload",
      icon: "↑",
    },
    {
      path: "/results/1",
      label: "Results",
      icon: "◈",
    },
    {
      path: "/history",
      label: "History",
      icon: "◷",
    },
    {
      path: "/profile",
      label: "Profile",
      icon: "○",
    },
  ];

  // Results page can be /results/1, /results/2, etc.
  const isResultsPage = location.pathname.startsWith("/results/");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 lg:flex">

        {/* LOGO */}
        <div className="border-b border-slate-800 px-6 py-6">

          <h1 className="text-xl font-bold tracking-tight">
            AquaScan
            <span className="text-cyan-400">-AI</span>
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            Underwater debris intelligence
          </p>

        </div>


        {/* NAVIGATION */}
        <nav className="flex-1 space-y-2 p-4">

          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
            Navigation
          </p>

          {navItems.map((item) => {

            const active =
              item.label === "Results"
                ? isResultsPage
                : location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={() =>
                  `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-cyan-400/10 text-cyan-400"
                      : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  }`
                }
              >

                {/* ICON */}
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-sm ${
                    active
                      ? "bg-cyan-400/10 text-cyan-400"
                      : "bg-slate-900 text-slate-400"
                  }`}
                >
                  {item.icon}
                </span>

                {item.label}

              </NavLink>
            );
          })}

        </nav>


        {/* SYSTEM STATUS */}
        <div className="border-t border-slate-800 p-4">

          <div className="rounded-lg border border-emerald-400/10 bg-emerald-400/5 p-3">

            <div className="flex items-center gap-2">

              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="text-xs font-medium text-emerald-400">
                SYSTEM ONLINE
              </span>

            </div>

            <p className="mt-1 text-[11px] text-slate-500">
              AquaScan AI monitoring active
            </p>

          </div>

        </div>

      </aside>


      {/* =====================================================
          MOBILE HEADER
      ====================================================== */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur lg:hidden">

        {/* TOP HEADER */}
        <div className="flex items-center justify-between px-4 py-4">

          {/* LOGO */}
          <div>

            <h1 className="text-lg font-bold tracking-tight">
              AquaScan
              <span className="text-cyan-400">-AI</span>
            </h1>

            <p className="text-[10px] text-slate-500">
              Underwater debris intelligence
            </p>

          </div>


          {/* ONLINE STATUS */}
          <div className="flex items-center gap-2">

            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

            <span className="text-[10px] font-medium text-emerald-400">
              ONLINE
            </span>

          </div>

        </div>


        {/* MOBILE NAVIGATION */}
        <nav className="flex overflow-x-auto border-t border-slate-800 px-2 py-2">

          {navItems.map((item) => {

            const active =
              item.label === "Results"
                ? isResultsPage
                : location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={() =>
                  `flex min-w-fit items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium transition ${
                    active
                      ? "bg-cyan-400/10 text-cyan-400"
                      : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                  }`
                }
              >

                <span className="text-sm">
                  {item.icon}
                </span>

                {item.label}

              </NavLink>
            );
          })}

        </nav>

      </header>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <main className="min-h-screen lg:ml-64">

        <div className="p-4 sm:p-6 lg:p-8">

          <Outlet />

        </div>

      </main>

    </div>
  );
}

export default AppShell;