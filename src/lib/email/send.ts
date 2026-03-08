import { resend } from "@/lib/resend/client";
import nodemailer from "nodemailer";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
  headers?: Record<string, string>;
}

const SMTP_CONFIGURED =
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

const smtpTransport = SMTP_CONFIGURED
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  : null;

const DEFAULT_FROM =
  process.env.EMAIL_FROM ?? "Reflecto <onboarding@resend.dev>";

/**
 * Send an email using Resend, with SMTP as fallback.
 * If Resend fails (e.g. free tier limit, test mode), falls back to SMTP.
 * If SMTP is not configured, the Resend error is thrown.
 */
export async function sendEmail(options: SendEmailOptions): Promise<void> {
  const from = options.from ?? DEFAULT_FROM;

  try {
    await resend.emails.send({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
      headers: options.headers,
    });
    return;
  } catch (resendError) {
    if (!smtpTransport) {
      console.error("Resend failed and SMTP not configured:", resendError);
      throw resendError;
    }

    console.warn("Resend failed, falling back to SMTP:", resendError);
  }

  await smtpTransport.sendMail({
    from,
    to: options.to,
    subject: options.subject,
    html: options.html,
    headers: options.headers,
  });
}
