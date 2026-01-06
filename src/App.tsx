import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/auth";
import Landing from "./pages/Landing";
import Functies from "./pages/Functies";
import OverOns from "./pages/OverOns";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Voorwaarden from "./pages/Voorwaarden";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Debts from "./pages/Debts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import BudgetBeheren from "./pages/BudgetBeheren";
import SparenTips from "./pages/SparenTips";
import Huishoudboekje from "./pages/Huishoudboekje";
import SchuldenAflossen from "./pages/SchuldenAflossen";
import FinancielePlanning from "./pages/FinancielePlanning";
import GeldBesparen from "./pages/GeldBesparen";
import VasteLastenOverzicht from "./pages/VasteLastenOverzicht";
import InkomenBeheren from "./pages/InkomenBeheren";
import FAQ from "./pages/FAQ";
import SharedExpenses from "./pages/SharedExpenses";
import Install from "./pages/Install";
import { InstallBanner } from "./components/pwa/InstallBanner";
import { ScrollToTop } from "./components/ScrollToTop";

const queryClient = new QueryClient();

// Smart landing that redirects PWA users who are logged in to dashboard
const SmartLanding = () => {
  const { user, loading } = useAuth();
  const isPWA = window.matchMedia('(display-mode: standalone)').matches;
  
  if (loading) {
    return null; // Or a loading spinner
  }
  
  // If user is logged in and using PWA, go directly to dashboard
  if (user && isPWA) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Landing />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<SmartLanding />} />
            <Route path="/functies" element={<Functies />} />
            <Route path="/over-ons" element={<OverOns />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/voorwaarden" element={<Voorwaarden />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/debts" element={<Debts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/budget-beheren" element={<BudgetBeheren />} />
            <Route path="/sparen-tips" element={<SparenTips />} />
            <Route path="/huishoudboekje" element={<Huishoudboekje />} />
            <Route path="/schulden-aflossen" element={<SchuldenAflossen />} />
            <Route path="/financiele-planning" element={<FinancielePlanning />} />
            <Route path="/geld-besparen" element={<GeldBesparen />} />
            <Route path="/vaste-lasten" element={<VasteLastenOverzicht />} />
            <Route path="/inkomen-beheren" element={<InkomenBeheren />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/gedeelde-kosten" element={<SharedExpenses />} />
            <Route path="/install" element={<Install />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <InstallBanner />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;