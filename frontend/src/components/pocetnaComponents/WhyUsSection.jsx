import Section from "../Section";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WhyUsSection() {
  const items = [
    {
      link: "/icons/belt.svg",
      name: "SIGURNOST",
      text: "Naši instruktori posvećeni su sigurnosti svakog učenika, koristeći najnovije metode i tehnologije za sigurno upravljanje vozilom.",
    },
    {
      link: "/icons/creative-head.svg",
      name: "ISKUSNI INSTRUKTORI",
      text: "Naš tim instruktora ima dugogodišnje iskustvo u obuci vozača i posjeduje sve potrebne certifikate kako bi vam pružili najbolje obrazovanje.",
    },
    {
      link: "/icons/man_profile.svg",
      name: "INDIVIDUALAN PRISTUP",
      text: "Svakom učeniku pristupamo individualno, prilagođavajući metode obuke njihovim specifičnim potrebama i tempom učenja, kako bismo osigurali najbolje rezultate.",
    },
    {
      link: "/icons/cash.svg",
      name: "PLAĆANJE NA RATE",
      text: "Nudimo mogućnost plaćanja u više rata, kako biste mogli lakše upravljati svojim financijama dok stječete vozačku dozvolu.",
    },
    {
      link: "/icons/car.svg",
      name: "ŠIROK IZBOR\nKATEGORIJA",
      text: "Obučavamo za sve kategorije vozačkih dozvola (A, B, C, E), omogućujući vam da vozite sve vrste vozila. saznaj više...",
    },
    {
      link: "/icons/graph.svg",
      name: "VISOKA PROLAZNOST",
      text: "Ponosimo se visokim postotkom prolaznosti naših učenika na vozačkim ispitima, što je rezultat kvalitetne obuke i posvećenosti naših instruktora.",
    },
    {
      link: "/icons/shield.svg",
      name: "POUZDANA VOZILA",
      text: "Naša autoškola posjeduje moderna vozila koja su redovito servisirana i opremljena najnovijom tehnologijom za vašu sigurnost i udobnost.",
    },
    {
      link: "/icons/calendar_date.svg",
      name: "FLEKSIBILNI TERMINI",
      text: "Nudimo fleksibilne termine obuke koji se mogu prilagoditi vašim obavezama, omogućujući vam da uskladite vožnju s poslom, školom ili drugim aktivnostima.",
    },
  ];

  return (
    <section className="flex flex-col gap-20  p-10 pb-28 bg-gray-51">
      <Section number={"02"} text={"ZAŠTO IZABRATI NAS"} />
      <div className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-y-12 gap-x gap-x-12 justify-items-center items-center text-gray-50 p-10 ">
        {items.map((item, index) => (
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: index * 0.2 }}
            viewport={{ once: true }}
            key={index}
            className="flex flex-col gap-2 max-xl:w-[300px] max-sm:w-[250px] "
          >
            <div className="flex gap-1 items-end">
              <Image
                src={item.link}
                alt="icons"
                width={55}
                height={55}
                className="leading-none max-xl:w-12 max-md:h-12 "
              />
              <p className="text-[22px] max-xl:text-lg text-red-71 leading-none text-start ">
                {item.name}
              </p>
            </div>
            <p className="text-base font-extralight text-justify leading-tight  ">
              {item.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
