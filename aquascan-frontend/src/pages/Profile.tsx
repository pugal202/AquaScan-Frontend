import { useState } from "react";

function Profile() {
  const [name, setName] = useState("AquaScan Operator");
  const [email, setEmail] = useState("operator@aquascan.ai");
  const [organization, setOrganization] = useState(
    "Marine Monitoring Division"
  );

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">

      {/* PAGE HEADER */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400">
          AQUASCAN AI
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
          Profile
        </h1>

        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Manage your account information and AquaScan monitoring preferences.
        </p>
      </div>


      {/* PROFILE GRID */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* PROFILE CARD */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">

          <div className="flex flex-col items-center text-center">

            {/* AVATAR */}
            <div className="flex h-24 w-24 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/10 text-3xl font-bold text-cyan-400">
              AO
            </div>

            <h2 className="mt-4 text-xl font-semibold text-slate-100">
              {name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Marine Monitoring Operator
            </p>

            {/* STATUS */}
            <div className="mt-4 flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

              <span className="text-xs font-medium text-emerald-400">
                Account Active
              </span>
            </div>

          </div>


          {/* PROFILE STATS */}
          <div className="mt-6 grid grid-cols-2 gap-3">

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-center">
              <p className="text-2xl font-bold text-slate-100">
                126
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Analyses
              </p>
            </div>


            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-center">
              <p className="text-2xl font-bold text-cyan-400">
                92.4%
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Avg. Confidence
              </p>
            </div>

          </div>

        </div>


        {/* ACCOUNT INFORMATION */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6 xl:col-span-2">

          <div>
            <h2 className="text-lg font-semibold text-slate-100">
              Account Information
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Update the information associated with your AquaScan account.
            </p>
          </div>


          {/* FORM */}
          <div className="mt-6 space-y-5">

            {/* NAME */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />
            </div>


            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
              />
            </div>


            {/* ORGANIZATION */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Organization
              </label>

              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
              />
            </div>


            {/* ROLE */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Role
              </label>

              <div className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-400">
                Marine Monitoring Operator
              </div>
            </div>


            {/* SAVE */}
            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">

              <button
                type="button"
                onClick={handleSave}
                className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Save Changes
              </button>

              {saved && (
                <span className="text-sm font-medium text-emerald-400">
                  ✓ Changes saved successfully
                </span>
              )}

            </div>

          </div>

        </div>

      </div>


      {/* SYSTEM INFORMATION */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-lg font-semibold text-slate-100">
              System Information
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Current AquaScan platform status and configuration.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5">

            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

            <span className="text-xs font-medium text-emerald-400">
              SYSTEM ONLINE
            </span>

          </div>

        </div>


        {/* SYSTEM DETAILS */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs text-slate-600">
              Platform
            </p>

            <p className="mt-2 text-sm font-medium text-slate-200">
              AquaScan-AI
            </p>
          </div>


          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs text-slate-600">
              Detection Engine
            </p>

            <p className="mt-2 text-sm font-medium text-slate-200">
              AI Vision Model
            </p>
          </div>


          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs text-slate-600">
              Monitoring
            </p>

            <p className="mt-2 text-sm font-medium text-emerald-400">
              Active
            </p>
          </div>


          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs text-slate-600">
              Version
            </p>

            <p className="mt-2 text-sm font-medium text-slate-200">
              v1.0.0
            </p>
          </div>

        </div>

      </div>


      {/* SECURITY */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">

        <h2 className="text-lg font-semibold text-slate-100">
          Security & Access
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Account security and access information.
        </p>


        <div className="mt-5 divide-y divide-slate-800 rounded-xl border border-slate-800 bg-slate-950">

          <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-200">
                Authentication
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Secure account authentication enabled
              </p>
            </div>

            <span className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
              Protected
            </span>
          </div>


          <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-200">
                Data Processing
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Sonar analysis data processed securely
              </p>
            </div>

            <span className="w-fit rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-400">
              Secure
            </span>
          </div>


          <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-200">
                Session Status
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Current operator session is active
              </p>
            </div>

            <span className="w-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
              Active
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;