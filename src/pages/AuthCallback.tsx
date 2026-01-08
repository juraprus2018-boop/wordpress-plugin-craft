import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      // Get the hash from URL (contains access_token, refresh_token, etc.)
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");

      if (accessToken && refreshToken) {
        // Set the session manually if tokens are in hash
        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
      }

      // Clean up URL hash
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }

      // Always redirect to dashboard on finoverzicht.nl
      const targetDomain = "https://finoverzicht.nl";
      const currentOrigin = window.location.origin;

      if (currentOrigin !== targetDomain && !currentOrigin.includes("localhost")) {
        // Redirect to production domain
        window.location.href = `${targetDomain}/dashboard`;
      } else {
        // Already on correct domain, use router
        navigate("/dashboard", { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Bezig met inloggen...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
