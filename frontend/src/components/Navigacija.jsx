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
        "flex items-center justify-between border-b-[1px] border-black-40",
        {
          "border-white-60": pathname === "/" || pathname === "/kategorije",
        }
      )}
    >
      {pathname === "/" || pathname === "/kategorije" ? (
        <Image src="/logo_white.png" alt="Logo" width={180} height={100} />
      ) : (
        <Image src="/asi_logo.png" alt="Logo" width={180} height={100} />
      )}
      <nav
        className={clsx("flex items-center gap-[34px] text-2xl text-black-40", {
          "text-white-60": pathname === "/" || pathname === "/kategorije",
        })}
      >
        {navItems.map((item) => (
          <Link href={item.href} key={item.name}>
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="flex items-center "></div>
    </div>
  );
}
