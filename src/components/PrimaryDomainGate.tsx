import { useEffect } from "react";
import { useAuth } from "@/lib/auth";

const PRIMARY_ORIGIN = "https://finoverzicht.nl";
const WWW_ORIGIN = "https://www.finoverzicht.nl";

/**
 * Ensures users end up on the primary domain.
 * - If the URL contains OAuth tokens in the hash, we move the user + hash to the primary domain
 *   so the session is established on the correct origin (localStorage is origin-scoped).
 * - After login, we keep the preview domain usable while logged out.
 */
export function PrimaryDomainGate() {
  const { user, loading } = useAuth();

  useEffect(() => {
    const { origin, hostname, pathname, search, hash } = window.location;

    const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
    const isPrimary = origin === PRIMARY_ORIGIN || origin === WWW_ORIGIN;
    const hasOAuthTokens = hash.includes("access_token=");

    // If we got redirected back with tokens on the preview domain, move the tokens to the
    // primary domain first (otherwise we'd store the session on the wrong origin).
    if (!isLocalhost && !isPrimary && hasOAuthTokens) {
      window.location.replace(`${PRIMARY_ORIGIN}${pathname}${search}${hash}`);
      return;
    }

    if (loading || !user) return;

    if (!isLocalhost && !isPrimary) {
      window.location.replace(`${PRIMARY_ORIGIN}${pathname}${search}${hash}`);
    }
  }, [loading, user]);

  return null;
}
