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
      image: "motor3.jpg",
      imageText: "A KATEGORIJA",
      category: "A",
      type: "Motocikl, čija zapremina motora premašuje 125 cm3, a snage iznad 11 kW, a najviše 25 kW, koji je sposoban da razvije brzinu od najmanje 100 km/h.",
      conditions: "18 godina",
    },

    {
      image: "golf-1.jpg",
      imageText: "B KATEGORIJA",
      category: "B",
      type: "Putnička motorna vozila, sa ručnim ili automatskim mjenjačem i koja imaju: najveću dozvoljenu masu manje od 3500 kg, više od tri, a manje od devet sjedišta, više od troja vrata, sposobnost razviti brzinu od najmanje 100 km/h.",
      conditions: "18 godina",
    },

    {
      image: "kamion8.jpg",
      imageText: "C1 KATEGORIJA",
      category: "C1",
      type: "Motorna vozila za prevoz tereta, čija je najveća dozvoljena masa veća od 4000 kg, a manja od 7500 kg, sposobna da razviju brzinu od najmanje 80 km/h.",
      conditions: "18 godina",
    },
    {
      image: "kamion8.jpg",
      imageText: "C1E KATEGORIJA",
      category: "C1E",
      type: "Skup vozila dug najmanje 8 m i sposoban da razvije brzinu od najmanje 80 km/h, čija se vučna vozila ubrajaju u potkategoriju C1, a priključna vozila imaju najveću dozvoljenu masu veću od 2000 kg, s tim da najveća dozvoljena masa skupa vozila ne prelazi 12 000 kg, i da najveća dozvoljena masa priključnog vozila ne prelazi masu neopterećenog vučnog vozila.",
      conditions: "18 godina",
    },
    {
      image: "kamion8.jpg",
      imageText: "C KATEGORIJA",
      category: "C",
      type: "Motorna vozila za prevoz tereta, čija je najveća dozvoljena masa veća od 7500 kg.",
      conditions: "21 godina",
    },
    {
      image: "kamion8.jpg",
      imageText: "CE KATEGORIJA",
      category: "CE",
      type: "Skupovi vozila čija se vučna vozila ubrajaju u kategoriju C, a priključna vozila imaju najveću dozvoljenu masu veću od 750 kg, a nosivost minimalno 2500 kg, i koje ima zatvoreni tovarni sanduk (stalna nadgradnja ili cerada) čija je širina najmanje ista kao širina kabine vozila i pri čemu je najviša točka tovarnog sanduka najmanje na istoj visini kao najviša točka kabine motornog vozila,",
      conditions: "21 godina",
    },
  ];

  const drivingLicenceSteps = [
    {
      icon: "/icons/stethoscope.svg",
      number: "1. KORAK",
      title: "OBAVITI LJEČNIČKI PREGLED",
      description:
        "Prvi korak je liječnički pregled kandidata za vozača. Obavlja se u ovlaštenim zdravstvenim ustanovama (dom zdravlja ili specijalizirane ordinacije). Nakon pregleda, dobivate uvjerenje o zdravstvenoj sposobnosti koje vrijedi 12 mjeseci.",
    },
    {
      icon: "/icons/school.svg",
      number: "2. KORAK",
      title: "SLUŠATI PREDAVANJA O PROMETNIM PRAVILIMA I SIGURNOSNIM PROPISIMA",
      description:
        "Nakon što predate liječničko uvjerenje, autoškola vas upisuje u teorijsku nastavu (propisi). Ova nastava obuhvaća: prometne znakove, pravila u vožnji, sigurnosne propise, ponašanje u prometu i odgovornost vozača.",
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
      <div className=" bg-category-title bg-cover bg-no-repeat bg-bottom w-lvh h-[500px]   ">
        <div className="flex flex-col w-lvh h-[500px] bg-[#000]/40 ">
          <Navigacija />
          <motion.p
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
            className="justify-self-center self-center absolute top-1/3 text-4xl max-md:text-3xl font-bold italic  text-white-60"
          >
            KATEGORIJE
          </motion.p>
        </div>
      </div>
      <section className="p-10 max-lg:px-4 bg-gray-51">
        <Section number={"01"} text={"KATEGORIJE"} />
        <div className="grid grid-cols-3 max-[900px]:grid-cols-2 max-sm:grid-cols-1 gap-x-8 gap-y-16 justify-items-center p-10 max-lg:px-4">
          {categories.map((category, index) => (
            <Category key={index} category={category} />
          ))}
        </div>
      </section>
      <section className="p-10 max-lg:px-4 ">
        <Section number={"02"} text={"KAKO DO VOZAČKE"} />
        <motion.div
          initial={{ opacity: 0.5, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 3 }}
          viewport={{ once: true }}
          className="flex flex-col items-center max-sm:items-start justify-center py-10"
        >
          <div className="relative h-[1650px] max-sm:w-full max-sm:h-[2000px] max-[350px]:h-[2200px] ">
            <div className="absolute z-10 translate-x-[-196px] max-sm:translate-x-[40px]  translate-y-2 w-[2px] h-full bg-gray-50"></div>
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 6 }}
              className="absolute z-20 translate-x-[-196px] max-sm:translate-x-[40px] translate-y-2 w-[2px] h-full bg-red-71"
            ></motion.div>
            <div className="absolute z-30 flex flex-col gap-28 items-center max-sm:items-start justify-center w-full ">
              {drivingLicenceSteps.map((step, index) => (
                <Step key={index} step={step} />
              ))}
              <div className="absolute z-30 bg-white-60 translate-x-[-100px] max-sm:translate-x-[0px] translate-y-[900px] max-sm:translate-y-[1120px]  flex items-center w-[300px] h-[100px]">
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
                  <p className="text-xl font-semibold text-black-40 text-start leading-tight max-sm:leading-none">
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
