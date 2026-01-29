import { Button } from "@/components/ui/button";
import { auth } from "@/server/auth";
import { Editor } from "@tiptap/react";
import Link from "next/link";
import { redirect } from "next/navigation";
export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <div className="mx-auto max-w-[740px] space-y-8 py-8">
      <Link href='/write'>
        <Button>go to write page</Button>
      </Link>
    </div>
  );
}
