import nodemailer from "nodemailer";
import env from "@/config/env";

// Check if SMTP credentials are configured
const isSmtpConfigured = Boolean(env.smtp.user && env.smtp.pass);

const transporter = isSmtpConfigured
  ? nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.port === 465,
      auth: {
        user: env.smtp.user,
        pass: env.smtp.pass,
      },
    })
  : null;

interface SendEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail({ to, subject, text, html }: SendEmailOptions) {
  if (!transporter) {
    console.warn(
      "[Email] SMTP credentials not configured. Please set SMTP_USER and SMTP_PASS environment variables."
    );
    console.log("[Email] Would have sent email to:", to);
    console.log("[Email] Subject:", subject);
    return null;
  }

  const mailOptions = {
    from: env.smtp.from,
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
}

export async function sendVerificationEmail(
  to: string,
  url: string,
  userName: string
) {
  console.log("[Email] sendVerificationEmail called");
  console.log("[Email] Recipient:", to);
  console.log("[Email] SMTP configured:", isSmtpConfigured);
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - CodeBhaiya</title>
      </head>
      <body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 20px;">
              <table role="presentation" style="max-width: 480px; width: 100%; border-collapse: collapse; background: linear-gradient(145deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px; text-align: center;">
                    <div style="display: inline-block; padding: 16px; background: rgba(99, 102, 241, 0.1); border-radius: 16px; margin-bottom: 20px;">
                      <span style="font-size: 32px;">🚀</span>
                    </div>
                    <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">
                      CodeBhaiya
                    </h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 20px 40px;">
                    <h2 style="margin: 0 0 16px; font-size: 22px; font-weight: 600; color: #ffffff;">
                      Verify Your Email Address
                    </h2>
                    <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #a0aec0;">
                      Hey ${userName}! 👋
                    </p>
                    <p style="margin: 0 0 32px; font-size: 16px; line-height: 1.6; color: #a0aec0;">
                      Thanks for signing up for CodeBhaiya! Please verify your email address by clicking the button below.
                    </p>
                    
                    <!-- CTA Button -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td align="center">
                          <a href="${url}" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 12px; box-shadow: 0 4px 14px 0 rgba(99, 102, 241, 0.4);">
                            Verify Email Address
                          </a>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 32px 0 0; font-size: 14px; line-height: 1.6; color: #718096;">
                      If the button doesn't work, copy and paste this link into your browser:
                    </p>
                    <p style="margin: 8px 0 0; font-size: 12px; color: #6366f1; word-break: break-all;">
                      ${url}
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background: rgba(0, 0, 0, 0.2);">
                    <p style="margin: 0 0 8px; font-size: 14px; color: #718096; text-align: center;">
                      This link will expire in 24 hours.
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #4a5568; text-align: center;">
                      If you didn't create an account with CodeBhaiya, you can safely ignore this email.
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Footer branding -->
              <p style="margin: 24px 0 0; font-size: 12px; color: #4a5568;">
                © ${new Date().getFullYear()} CodeBhaiya. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const text = `
    Verify Your Email Address - CodeBhaiya
    
    Hey ${userName}!
    
    Thanks for signing up for CodeBhaiya! Please verify your email address by clicking the link below:
    
    ${url}
    
    This link will expire in 24 hours.
    
    If you didn't create an account with CodeBhaiya, you can safely ignore this email.
  `;

  return sendEmail({
    to,
    subject: "Verify Your Email Address - CodeBhaiya",
    text,
    html,
  });
}
