"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const [loggedOut, setLoggedOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/e-nastava");
    }

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setLoggedOut(true);
    setTimeout(() => {
      router.push("/e-nastava");
    }, 3000); // Redirect after 3 seconds
  }, [router]);

  return (
    <div className="my-28  font-sourceSans3 text-black-40 text-center">
      {loggedOut && (
        <>
          <p className="text-xl font-semibold">Odjavili ste se</p>
          <p className="text-base">Hvala vam na korištenju aplikacije!</p>
          <p className="text-sm text-red-70">
            Bit ćete preusmjereni na prijavu...
          </p>
        </>
      )}
    </div>
  );
}
