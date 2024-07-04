import Link from "next/link";

export default function SubNavigacija() {
  const navItems = [
    { name: "POČETNA", href: "/e-nastava/pocetna" },
    { name: "KVIZOVI", href: "/e-nastava/kvizovi" },
    { name: "NAPRAVI KVIZ", href: "/e-nastava/napravi-kviz" },
    { name: "LOGOUT", href: "/e-nastava/logout" },
  ];

  return (
    <nav className=" w-[600px] flex items-center justify-between  text-lg text-black-40 mt-12 mb-16 border-b-[1px] border-black-40 ">
      {navItems.map((item) => (
        <Link href={item.href} key={item.name}>
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
