"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navigacija() {
  const pathname = usePathname();

  const navItems = [
    { name: "POČETNA", href: "/" },
    { name: "O NAMA", href: "/o-nama" },
    { name: "KATEGORIJE", href: "/kategorije" },
    { name: "ONLINE PRIJAVA", href: "/online-prijava" },
    { name: "E-NASTAVA", href: "/e-nastava" },
    { name: "ONLINE TESTOVI", href: "/online-testovi" },
    { name: "KONTAKT", href: "/kontakt" },
  ];

  return (
    <div
      className={clsx(
        "w-full bg-blur-2xl flex items-center justify-between border-b-[1px] px-8 py-2",
        pathname !== "/o-nama" && pathname !== "/e-nastava"
          ? "border-white-60"
          : "border-black-40"
      )}
    >
      <Image
        src={
          pathname !== "/o-nama" && pathname !== "/e-nastava"
            ? "/icons/asi-logo-bw.svg"
            : "/icons/asi-logo-orginal.svg"
        }
        alt="Logo"
        width={112}
        height={112}
      />
      <nav
        className={clsx(
          " flex items-center gap-8 text-2xl   ",
          pathname !== "/o-nama" && pathname !== "/e-nastava"
            ? "text-white-60"
            : "text-black-40"
        )}
      >
        {navItems.map(({ name, href }) => (
          <Link
            href={href}
            key={name}
            className=" transition-all delay-50 ease-in-out hover:text-gray-50 "
          >
            {name}
          </Link>
        ))}
      </nav>
      <div></div>
    </div>
  );
}
