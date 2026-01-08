import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const PRIMARY_ORIGIN = "https://finoverzicht.nl";
const WWW_ORIGIN = "https://www.finoverzicht.nl";

/**
 * Handles OAuth implicit-flow callbacks when the provider returns tokens in the URL hash.
 * Some setups return to `/` instead of `/auth/callback`.
 *
 * IMPORTANT: Only establishes session on the primary domain (or localhost), because auth
 * storage is origin-scoped.
 */
export function OAuthHashHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const { origin, hostname, pathname, search, hash } = window.location;

    if (!hash.includes("access_token=")) return;

    const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
    const isPrimary = origin === PRIMARY_ORIGIN || origin === WWW_ORIGIN;

    // If tokens are on a non-primary origin, PrimaryDomainGate/AuthCallback will move them.
    if (!isLocalhost && !isPrimary) return;

    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (!accessToken || !refreshToken) return;

    supabase.auth
      .setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      })
      .then(() => {
        // Remove hash but keep path + query
        window.history.replaceState(null, "", `${pathname}${search}`);
        navigate("/dashboard", { replace: true });
      });
  }, [navigate]);

  return null;
}
