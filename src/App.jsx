import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import BottomNav from "./components/layout/BottomNav";
import Header from "./components/layout/Header";
import Onboarding from "./pages/Onboarding";
import TodayPage from "./pages/TodayPage";
import JourneyPage from "./pages/JourneyPage";
import WeeklyReportPage from "./pages/WeeklyReportPage";
import HistoryPage from "./pages/HistoryPage";
import { getFarm } from "./store/farmStore";

function ProtectedLayout() {
  const location = useLocation();
  const farm = getFarm();
  if (!farm.onboarded) return <Navigate to="/onboarding" replace state={{ from: location }} />;

  return (
    <div className="min-h-screen bg-[#f4f3ea] text-[#20352a]">
      <BottomNav />
      <div className="pb-24 lg:ml-[230px] lg:pb-8">
        <Header />
        <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const farm = getFarm();

  return (
    <Routes>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/today" element={<TodayPage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/weekly" element={<WeeklyReportPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Route>
      <Route path="/" element={<Navigate to={farm.onboarded ? "/today" : "/onboarding"} replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
