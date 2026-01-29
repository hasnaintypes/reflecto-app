import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import JournalEditor from "./_components/editor";

export default async function ReflectPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/sign-in");
  }

  // LOGIC: In a real app, you'd check your DB here:
  // const todayEntry = await db.entry.findFirst({ where: { userId: session.user.id, createdAt: today } })
  // if (todayEntry) redirect("/dashboard")

  return (
    <main className="relative h-screen overflow-hidden bg-[#080808] selection:bg-white/10">
      {/* Subtle Background Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />

      <div className="mx-auto h-full max-w-7xl px-8">
        <JournalEditor />
      </div>
    </main>
  );
}
