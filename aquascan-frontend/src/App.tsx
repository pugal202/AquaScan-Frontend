import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppShell from "./components/AppShell";

import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Results from "./pages/Results";
import History from "./pages/History";
import Profile from "./pages/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* MAIN APPLICATION LAYOUT */}
        <Route element={<AppShell />}>

          {/* DASHBOARD */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* UPLOAD / NEW ANALYSIS */}
          <Route
            path="/upload"
            element={<Upload />}
          />

          {/* ANALYSIS RESULTS */}
          <Route
            path="/results/:id"
            element={<Results />}
          />

          {/* ANALYSIS HISTORY */}
          <Route
            path="/history"
            element={<History />}
          />

          {/* USER PROFILE */}
          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* INVALID ROUTE → DASHBOARD */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;