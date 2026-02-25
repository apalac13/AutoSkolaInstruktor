"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function Logout() {
  const [loggedOut, setLoggedOut] = useState(false);
  const router = useRouter();
  const { logout } = useContext(AuthContext);

  const handleLogout = useCallback(() => {
    logout();
    router.push("/e-nastava");
  }, [logout, router]);

  useEffect(() => {
    setLoggedOut(true);

    const timeout = setTimeout(() => {
      handleLogout();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [handleLogout]);

  return (
    <div className="my-28 font-sourceSans3 text-black-40 text-center">
      {loggedOut && (
        <>
          <p className="text-xl font-semibold">Odjavili ste se</p>
          <p className="text-base">Hvala vam na korištenju aplikacije!</p>
          <p className="text-sm text-red-71">
            Bit ćete preusmjereni na prijavu...
          </p>
        </>
      )}
    </div>
  );
}
