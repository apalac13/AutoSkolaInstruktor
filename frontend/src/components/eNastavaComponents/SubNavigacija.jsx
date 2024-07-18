import Link from "next/link";
import clsx from "clsx";
import { useState, useEffect } from "react";

export default function SubNavigacija() {
  const [role, setRole] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("role");
      setRole(storedRole);
    }
  }, []);

  const navItems = [
    { name: "POČETNA", href: "/e-nastava/pocetna" },
    { name: "CHAT", href: "/e-nastava/chat" },
    { name: "KVIZOVI", href: "/e-nastava/kvizovi" },
    { name: "NAPRAVI KVIZ", href: "/e-nastava/napravi-kviz" },
    { name: "LOGOUT", href: "/e-nastava/logout" },
  ];

  return (
    <nav className="w-[600px] flex items-center justify-between text-lg text-black-40 mt-12 mb-16 border-b-[1px] border-black-40">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.name}
          className={clsx(
            role === "user" &&
              (item.name === "KVIZOVI" || item.name === "NAPRAVI KVIZ")
              ? "hidden"
              : "block"
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
