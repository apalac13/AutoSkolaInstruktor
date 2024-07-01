import Link from "next/link";

export default function SubNavigacija() {
  const navItems = [
    { name: "POČETNA", href: "/e-nastava/pocetna" },
    { name: "KVIZOVI", href: "/e-nastava/kvizovi" },
    { name: "NAPRAVI KVIZ", href: "/e-nastava/napravi-kviz" },
    { name: "LOGOUT", href: "/e-nastava/logout" },
  ];

  return (
    <div>
      <nav className="flex items-center gap-[34px] text-lg text-black-40 ">
        {navItems.map((item) => (
          <Link href={item.href} key={item.name}>
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
