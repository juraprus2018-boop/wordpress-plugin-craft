import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import Landing from "@/pages/Landing";

// Smart landing that redirects PWA users who are logged in to dashboard
export const SmartLanding = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const isPWA = window.matchMedia('(display-mode: standalone)').matches;
  
  // Handle OAuth callback with hash fragment (e.g., #access_token=...)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      // Supabase will automatically pick up the session from the hash
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          // Clear the hash and navigate to dashboard
          window.history.replaceState(null, '', window.location.pathname);
          navigate('/dashboard');
        }
      });
    }
  }, [navigate]);
  
  if (loading) {
    return null; // Or a loading spinner
  }
  
  // If user is logged in and using PWA, go directly to dashboard
  if (user && isPWA) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Landing />;
};
