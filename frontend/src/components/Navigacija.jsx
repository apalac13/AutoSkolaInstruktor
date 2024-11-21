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
        "w-full bg-blur-2xl  flex items-center justify-between border-b-[1px] border-black-40 px-8 py-2  ",
        {
          "border-white-60":
            pathname === "/" ||
            pathname === "/kategorije" ||
            pathname === "/online-prijava",
        }
      )}
    >
      {pathname === "/" ||
      pathname === "/kategorije" ||
      pathname === "/online-prijava" ? (
        <Image
          src="/icons/asi-logo-bw.svg"
          alt="Logo"
          width={112}
          height={112}
        />
      ) : (
        <Image
          src="/icons/asi-logo-orginal.svg"
          alt="Logo"
          width={112}
          height={112}
        />
      )}
      <nav
        className={clsx("flex items-center gap-8 text-2xl text-black-40 ", {
          "text-white-60":
            pathname === "/" ||
            pathname === "/kategorije" ||
            pathname === "/online-prijava",
        })}
      >
        {navItems.map((item) => (
          <Link href={item.href} key={item.name}>
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="flex gap-2 items-center ">
        <Image src="/icons/instagram.svg" alt="Logo" width={48} height={48} />
        <Image src="/icons/whatsapp.svg" alt="Logo" width={46} height={46} />
      </div>
    </div>
  );
}
