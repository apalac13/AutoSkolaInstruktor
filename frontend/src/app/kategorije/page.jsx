"use client";
import Category from "@/components/kategorijeComponents/Category";
import Navigacija from "@/components/Navigacija";
import Section from "@/components/Section";
import Step from "@/components/kategorijeComponents/Step";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Kategorije() {
  const categories = [
    {
      image: "A-kat.jpg",
      imageText: "A KATEGORIJA",
      category: "A",
      type: "Motocikli sa ili bez bočne prikolice te motorna vozila na tri kotača (od 15kW)",
      conditions:
        "23 godine i 6 mjeseci života (21 godinu za vozilo na tri kotača) ili 20 godina uz posjedovanje vozačke dozvole A2 kategorije najmanje 2 godine ",
    },
    {
      image: "A-kat.jpg",
      imageText: "A1 KATEGORIJA",
      category: "A1",
      type: "Motocikli sa ili bez bočne prikolice te motorna vozila na tri kotača (od 15kW)",
      conditions:
        "23 godine i 6 mjeseci života (21 godinu za vozilo na tri kotača) ili 20 godina uz posjedovanje vozačke dozvole A2 kategorije najmanje 2 godine ",
    },
    {
      image: "B-kat.jpg",
      imageText: "B KATEGORIJA",
      category: "B",
      type: "Motocikli sa ili bez bočne prikolice te motorna vozila na tri kotača (od 15kW)",
      conditions:
        "23 godine i 6 mjeseci života (21 godinu za vozilo na tri kotača) ili 20 godina uz posjedovanje vozačke dozvole A2 kategorije najmanje 2 godine ",
    },
    {
      image: "BE-kat.jpg",
      imageText: "BE KATEGORIJA",
      category: "BE",
      type: "Motocikli sa ili bez bočne prikolice te motorna vozila na tri kotača (od 15kW)",
      conditions:
        "23 godine i 6 mjeseci života (21 godinu za vozilo na tri kotača) ili 20 godina uz posjedovanje vozačke dozvole A2 kategorije najmanje 2 godine ",
    },
    {
      image: "C-kat.jpg",
      imageText: "C1 KATEGORIJA",
      category: "C1",
      type: "Motocikli sa ili bez bočne prikolice te motorna vozila na tri kotača (od 15kW)",
      conditions:
        "23 godine i 6 mjeseci života (21 godinu za vozilo na tri kotača) ili 20 godina uz posjedovanje vozačke dozvole A2 kategorije najmanje 2 godine ",
    },
    {
      image: "C-kat.jpg",
      imageText: "C1E KATEGORIJA",
      category: "C1E",
      type: "Motocikli sa ili bez bočne prikolice te motorna vozila na tri kotača (od 15kW)",
      conditions:
        "23 godine i 6 mjeseci života (21 godinu za vozilo na tri kotača) ili 20 godina uz posjedovanje vozačke dozvole A2 kategorije najmanje 2 godine ",
    },
    {
      image: "C-kat.jpg",
      imageText: "C KATEGORIJA",
      category: "C",
      type: "Motocikli sa ili bez bočne prikolice te motorna vozila na tri kotača (od 15kW)",
      conditions:
        "23 godine i 6 mjeseci života (21 godinu za vozilo na tri kotača) ili 20 godina uz posjedovanje vozačke dozvole A2 kategorije najmanje 2 godine ",
    },
    {
      image: "C-kat.jpg",
      imageText: "CE KATEGORIJA",
      category: "CE",
      type: "Motocikli sa ili bez bočne prikolice te motorna vozila na tri kotača (od 15kW)",
      conditions:
        "23 godine i 6 mjeseci života (21 godinu za vozilo na tri kotača) ili 20 godina uz posjedovanje vozačke dozvole A2 kategorije najmanje 2 godine ",
    },
  ];

  const drivingLicenceSteps = [
    {
      icon: "/icons/stethoscope.svg",
      number: "1. KORAK",
      title: "OBAVITI LJEČNIČKI PREGLED",
      description:
        "Prvi korak je posjetiti liječnika radi procjene zdravstvenog stanja i utvrđivanja jeste li sposobni za vožnju.",
    },
    {
      icon: "/icons/school.svg",
      number: "2. KORAK",
      title: "SLUŠATI PREDAVANJA O PROMETNIM PRAVILIMA I SIGURNOSNIM PROPISIMA",
      description:
        "Prvi korak je posjetiti liječnika radi procjene zdravstvenog stanja i utvrđivanja jeste li sposobni za vožnju.",
    },
    {
      icon: "/icons/health-cross.svg",
      number: "3. KORAK",
      title: "POHAĐATI PREDAVANJA PRVE POMOĆI",
      description:
        "Dio obuke uključuje i tečaj prve pomoći, gdje ćete naučiti osnovne postupke za pružanje pomoći u slučaju prometne nesreće ili hitne situacije. Ove vještine mogu biti ključne u kritičnim situacijama, a poznavanje prve pomoći zakon je i obaveza svakog vozača.",
    },
    {
      icon: "/icons/exam-check.svg",
      number: "4. KORAK",
      title: "PRIJAVITI I POLOŽITI ISPIT IZ PROPISA I PRVE POMOĆI",
      description:
        "Nakon završetka predavanja, potrebno je prijaviti ispit iz prometnih propisa i prve pomoći. Ovaj ispit sastoji se od teorijskog dijela koji obuhvaća prometne propise i pitanja iz prve pomoći. Polaganjem ovog ispita stječete pravo na početak praktične obuke vožnje.",
    },
    {
      icon: "/icons/car-ds.svg",
      number: "5. KORAK",
      title: "POHAĐATI SATE VOŽNJE, PRIJAVITI I POLOŽITI ISPIT",
      description:
        "Kada ste položili ispit iz propisa i prve pomoći, krećete s vozačkim satima uz instruktora. Tijekom vožnje instruktor će vas obučavati kako upravljati vozilom, pravilno se ponašati u različitim situacijama u prometu i savladati manevarske vještine. Kad prikupite potreban broj sati i instruktor procijeni da ste spremni, prijavit ćete se za završni vozački ispit.",
    },
  ];

  return (
    <div className="mb-24">
      <div className=" bg-category-title bg-cover bg-no-repeat bg-center w-lvh h-[500px]   ">
        <div className="flex flex-col w-lvh h-[500px] bg-[#000]/80 ">
          <Navigacija />
          <motion.p
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
            className="justify-self-center self-center absolute top-[35%] text-4xl max-md:text-3xl font-bold italic  text-white-60"
          >
            KATEGORIJE
          </motion.p>
        </div>
      </div>
      <section className="p-10 bg-gray-51">
        <Section number={"01"} text={"KATEGORIJE"} />
        <div className="grid grid-cols-3 max-[900px]:grid-cols-2 max-sm:grid-cols-1 gap-x-4 gap-y-[74px] justify-items-center p-10">
          {categories.map((category, index) => (
            <Category key={index} category={category} />
          ))}
        </div>
      </section>
      <section className="p-10 ">
        <Section number={"02"} text={"KAKO DO VOZAČKE"} />
        <motion.div
          initial={{ opacity: 0.5, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 3 }}
          viewport={{ once: true }}
          className="flex flex-col items-center max-[500px]:items-start justify-center py-10"
        >
          <div className="relative h-[1650px] max-[500px]:w-full max-[500px]:h-[2000px]">
            <div className="absolute z-10 translate-x-[-196px] max-[500px]:translate-x-[46px]  translate-y-2 w-[2px] h-full bg-gray-50"></div>
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 6 }}
              className="absolute z-20 translate-x-[-196px] max-[500px]:translate-x-[46px] translate-y-2 w-[2px] h-full bg-red-71"
            ></motion.div>
            <div className="absolute z-30 flex flex-col gap-28 items-center max-[500px]:items-start justify-center w-full">
              {drivingLicenceSteps.map((step, index) => (
                <Step key={index} step={step} />
              ))}
              <div className="absolute z-30 bg-white-60 translate-x-[-100px] max-[500px]:translate-x-[0px] translate-y-[900px] max-[500px]:translate-y-[1120px]  flex items-center w-[300px] h-[100px]">
                <Image
                  src={"/icons/driving-licence.svg"}
                  alt="driving licence"
                  width={120}
                  height={120}
                />
                <div className="flex flex-col items-start">
                  <p className="text-base max-xl:text-sm text-red-71">
                    6. KORAK
                  </p>
                  <p className="text-xl font-semibold text-black-40 text-start leading-tight">
                    VAŠA VOZAČKA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
