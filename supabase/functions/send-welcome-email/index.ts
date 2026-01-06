import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  fullName: string;
}

const getWelcomeEmailHtml = (fullName: string): string => {
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welkom bij FinOverzicht</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f4f4f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">💰 FinOverzicht</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px; color: #18181b; font-size: 24px; font-weight: 600;">
                Welkom${fullName ? `, ${fullName}` : ''}! 🎉
              </h2>
              
              <p style="margin: 0 0 20px; color: #52525b; font-size: 16px; line-height: 1.6;">
                Bedankt voor je registratie bij FinOverzicht! Je hebt de eerste stap gezet naar beter financieel overzicht.
              </p>
              
              <p style="margin: 0 0 20px; color: #52525b; font-size: 16px; line-height: 1.6;">
                Met FinOverzicht kun je:
              </p>
              
              <ul style="margin: 0 0 30px; padding-left: 20px; color: #52525b; font-size: 16px; line-height: 1.8;">
                <li>📊 Je inkomsten en uitgaven bijhouden</li>
                <li>📈 Inzicht krijgen in je financiële situatie</li>
                <li>💳 Schulden beheren en aflossing volgen</li>
                <li>👨‍👩‍👧‍👦 Gezinsfinanciën overzichtelijk maken</li>
                <li>📁 Gegevens exporteren naar PDF of Excel</li>
              </ul>
              
              <table role="presentation" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                <tr>
                  <td style="border-radius: 8px; background-color: #0d9488;">
                    <a href="https://www.finoverzicht.nl/dashboard" style="display: inline-block; padding: 16px 32px; color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600;">
                      Ga naar je Dashboard →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #f4f4f5; border-radius: 0 0 12px 12px; text-align: center;">
              <p style="margin: 0 0 10px; color: #71717a; font-size: 14px;">
                Heb je vragen? Neem gerust <a href="https://www.finoverzicht.nl/contact" style="color: #0d9488; text-decoration: none;">contact</a> met ons op.
              </p>
              <p style="margin: 0; color: #a1a1aa; font-size: 12px;">
                © ${new Date().getFullYear()} FinOverzicht. Alle rechten voorbehouden.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
};

const handler = async (req: Request): Promise<Response> => {
  console.log("send-welcome-email function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const smtpHost = Deno.env.get("SMTP_HOST");
    const smtpPort = parseInt(Deno.env.get("SMTP_PORT") || "465");
    const smtpUsername = Deno.env.get("SMTP_USERNAME");
    const smtpPassword = Deno.env.get("SMTP_PASSWORD");

    if (!smtpHost || !smtpUsername || !smtpPassword) {
      console.error("Missing SMTP configuration");
      throw new Error("SMTP configuration is incomplete");
    }

    const { email, fullName }: WelcomeEmailRequest = await req.json();

    console.log(`Sending welcome email to: ${email}`);

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

    const html = getWelcomeEmailHtml(fullName);

    await client.send({
      from: "FinOverzicht <info@finoverzicht.nl>",
      to: email,
      subject: "Welkom bij FinOverzicht! 🎉",
      content: `Welkom bij FinOverzicht, ${fullName || 'nieuwe gebruiker'}! Bedankt voor je registratie. Ga naar https://www.finoverzicht.nl/dashboard om te beginnen.`,
      html: html,
    });

    await client.close();

    console.log("Welcome email sent successfully");

    return new Response(
      JSON.stringify({ success: true, message: "Welcome email sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending welcome email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
