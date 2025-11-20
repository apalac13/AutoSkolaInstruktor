import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const contactItems = [
    {
      icon: "/icons/pin-map.svg",
      alt: "pin-map logo",
      text: "Stjepana Radića 40, 88240 POSUŠJE",
    },
    {
      icon: "/icons/phone1.svg",
      alt: "phone logo",
      text: "+38739682345",
    },
    {
      icon: "/icons/device-mobile1.svg",
      alt: "mobile phone logo",
      text: "+38763016830",
    },
    {
      icon: "/icons/instagram-red.svg",
      alt: "instagram logo",
      text: "autoskola_instruktor.posusje",
    },
    {
      icon: "/icons/mail1.svg",
      alt: "mail logo",
      text: "askinstruktor@gmail.com",
    },
  ];

  const navItems = [
    { name: "POČETNA", href: "/" },
    { name: "O NAMA", href: "/o-nama" },
    { name: "KATEGORIJE", href: "/kategorije" },
    { name: "ONLINE PRIJAVA", href: "/online-prijava" },
    { name: "E-NASTAVA", href: "/e-nastava" },
    { name: "KONTAKT", href: "/kontakt" },
  ];

  return (
    <div className="w-full flex flex-col justify-between  bg-gray-51  ">
      <div className="flex max-lg:flex-col h-full items-end max-lg:items-center max-lg:gap-7  py-12 justify-around">
        <Image
          src="/icons/ASInstruktorLogoOrginalBW.svg"
          alt="Logo"
          width={300}
          height={300}
          className="max-xl:w-52 max-xl:h-52"
        />
        <div className="flex flex-col gap-1 ">
          {contactItems.map((contact) => (
            <div
              className="flex gap-1 max-xl:gap-[2px] items-center"
              key={contact.alt}
            >
              <Image
                src={contact.icon}
                width={38}
                height={38}
                alt={contact.alt}
              />
              <p className="text-sm max-xl:text-sm text-white-60 font-thin">
                {contact.text}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-8">
          <p className="text-2xl max-xl:text-xl text-red-71 ">SADRŽAJ</p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className="text-white-60 text-xl max-xl:text-lg  text-start transition-all delay-50 ease-in-out hover:text-white-60/70"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="w-full h-[1px] bg-gray-50 "></div>
        <p className="text-gray-50 text-sm max-xl:text-xs font-light ">
          ©Copyright 2025 Autoškola Instruktor. All Rights Reserved. Design and
          development by <strong>ANA</strong>
        </p>
      </div>
    </div>
  );
}
