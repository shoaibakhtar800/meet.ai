"use client";

import { useState } from "react";

import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export default function Home() {
  const { data: session } = authClient.useSession(); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      name,
      password
    }, {
      onSuccess: () => {
        toast("Success");
      },
      onError: () => {
        // display the error message
        toast("Something went wrong!");
      },
    });
  }

  if (session) {
    return (
      <div className="p-4 flex flex-col gap-y-4">
        <Label>Logged in {session.user.name}</Label>
        <Button onClick={() => authClient.signOut()}>Sign Out</Button>
      </div>
    )
  }

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onSubmit}>
        Create User
      </Button>
    </div>
  );
}