"use client";
import Navigacija from "@/components/Navigacija";
import Image from "next/image";
import { motion } from "framer-motion";
import Form from "@/components/kontaktComponents/Form";

export default function Kontakt() {
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

  return (
    <div>
      <div className="relative w-full h-[500px]">
        <Image
          src="/kontakt.jpg"
          alt="Kontakt naslovna"
          fill
          priority
          className="object-cover object-middle"
        />
        <div className="absolute inset-0 bg-[#000]/40">
          <div className="flex flex-col w-full h-full">
            <Navigacija />
            <motion.p
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 1 }}
              className="w-full h-full flex items-center justify-center text-4xl max-md:text-3xl font-bold italic text-white-60"
            >
              KONTAKT
            </motion.p>
          </div>
        </div>
      </div>
      <motion.section
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col lg:flex-row justify-center items-center gap-44 max-[500px]:gap-24 py-14 text-black-40 "
      >
        <div className="flex flex-col  gap-14  ">
          <div className="relative w-[314px] h-[258px] max-[500px]:w-[250px] max-[500px]:h-[200px]">
            <Image fill src="/icons/ASInstruktorLogoOrginal.svg" alt="logo" />
          </div>
          <div className="flex flex-col gap-1">
            {contactItems.map((contact) => (
              <div className="flex gap-1 items-center" key={contact.alt}>
                <div className="relative w-[38px] h-[38px]  ">
                  <Image fill src={contact.icon} alt={contact.alt} />
                </div>
                <p className="text-base max-[500px]:text-sm">{contact.text}</p>
              </div>
            ))}
          </div>
        </div>
        <Form />
      </motion.section>
    </div>
  );
}
