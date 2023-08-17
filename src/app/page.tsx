"use client";
import NotLoggedInn from "@/components/notLoggedInn.component";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();

  if (!session) return <NotLoggedInn />;

  return <main className=""></main>;
}
