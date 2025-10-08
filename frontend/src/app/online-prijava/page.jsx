"use client";
import Navigacija from "@/components/Navigacija";
import { useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import Form from "@/components/onlinePrijavaComponents/Form";

export default function OnlinePrijava() {
  const [moreInformation, setMoreInformation] = useState(false);

  return (
    <div>
      <div className=" bg-online-prijava bg-cover bg-no-repeat bg-center w-lvh h-[500px]   ">
        <div className="flex flex-col w-lvh h-[500px] bg-[#000]/60 ">
          <Navigacija />
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-1/3 justify-self-center self-center"
          >
            <p className=" text-4xl max-md:text-3xl font-bold italic  text-white-60">
              ONLINE PRIJAVA
            </p>
            <p className="text-xl max-md:text-lg text-white-60 font-light italic ">
              Ostavite nam podatke, a mi ćemo vam se javiti u najkraćem mogućem
              roku
            </p>
          </motion.div>
        </div>
      </div>
      <motion.section
        initial={{ x: -50 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
        className=" flex justify-center items-center py-14  "
      >
        <div className="flex flex-col items-center justify-center gap-20 px-5">
          <div className="flex flex-col max-[500px]:w-full gap-3 items-center justify-center">
            <div className="flex items-end gap-1 max-sm:w-full">
              <div className="flex flex-nowrap gap-1 text-xl  max-xl:text-lg leading-none">
                <p>UVJETI </p>
                <p>UPISA</p>
              </div>
              <div className="flex items-end justify-end w-[300px] max-[440px]:w-full border-b border-black-40 mb-1 ">
                {moreInformation ? (
                  <p
                    onClick={() => setMoreInformation(!moreInformation)}
                    className="text-base max-xl:text-sm  cursor-pointer "
                  >
                    - SAKRIJ
                  </p>
                ) : (
                  <p
                    onClick={() => setMoreInformation(!moreInformation)}
                    className="text-base max-xl:text-sm cursor-pointer"
                  >
                    + VIŠE INFORMACIJA
                  </p>
                )}
              </div>
            </div>
            <div
              className={clsx(
                "w-[420px] max-[500px]:w-full text-start overflow-hidden transition-all duration-1000 ease-in-out",
                {
                  "max-h-[1000px] opacity-100": moreInformation,
                  "max-h-0 opacity-0": !moreInformation,
                }
              )}
            >
              <p className="text-justify max-xl:text-sm">
                Minimalna dob Za kategoriju A1, AM, i B: Najmanje 17,5 godina
                (polaganje vozačkog ispita moguće s navršenih 18 godina). Za
                kategoriju A: Najmanje 23 godine (ili 20 godina uz posjedovanje
                A2 kategorije najmanje 2 godine). Za ostale kategorije (C, D,
                E): Ovisi o kategoriji i prethodnom iskustvu. Zdravstveni uvjeti
                Obavezno obavljanje liječničkog pregleda u ovlaštenoj medicini
                rada radi utvrđivanja psihofizičkih sposobnosti za upravljanje
                vozilom. Dokumentacija Osobna iskaznica ili putovnica. Potvrda o
                prebivalištu (ako je potrebno). Fotokopija liječničkog
                uvjerenja. Ako je maloljetna osoba, suglasnost roditelja ili
                skrbnika. Edukacija i ispit Pohađanje teoretske i praktične
                nastave. Polaganje ispita iz prometnih propisa i sigurnosnih
                pravila (PPSP). Polaganje ispita iz vožnje nakon završene
                praktične obuke. Plaćanje troškova Uplata za teoretsku i
                praktičnu obuku, liječnički pregled te ispite. Mogućnost
                plaćanja u ratama (ovisno o autoškoli). Druge napomene Kandidati
                koji žele polagati profesionalne kategorije (C, D, E) moraju
                imati određeno iskustvo s vozačkom dozvolom B kategorije. Strani
                državljani moraju dokazati boravište u državi u kojoj polažu
                vozački ispit. Ako imaš dodatnih pitanja ili želiš prilagoditi
                uvjete specifično za tvoju autoškolu, javi se! 🚗
              </p>
            </div>
          </div>
          <Form />
        </div>
      </motion.section>
    </div>
  );
}
