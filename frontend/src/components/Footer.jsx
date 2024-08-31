import Image from "next/image";
import Link from "next/link";

export default function Footer() {
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
    <div className="w-full flex flex-col justify-between h-96 bg-gray-51 pt-5 mt-24 ">
      <div className="flex items-center justify-between pr-20">
        <Image src="/logo_white.png" alt="Logo" width={400} height={400} />
        <div className="flex flex-col gap-11">
          <p className="text-2xl text-red-71 ">SADRŽAJ</p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className="text-white-60 text-xl  text-start hover:text-white-60/70"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="w-full h-[1px] bg-gray-50 "></div>
        <p className="text-white-60 text-sm font-light ">
          ©Copyright 2024 Autoškola Instruktor. All Rights Reserved. Powered by
          AP.
        </p>
      </div>
    </div>
  );
}
