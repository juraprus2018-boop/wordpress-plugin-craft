import { useEffect } from "react";
import { useAuth } from "@/lib/auth";

const PRIMARY_ORIGIN = "https://finoverzicht.nl";
const WWW_ORIGIN = "https://www.finoverzicht.nl";

/**
 * Ensures authenticated users always end up on the primary domain.
 * Keeps the preview domain usable while logged out.
 */
export function PrimaryDomainGate() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading || !user) return;

    const { origin, hostname, pathname, search, hash } = window.location;

    const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
    const isPrimary = origin === PRIMARY_ORIGIN || origin === WWW_ORIGIN;

    if (!isLocalhost && !isPrimary) {
      window.location.replace(`${PRIMARY_ORIGIN}${pathname}${search}${hash}`);
    }
  }, [loading, user]);

  return null;
}
