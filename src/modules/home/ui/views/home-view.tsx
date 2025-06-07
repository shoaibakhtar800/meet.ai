"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export const HomeView = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  if (!session) {
    return (
      <p>Loading...</p>
    )
  }

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <Label>Logged in {session.user.name}</Label>
      <Button onClick={() => authClient.signOut({
        fetchOptions: { onSuccess: () => router.push("/sign-in") }
      })}>
        Sign Out
      </Button>
    </div>
  )
}