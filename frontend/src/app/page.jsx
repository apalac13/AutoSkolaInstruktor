"use client";

import Navigacija from "@/components/Navigacija";
import Section from "@/components/Section";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "@/components/buttons/Button";
import Link from "next/link";
import { motion } from "framer-motion";
import StatisticSection from "@/components/pocetnaComponents/StatisticSection";
import WhyUsSection from "@/components/pocetnaComponents/WhyUsSection";
import TestimonialsSection from "@/components/pocetnaComponents/TestimonialsSection";

export default function Pocetna() {
  return (
    <div className="mb-24 ">
      <a
        aria-label="Chat on WhatsApp"
        href="https://wa.me/38763016830?text=Započnite%20razgovor%20s%20Autoškolom%20Instruktor"
        className="fixed bottom-2 right-2 z-20 animate-pulse"
      >
        <Image
          alt="Chat on WhatsApp"
          src="/icons/whatsapp-chat.svg"
          width={74}
          height={74}
        />
      </a>
      <div>
        <div className="relative bg-home-page bg-cover bg-no-repeat bg-center w-lvh h-lvh ">
          <div className="flex flex-col  w-lvh h-lvh bg-[#000]/10 ">
            <Navigacija />
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-1/2 left-[35%] max-xl:left-[20%] max-lg:left-[15%] max-[800px]:left-[10%] max-sm:left-2  flex flex-col gap-9 items-center justify-center "
            >
              <div className="flex max-lg:flex-col gap-16 max-md:gap-12 max-sm:gap-4">
                <Link href={"/online-prijava"}>
                  <Button
                    type={"button"}
                    width={"200px"}
                    text={"PRIJAVI SE"}
                    color={"red"}
                  />
                </Link>
                <Link href={"/kontakt"}>
                  <Button
                    type={"button"}
                    width={"200px"}
                    text={"KONTAKT"}
                    color={"black"}
                  />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        <StatisticSection />
        <WhyUsSection />
        <section className="flex flex-col gap-20 p-10 pb-28">
          <Section number={"03"} text={"VLASNIK"} />
          <div className="self-center gap-12 flex flex-col  items-center ">
            <div className="grid auto-rows-3   ">
              <Image
                src={"/icons/mark_quote.svg"}
                alt="mark quote icon"
                width={36}
                height={25}
                className=" justify-self-start  "
              />
              <motion.blockquote
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="text-xl max-sm:text-lg text-black-40 italic px-7"
              >
                Naša autoškola nije samo mjesto za polaganje vozačkog ispita,
                već i za sticanje trajnih znanja i vještina koje će svaki vozač
                koristiti cijeli život.
              </motion.blockquote>
              <Image
                src={"/icons/mark_quote.svg"}
                alt="mark quote icon"
                width={36}
                height={25}
                className="justify-self-end "
              />
            </div>
            <div className="self-end flex gap-2 items-end">
              <Image
                src={"/icons/user_male.svg"}
                alt="user male icon"
                width={42}
                height={42}
              />
              <div className="flex flex-col items-start gap-1 max-sm:gap-0  text-black-40">
                <p className=" text-sm max-sm:text-xs leading-none">
                  Instruktor
                </p>
                <p className=" text-xl max-sm:text-lg leading-none">
                  Jure Bradarić
                </p>
              </div>
            </div>
            <Link href={"/o-nama"} className="self-end">
              <Button
                type={"button"}
                width={"200px"}
                text={"SAZNAJTE VIŠE O NAMA"}
                color={"red"}
              />
            </Link>
          </div>
        </section>
        <section className="flex max-xl:flex-col  ">
          <div className="relative bg-service-1 bg-cover bg-no-repeat bg-center w-full h-lvh ">
            <div className=" w-full h-lvh flex flex-col items-center bg-[#000]/80">
              <span className="absolute top-10 left-10 self-start justify-self-start">
                <Section number={"04"} text={"POSEBNE USLUGE"} />
              </span>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className=" flex flex-col w-[350px] max-xl:w-[600px] max-[620px]:w-auto max-[620px]:px-4 gap-[18px] absolute top-1/3  "
              >
                <div className="self-start flex gap-2">
                  <div className="w-1 h-8 bg-red-71 mb-[5px] "></div>
                  <p className="text-2xl max-[500px]:text-xl text-white-60 font-semibold">
                    OBUKA SVIH KATEGORIJA
                  </p>
                </div>
                <p className=" text-base max-[500px]:text-sm font-light text-white-60 text-justify ">
                  Autoskola "Instruktor" se ističe svojom ponudom sveobuhvatne
                  obuke za sve kategorije vozačkih dozvola. Ova usluga je
                  ključna za sve polaznike koji žele da steknu vozačku dozvolu
                  za različite tipove vozila. Bilo da se radi o motociklima,
                  putničkim vozilima, teretnim vozilima ili autobusima,
                  Autoskola "Instruktor" pruža kompletnu edukaciju prilagođenu
                  specifičnim potrebama svake kategorije.
                </p>
              </motion.div>
            </div>
          </div>
          <div className="relative bg-service-2 bg-cover bg-no-repeat bg-center w-full h-lvh max-xl:h-1/3">
            <div className="w-full h-lvh flex flex-col justify-center items-center bg-[#000]/80">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                className="flex flex-col w-[350px] max-xl:w-[600px] max-[620px]:w-auto max-[620px]:px-4 gap-[18px] absolute top-1/3   "
              >
                <div className="self-start flex gap-2">
                  <div className="w-1 h-8 bg-red-71 mb-[5px] "></div>
                  <p className="text-2xl max-[500px]:text-xl text-white-60 font-semibold">
                    KONDICIJSKA VOŽNJA
                  </p>
                </div>
                <p className=" text-base max-[500px]:text-sm font-light text-white-60 text-justify ">
                  Kondicijska vožnja je program dodatne obuke za vozače koji
                  žele osvježiti svoje vozačke vještine i steći dodatno
                  samopouzdanje na cesti. Ova vrsta vožnje idealna je za one
                  koji dugo nisu vozili, kao i za vozače koji žele unaprijediti
                  svoje sposobnosti u određenim uvjetima, poput vožnje po
                  autoputu, noćne vožnje ili vožnje u gradskoj gužvi. Pružamo
                  individualizirane lekcije prilagođene specifičnim potrebama
                  svakog vozača, osiguravajući tako sigurniju i sigurniju
                  vožnju.
                </p>
              </motion.div>
            </div>
          </div>
          <div className="relative bg-service-3 bg-cover bg-no-repeat bg-center w-full h-lvh max-xl:h-1/3">
            <div className="w-full h-lvh flex flex-col justify-center items-center bg-[#000]/80">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
                className="flex flex-col w-[350px] max-xl:w-[600px] max-[620px]:w-auto max-[620px]:px-4 gap-[18px] absolute top-1/3  "
              >
                <div className="self-start flex gap-2">
                  <div className="w-1 h-8 bg-red-71 mb-[5px] "></div>
                  <p className="text-2xl max-[500px]:text-xl text-white-60 font-semibold">
                    VOŽNJA U SPLIT
                  </p>
                </div>
                <p className=" text-base max-[500px]:text-sm font-light text-white-60 text-justify ">
                  Nudimo vožnju u gradu Splitu i vožnje po autocesti. Ova obuka
                  je dizajnirana kako bi pomogla vozačima da steknu dodatno
                  iskustvo i sigurnost u vožnji kroz gradske gužve i na brzim
                  cestama. Naši iskusni instruktori pružaju individualizirane
                  lekcije prilagođene vašim potrebama, omogućujući vam da s
                  lakoćom savladate specifične izazove vožnje u Splitu i na
                  autocesti.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        <TestimonialsSection />
      </div>
    </div>
  );
}
