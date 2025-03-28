"use client";
import Navigacija from "@/components/Navigacija";
import Image from "next/image";
import { motion } from "framer-motion";
import Form from "@/components/kontaktComponents/Form";
import { MapProvider } from "../../providers/MapProvider";
import Map from "@/components/kontaktComponents/Map";

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
      text: "autoskola_instruktor@gmail.com",
    },
  ];

  return (
    <div>
      <div className=" bg-kontakt bg-cover bg-no-repeat bg-center w-lvh h-[500px]   ">
        <div className="flex flex-col w-lvh h-[500px] bg-[#000]/70 ">
          <Navigacija />
          <motion.p
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
            className="justify-self-center self-center absolute top-[33%]  text-4xl font-bold italic  text-white-60"
          >
            KONTAKT
          </motion.p>
        </div>
      </div>
      <motion.section
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
        className="flex justify-center items-center gap-44 py-14 text-black-40  "
      >
        <div className="flex flex-col  gap-14  ">
          <Image
            src="/icons/ASInstruktorLogoOrginal.svg"
            width={314}
            height={258}
            alt="logo"
          />
          <div className="flex flex-col gap-1">
            {contactItems.map((contact) => (
              <div className="flex gap-1 items-center" key={contact.alt}>
                <Image
                  src={contact.icon}
                  width={38}
                  height={38}
                  alt={contact.alt}
                />
                <p className="text-sm">{contact.text}</p>
              </div>
            ))}
          </div>
        </div>
        <Form />
      </motion.section>
      <motion.div
        initial={{ x: -50 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="flex items-center justify-center pb-14"
      >
        <MapProvider>
          <Map />
        </MapProvider>
      </motion.div>
    </div>
  );
}
