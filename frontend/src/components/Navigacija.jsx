"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigacija() {
  const pathname = usePathname();
  const [showNavigationLinks, setShowNavigationLinks] = useState(false);

  const navItems = [
    { name: "POČETNA", href: "/" },
    { name: "O NAMA", href: "/o-nama" },
    { name: "KATEGORIJE", href: "/kategorije" },
    { name: "ONLINE PRIJAVA", href: "/online-prijava" },
    { name: "E-NASTAVA", href: "/e-nastava" },
    { name: "ONLINE TESTOVI", href: "/online-testovi" },
    { name: "KONTAKT", href: "/kontakt" },
  ];

  const navIcons = [
    { src: "/icons/phone-white.svg", alt: "phone" },
    { src: "/icons/mail-white.svg", alt: "mail" },
    { src: "/icons/instagram-white.svg", alt: "instagram" },
  ];

  return (
    <header className="w-full">
      <div
        className={clsx(
          "max-xl:hidden w-full flex items-center justify-between border-b-[1px] px-8 py-2",
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
      <div className="xl:hidden relative">
        <div
          className={clsx(
            "absolute w-full h-[104px] flex items-center justify-between border-b-[1px] px-8 py-2",
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
            width={87}
            height={87}
          />
          <Image
            src={
              pathname !== "/o-nama" && pathname !== "/e-nastava"
                ? "/icons/menu1.svg"
                : "/icons/menu2.svg"
            }
            alt="Logo"
            width={40}
            height={40}
            onClick={() => setShowNavigationLinks(!showNavigationLinks)}
          />
        </div>
        <AnimatePresence mode="wait">
          {showNavigationLinks && (
            <motion.div
              key="navMenu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={clsx(
                "fixed w-2/3 h-full flex flex-col gap-12 z-40 bg-gradient-to-t from-red-71 to-black-40 ",
                showNavigationLinks ? "right-0" : "w-[-100%]"
              )}
            >
              <div className="w-full h-[104px] flex items-center justify-end border-b-[1px] px-8 py-2 border-white-60">
                <Image
                  src={"/icons/close_menu.svg"}
                  alt="Logo"
                  width={40}
                  height={40}
                  onClick={() => setShowNavigationLinks(!showNavigationLinks)}
                />
              </div>
              <div className="flex flex-col gap-6 justify-center items-end mr-8 ">
                <nav className=" flex flex-col items-end justify-center gap-3 text-lg text-white-60">
                  {navItems.map((item, index) => (
                    <Link
                      href={item.href}
                      key={index}
                      className=" transition-all delay-50 ease-in-out font-medium  hover:text-gray-50 "
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="flex gap-3">
                  {navIcons.map((icon, index) => (
                    <div
                      key={index}
                      className=" flex items-center justify-center w-[50px] h-[50px] transition duration-400 ease-in-out border border-white-60  rounded-full hover:border-black-40   "
                    >
                      <Image
                        src={icon.src}
                        alt={icon.alt}
                        width={30}
                        height={30}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
