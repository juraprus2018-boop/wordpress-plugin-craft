import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const PRIMARY_ORIGIN = "https://finoverzicht.nl";
const WWW_ORIGIN = "https://www.finoverzicht.nl";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { origin, hostname, pathname, search, hash } = window.location;

      const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
      const isPrimary = origin === PRIMARY_ORIGIN || origin === WWW_ORIGIN;

      // If we landed on a non-primary domain, move the user (and hash tokens!) to the primary
      // domain first. Session storage is origin-scoped.
      if (!isLocalhost && !isPrimary) {
        window.location.replace(`${PRIMARY_ORIGIN}${pathname}${search}${hash}`);
        return;
      }

      // Get the hash from URL (contains access_token, refresh_token, etc.)
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get("access_token");
      const refreshToken = hashParams.get("refresh_token");

      if (accessToken && refreshToken) {
        await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });
      }

      // Clean up URL hash
      if (window.location.hash) {
        window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      }

      navigate("/dashboard", { replace: true });
    };

    void handleCallback();
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
