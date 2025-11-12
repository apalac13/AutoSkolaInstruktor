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
        <div className="flex flex-col w-lvh h-[500px] bg-[#000]/50 ">
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
                Osposobljavanju za vozača motornih vozila može pristupiti osoba
                koja ima minimalnu dob za kategorije A, B, C1 i C1E 18 godina, a
                za kategorije C i CE 21. godinu. Koja je je zdravstveno sposobna
                za rješavanje ispitnih testova i upravljanje vozilom
                odgovarajuće kategorije ili potkategorije, a što se dokazuje
                ljekarskim uvjerenjem koje ne smije biti starije od godinu dana.
                Ima bosanskohercegovačko državljanstvo, prijavljeno prebivalište
                ili boravak u Bosni i Hercegovini, kao i strani državljanin koji
                u Bosni i Hercegovini ima odobren stalni ili privremeni boravak
                na period ne kraći od šest mjeseci. Ispunjava i druge uslove
                propisane za određenu kategoriju ili potkategoriju. 🚗
              </p>
            </div>
          </div>
          <Form />
        </div>
      </motion.section>
    </div>
  );
}
