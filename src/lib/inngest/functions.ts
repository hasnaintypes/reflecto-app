import { inngest } from "./client";
import { db } from "@/server/db";
import { resend } from "@/lib/resend/client";
import { subDays } from "date-fns";

/**
 * Inactivity Reminder Function
 * Runs daily to check for users who haven't written an entry in 3 days.
 */
export const checkInactivityAndRemind = inngest.createFunction(
  { id: "check-inactivity-remind" },
  { cron: "0 9 * * *" }, // Run every day at 9:00 AM
  async ({ step }) => {
    // 1. Fetch all users who have notifications enabled
    const users = await step.run("fetch-notifiable-users", async () => {
      return db.user.findMany({
        where: {
          userPreferences: {
            notificationEnabled: true,
          },
        },
        select: {
          id: true,
          email: true,
          name: true,
        },
      });
    });

    const threeDaysAgo = subDays(new Date(), 3);

    // 2. Map through users and check for recent entries
    const results = [];
    for (const user of users) {
      const hasRecentEntry = await step.run(
        `check-entry-${user.id}`,
        async () => {
          const count = await db.entry.count({
            where: {
              userId: user.id,
              createdAt: {
                gte: threeDaysAgo,
              },
              deletedAt: null,
            },
          });
          return count > 0;
        },
      );

      if (!hasRecentEntry) {
        // 3. Send reminder email
        await step.run(`send-reminder-${user.id}`, async () => {
          return resend.emails.send({
            from: "Reflecto <onboarding@resend.dev>",
            to: user.email,
            subject: "We miss you! Take a moment to reflect.",
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h1>Hello ${user.name || "there"},</h1>
                <p>It's been a few days since your last reflection.</p>
                <p>Journaling regularly helps you track your growth and maintain mental clarity. Why not take 5 minutes today to write down what's on your mind?</p>
                <div style="margin-top: 30px;">
                  <a href="${process.env.NEXTAUTH_URL}/write" 
                     style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                    Write an Entry
                  </a>
                </div>
                <p style="margin-top: 40px; color: #666; font-size: 0.8em;">
                  To stop receiving these reminders, you can update your notification settings in the app.
                </p>
              </div>
            `,
          });
        });
        results.push({ userId: user.id, sent: true });
      } else {
        results.push({ userId: user.id, sent: false });
      }
    }

    return {
      processed: users.length,
      remindersSent: results.filter((r) => r.sent).length,
    };
  },
);
