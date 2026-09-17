import { Navigate, Outlet, Route, Routes, useLocation } from "react-router-dom";
import BottomNav from "./components/layout/BottomNav";
import Header from "./components/layout/Header";
import DemoController from "./components/layout/DemoController";
import Onboarding from "./pages/Onboarding";
import TodayPage from "./pages/TodayPage";
import JourneyPage from "./pages/JourneyPage";
import WeeklyReportPage from "./pages/WeeklyReportPage";
import HistoryPage from "./pages/HistoryPage";
import SoilInfoPage from "./pages/SoilInfoPage";
import ExpenseLedger from "./pages/ExpenseLedger";
import HarvestFlow from "./pages/HarvestFlow";
import { getFarm } from "./store/farmStore";

import LandingPage from "./pages/LandingPage";
import MarketingLayout from "./components/layout/MarketingLayout";
import WhySanjivaniPage from "./pages/WhySanjivaniPage";
import HowItWorksPage from "./pages/HowItWorksPage";
import FeaturesPage from "./pages/FeaturesPage";
import ImpactPage from "./pages/ImpactPage";

function ProtectedLayout() {
  const location = useLocation();
  const farm = getFarm();
  if (!farm.onboarded) return <Navigate to="/onboarding" replace state={{ from: location }} />;

  return (
    <div className="min-h-screen bg-[#f4f3ea] text-[#20352a]">
      <BottomNav />
      <DemoController />
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
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/why" element={<WhySanjivaniPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/impact" element={<ImpactPage />} />
      </Route>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/today" element={<TodayPage />} />
        <Route path="/journey" element={<JourneyPage />} />
        <Route path="/weekly" element={<WeeklyReportPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/soil" element={<SoilInfoPage />} />
        <Route path="/ledger" element={<ExpenseLedger />} />
        <Route path="/harvest" element={<HarvestFlow />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
