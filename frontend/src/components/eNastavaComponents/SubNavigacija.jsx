import Link from "next/link";
import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function SubNavigacija() {
  const [showNavigationLinks, setShowNavigationLinks] = useState(false);
  const { user, loading } = useContext(AuthContext);

  const navItems = [
    { name: "TESTOVI", href: "/e-nastava/testovi" },
    { name: "KVIZOVI", href: "/e-nastava/kvizovi" },
    { name: "MATERIJALI", href: "/e-nastava/materijali" },
    { name: "KANDIDATI", href: "/e-nastava/kandidati", adminOnly: true },
    { name: "REZULTATI", href: "/e-nastava/rezultati" },
    { name: "LOGOUT", href: "/e-nastava/logout" },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <nav className="w-[600px] max-sm:w-full flex max-sm:flex-col items-center max-sm:items-end justify-between text-lg text-black-40  mb-16 border-b-[1px] border-black-40">
      {navItems
        .filter((item) => !item.adminOnly || user?.role === "admin")
        .map((item) => (
          <Link
            href={item.href}
            key={item.name}
            className="text-black-40 hover:text-gray-50"
          >
            {item.name}
          </Link>
        ))}
    </nav>
  );
}
