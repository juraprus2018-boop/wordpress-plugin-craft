import { Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import Landing from "@/pages/Landing";

// Smart landing that redirects PWA users who are logged in to dashboard
export const SmartLanding = () => {
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
