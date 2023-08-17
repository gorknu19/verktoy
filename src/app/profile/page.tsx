"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  LoginButton,
  LogoutButton,
} from "@/components/nextauth.buttons.component";
import NotLoggedInn from "@/components/notLoggedInn.component";

export default function Navbar() {
  const { data: session } = useSession();
  console.log(session);
  if (!session) return <NotLoggedInn />;

  return (
    <>
      <div className={`text-center content-center m-5 `}>
        <h1 className="mb-5">Hei, {session.user?.name}!</h1>
        <h1>Gmail: {session.user?.email}</h1>
        <p>session expires on: {session.expires}</p>
        <LogoutButton />
      </div>
    </>
  );
}
