import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PasswordResetRequest {
  email: string;
}

const getPasswordResetEmailHtml = (resetLink: string): string => {
  const year = new Date().getFullYear();
  // Compact HTML without newlines to avoid quoted-printable encoding issues (=20)
  return `<!DOCTYPE html><html lang="nl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Wachtwoord Herstellen - FinOverzicht</title></head><body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 40px 20px;"><tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);"><tr><td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); border-radius: 12px 12px 0 0;"><h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">FinOverzicht</h1></td></tr><tr><td style="padding: 40px;"><h2 style="margin: 0 0 20px; color: #18181b; font-size: 24px; font-weight: 600;">Wachtwoord herstellen</h2><p style="margin: 0 0 20px; color: #52525b; font-size: 16px; line-height: 1.6;">Je hebt een verzoek ingediend om je wachtwoord te herstellen. Klik op de onderstaande knop om een nieuw wachtwoord in te stellen.</p><table role="presentation" cellspacing="0" cellpadding="0" style="margin: 30px auto;"><tr><td style="border-radius: 8px; background-color: #0d9488;"><a href="${resetLink}" style="display: inline-block; padding: 16px 32px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600;">Nieuw wachtwoord instellen</a></td></tr></table><p style="margin: 20px 0; color: #71717a; font-size: 14px; line-height: 1.6;">Deze link is 1 uur geldig. Als je geen wachtwoord herstel hebt aangevraagd, kun je deze e-mail negeren.</p><p style="margin: 20px 0 0; color: #a1a1aa; font-size: 12px; line-height: 1.6;">Werkt de knop niet? Kopieer dan deze link in je browser:<br><a href="${resetLink}" style="color: #0d9488; word-break: break-all;">${resetLink}</a></p></td></tr><tr><td style="padding: 30px 40px; background-color: #f4f4f5; border-radius: 0 0 12px 12px; text-align: center;"><p style="margin: 0 0 10px; color: #71717a; font-size: 14px;">Heb je vragen? Neem gerust <a href="https://www.finoverzicht.nl/contact" style="color: #0d9488; text-decoration: none;">contact</a> met ons op.</p><p style="margin: 0; color: #a1a1aa; font-size: 12px;">&copy; ${year} FinOverzicht. Alle rechten voorbehouden.</p></td></tr></table></td></tr></table></body></html>`;
};

const handler = async (req: Request): Promise<Response> => {
  console.log("send-password-reset function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const smtpHost = Deno.env.get("SMTP_HOST");
    const smtpPort = parseInt(Deno.env.get("SMTP_PORT") || "465");
    const smtpUsername = Deno.env.get("SMTP_USERNAME");
    const smtpPassword = Deno.env.get("SMTP_PASSWORD");
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!smtpHost || !smtpUsername || !smtpPassword) {
      console.error("Missing SMTP configuration");
      throw new Error("SMTP configuration is incomplete");
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase configuration");
      throw new Error("Supabase configuration is incomplete");
    }

    const { email }: PasswordResetRequest = await req.json();

    console.log(`Processing password reset for: ${email}`);

    // Create Supabase admin client
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Generate password reset link using Supabase
    const { data, error: resetError } = await supabase.auth.admin.generateLink({
      type: "recovery",
      email: email,
      options: {
        redirectTo: "https://www.finoverzicht.nl/auth?mode=reset",
      },
    });

    if (resetError) {
      console.error("Error generating reset link:", resetError);
      // Don't reveal if user exists or not for security
      return new Response(
        JSON.stringify({ success: true, message: "If an account with this email exists, a password reset email has been sent." }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    let resetLink = data.properties?.action_link;

    if (!resetLink) {
      throw new Error("Failed to generate reset link");
    }

    // Replace Supabase domain with finoverzicht.nl domain
    // The Supabase link format: https://[project].supabase.co/auth/v1/verify?token=...&type=recovery&redirect_to=...
    // We need to redirect through finoverzicht.nl instead
    resetLink = resetLink.replace(
      /https:\/\/[^\/]+\.supabase\.co/,
      "https://www.finoverzicht.nl"
    );

    console.log(`Sending password reset email to: ${email}`);

    const client = new SMTPClient({
      connection: {
        hostname: smtpHost,
        port: smtpPort,
        tls: true,
        auth: {
          username: smtpUsername,
          password: smtpPassword,
        },
      },
    });

    const html = getPasswordResetEmailHtml(resetLink);

    await client.send({
      from: "FinOverzicht <info@finoverzicht.nl>",
      to: email,
      subject: "Wachtwoord herstellen - FinOverzicht",
      content: `Je hebt een verzoek ingediend om je wachtwoord te herstellen. Ga naar: ${resetLink}`,
      html: html,
    });

    await client.close();

    console.log("Password reset email sent successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Password reset email sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending password reset email:", error);
    // Always return success for security (don't reveal if email exists)
    return new Response(
      JSON.stringify({ success: true, message: "If an account with this email exists, a password reset email has been sent." }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
