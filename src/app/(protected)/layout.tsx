// layout.tsx (Server Component)
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
import Header from "@/components/common/header";
import Footer from "./_components/footer";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="py-4 md:py-6 lg:py-8">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
