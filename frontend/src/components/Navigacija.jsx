import Link from "next/link";

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
    <div>
      <nav>
        {navItems.map((item) => (
          <Link href={item.href}>{item.name}</Link>
        ))}
      </nav>
    </div>
  );
}
