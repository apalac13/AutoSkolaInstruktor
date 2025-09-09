import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import Image from "next/image";

export default function SubNavigacija() {
  const [showNavigationLinks, setShowNavigationLinks] = useState(false);

  const navItems = [
    { name: "TESTOVI", href: "/e-nastava/testovi" },
    { name: "KVIZOVI", href: "/e-nastava/kvizovi" },
    { name: "REZULTATI", href: "/e-nastava/rezultati" },
    { name: "CHAT", href: "/e-nastava/chat" },
    { name: "LOGOUT", href: "/e-nastava/logout" },
  ];

  return (
    <nav className="w-[600px] max-sm:w-full flex max-sm:flex-col items-center max-sm:items-end justify-between text-lg text-black-40  mb-16 border-b-[1px] border-black-40">
      {navItems.map((item) => (
        <Link href={item.href} key={item.name} className="text-black-40">
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
