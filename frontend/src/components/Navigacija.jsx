import Link from "next/link";
import Image from "next/image";

export default function Navigacija() {
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
    <div className="flex items-center justify-between border-b-[1px] border-black-40">
      <Image src="/asi_logo.png" alt="Logo" width={133} height={100} />
      <nav className="flex items-center gap-[34px] text-xl text-black-40 ">
        {navItems.map((item) => (
          <Link href={item.href} key={item.name}>
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="flex items-center pr-5 ">
        <Image src="/whatsapp.svg" alt="Whatsapp icon" width={30} height={30} />
        <Image
          src="/instagram.svg"
          alt="Instagram icon"
          width={30}
          height={30}
        />
      </div>
    </div>
  );
}
