import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/email/send";
import createRateLimit from "next-rate-limit";

const rateLimit = createRateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

const contactSchema = z.object({
  firstName: z.string().min(1).max(100),
  lastName: z.string().min(1).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional().default(""),
  message: z.string().min(10).max(5000),
});

export async function POST(request: NextRequest) {
  try {
    const rateLimitHeaders = rateLimit.checkNext(request, 3);
    if (rateLimitHeaders.get("x-rl-remaining") === "0") {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429, headers: rateLimitHeaders },
      );
    }

    const body: unknown = await request.json();
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Invalid input." },
        { status: 400 },
      );
    }

    const { firstName, lastName, email, phone, message } = result.data;

    await sendEmail({
      to: "hasnainoffice2024@gmail.com",
      subject: `Contact Form: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="border-bottom: 2px solid #86A694; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="margin: 0; font-size: 24px; color: #111;">New Contact Message</h1>
            <p style="margin: 4px 0 0; color: #666; font-size: 14px;">Received from reflecto.app contact form</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 120px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0; color: #111; font-weight: 500;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #86A694;">${email}</a></td>
            </tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #666; vertical-align: top;">Phone</td><td style="padding: 8px 0; color: #111;">${phone}</td></tr>` : ""}
          </table>
          <div style="margin-top: 24px; padding: 16px; background: #f9f9f9; border-radius: 8px;">
            <p style="margin: 0 0 8px; color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
            <p style="margin: 0; color: #111; white-space: pre-wrap; line-height: 1.6;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
          </div>
          <p style="margin-top: 32px; color: #999; font-size: 12px;">Reply directly to this email to respond to ${firstName}.</p>
        </div>
      `,
      headers: { "Reply-To": email },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message." },
      { status: 500 },
    );
  }
}
