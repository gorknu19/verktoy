"use client";
import { useSession } from "next-auth/react";
import { NotLoggedInn } from "@/components/notLoggedInn.component";
function Register() {
  const { data: session } = useSession();

  if (!session) {
    return <NotLoggedInn />;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="w-1/4">
          <h1 className={`text-center font-bold text-lg m-5 `}>
            Welcome to the forum {session?.user?.name}
          </h1>
        </div>
      </div>
    </>
  );
}

export default Register;
