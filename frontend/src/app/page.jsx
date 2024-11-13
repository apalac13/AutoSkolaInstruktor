"use client";
import Navigacija from "@/components/Navigacija";
import Section from "@/components/Section";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default function Pocetna() {
  const statisticsItems = [
    { stats: "34+", item: "Godina iskustva" },
    { stats: "4000+", item: "Položenih vozački" },
    { stats: "100%", item: "Zadovoljnih kandidata" },
  ];

  const items = [
    {
      link: "/icons/belt.svg",
      name: "SIGURNOST",
      text: "Naši instruktori posvećeni su sigurnosti svakog učenika, koristeći najnovije metode i tehnologije za sigurno upravljanje vozilom.",
    },
    {
      link: "/icons/knowledge_learning.svg",
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

  const testimonials = [
    {
      text: '"Autoškola Instruktor je odlična! Instruktori su izuzetno strpljivi i profesionalni, a obuka je temeljita i prilagođena svakom učeniku. Vozila su moderna i dobro održavana, što dodatno ulijeva povjerenje. Posebno mi se svidjela fleksibilnost u terminima i mogućnost plaćanja na rate. Preporučujem svima koji žele kvalitetnu i sigurnu obuku."',
      person: "Luka Lukić",
    },
    {
      text: '"Autoškola Instruktor je odlična! Instruktori su izuzetno strpljivi i profesionalni, a obuka je temeljita i prilagođena svakom učeniku. Vozila su moderna i dobro održavana, što dodatno ulijeva povjerenje. Posebno mi se svidjela fleksibilnost u terminima i mogućnost plaćanja na rate. Preporučujem svima koji žele kvalitetnu i sigurnu obuku."',
      person: "Mara Marić",
    },
    {
      text: '"Autoškola Instruktor je odlična! Instruktori su izuzetno strpljivi i profesionalni, a obuka je temeljita i prilagođena svakom učeniku. Vozila su moderna i dobro održavana, što dodatno ulijeva povjerenje. Posebno mi se svidjela fleksibilnost u terminima i mogućnost plaćanja na rate. Preporučujem svima koji žele kvalitetnu i sigurnu obuku."',
      person: "Jure Jurić",
    },
    {
      text: '"Autoškola Instruktor je odlična! Instruktori su izuzetno strpljivi i profesionalni, a obuka je temeljita i prilagođena svakom učeniku. Vozila su moderna i dobro održavana, što dodatno ulijeva povjerenje. Posebno mi se svidjela fleksibilnost u terminima i mogućnost plaćanja na rate. Preporučujem svima koji žele kvalitetnu i sigurnu obuku."',
      person: "Irena Irenić",
    },
  ];

  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: true,
        },
      },
    ],
  };

  return (
    <div>
      <div className="bg-home-page bg-cover bg-no-repeat bg-center w-lvh h-lvh  ">
        <div className="flex flex-col  w-lvh h-lvh bg-[#000]/80 ">
          <Navigacija />
          <div className="absolute top-1/3 left-[28%] flex flex-col items-center gap-4 ">
            <div>
              <p className=" text-[64px] font-bold italic text-white-60  ">
                AUTOŠKOLA INSTRUKTOR
              </p>
              <p className="text-[32px] text-red-71">
                Najsigurniji put do vozačke!
              </p>
            </div>
            <div className="flex gap-16">
              <button className="w-[164px] h-16 border-red-71 bg-red-71 hover:bg-red-71/70  ">
                <p className="text-base text-white-60 font-light ">
                  PRIJAVI SE
                </p>
              </button>
              <button className="w-[164px] h-16 border-black-40 bg-black-40 hover:bg-black-40/70 ">
                <p className="text-base text-white-60 font-light ">KONTAKT</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <section className="flex flex-col gap-20 h-[450px] p-10 ">
        <Section number={"01"} text={"STATISTIKA"} />
        <div className="w-full flex  justify-between items-center">
          <div>
            <p className="text-base text-start text-red-71">UKRATKO</p>
            <div className="flex flex-col  text-5xl font-semibold  text-black-40 text-start leading-tighter  ">
              <p className="">AUTOŠKOLA</p>
              <p className="">INSTRUKTOR</p>
            </div>
          </div>
          {statisticsItems.map((statsItem, index) => (
            <div key={index} className="flex flex-col text-black-40">
              <p className="text-[76px] font-extralight leading-tight">
                {statsItem.stats}
              </p>
              <div className=" w-[300px] h-[1px] bg-red-71 mb-[5px] "></div>
              <p className="text-[22px] font-light">{statsItem.item}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-20 h-[650px] p-10 bg-gray-51">
        <Section number={"02"} text={"ZAŠTO IZABRATI NAS"} />
        <div className="grid grid-cols-4 gap-y-14 gap-x gap-x-12 text-white-60 p-10 ">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex gap-1 items-end">
                <Image
                  src={item.link}
                  alt="belt icon"
                  width={55}
                  height={55}
                  className="leading-none"
                />
                <p className="text-[22px] text-red-71 leading-none">
                  {item.name}
                </p>
              </div>
              <p className=" text-base font-extralight text-start leading-tight  ">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-20 p-10 h-[515px]">
        <Section number={"03"} text={"VLASNIK"} />
        <div className="self-center gap-12 flex flex-col  items-center ">
          <div className="grid grid-rows-3   ">
            <Image
              src={"/icons/mark_quote.svg"}
              alt="mark quote icon"
              width={36}
              height={25}
              className=" justify-self-start  "
            />
            <blockquote className="text-xl text-black-40 italic px-7 ">
              Naša autoškola nije samo mjesto za polaganje vozačkog ispita, već
              i za sticanje trajnih znanja i vještina koje će svaki vozač
              koristiti cijeli život.
            </blockquote>
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
            <div className="flex flex-col items-start gap-1  text-black-40">
              <p className=" text-sm leading-none">Instruktor</p>
              <p className=" text-xl leading-none">Jure Bradarić</p>
            </div>
          </div>
          <p className=" self-start text-base text-red-71 underline">
            SAZNAJTE VIŠE O NAMA
          </p>
        </div>
      </section>
      <section className="flex ">
        <div className="bg-service-1 bg-cover bg-no-repeat bg-center w-full h-lvh">
          <div className="w-full h-lvh flex flex-col gap-[150px] items-center bg-[#000]/80">
            <span className="self-start justify-self-start p-10">
              <Section number={"04"} text={"POSEBNE USLUGE"} />
            </span>
            <div className=" flex flex-col w-[350px] gap-[18px]  ">
              <div className="self-start flex gap-2">
                <div className="w-1 h-8 bg-red-71 mb-[5px] "></div>
                <p className="text-2xl text-white-60 font-semibold">
                  OBUKA SVIH KATEGORIJA
                </p>
              </div>
              <p className=" text-base font-light text-white-60 text-start ">
                Autoskola "Instruktor" se ističe svojom ponudom sveobuhvatne
                obuke za sve kategorije vozačkih dozvola. Ova usluga je ključna
                za sve polaznike koji žele da steknu vozačku dozvolu za
                različite tipove vozila. Bilo da se radi o motociklima,
                putničkim vozilima, teretnim vozilima ili autobusima, Autoskola
                "Instruktor" pruža kompletnu edukaciju prilagođenu specifičnim
                potrebama svake kategorije.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-service-2 bg-cover bg-no-repeat bg-center w-full h-lvh">
          <div className="w-full h-lvh flex flex-col justify-center items-center bg-[#000]/80">
            <div className="flex flex-col w-[350px] gap-[18px]  ">
              <div className="self-start flex gap-2">
                <div className="w-1 h-8 bg-red-71 mb-[5px] "></div>
                <p className="text-2xl text-white-60 font-semibold">
                  KONDICIJSKA VOŽNJA
                </p>
              </div>
              <p className=" text-base font-light text-white-60 text-start ">
                Kondicijska vožnja je program dodatne obuke za vozače koji žele
                osvježiti svoje vozačke vještine i steći dodatno samopouzdanje
                na cesti. Ova vrsta vožnje idealna je za one koji dugo nisu
                vozili, kao i za vozače koji žele unaprijediti svoje sposobnosti
                u određenim uvjetima, poput vožnje po autoputu, noćne vožnje ili
                vožnje u gradskoj gužvi. Pružamo individualizirane lekcije
                prilagođene specifičnim potrebama svakog vozača, osiguravajući
                tako sigurniju i sigurniju vožnju.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-service-3 bg-cover bg-no-repeat bg-center w-full h-lvh">
          <div className="w-full h-lvh flex flex-col justify-center items-center bg-[#000]/80">
            <div className="flex flex-col w-[350px] gap-[18px]  ">
              <div className="self-start flex gap-2">
                <div className="w-1 h-8 bg-red-71 mb-[5px] "></div>
                <p className="text-2xl text-white-60 font-semibold">
                  VOŽNJA U SPLIT
                </p>
              </div>
              <p className=" text-base font-light text-white-60 text-start ">
                Nudimo vožnju u gradu Splitu i vožnje po autocesti. Ova obuka je
                dizajnirana kako bi pomogla vozačima da steknu dodatno iskustvo
                i sigurnost u vožnji kroz gradske gužve i na brzim cestama. Naši
                iskusni instruktori pružaju individualizirane lekcije
                prilagođene vašim potrebama, omogućujući vam da s lakoćom
                savladate specifične izazove vožnje u Splitu i na autocesti.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-20 p-10 ">
        <Section number={"05"} text={"KANDIDATI O NAMA"} />
        <div>
          <Slider {...settings}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full h-full flex flex-col ">
                <div className="flex flex-col gap-5 mb-9">
                  <Image
                    src={"icons/mark_quote.svg"}
                    alt="mark quote icon"
                    width={33}
                    height={25}
                  />
                  <blockquote className="text-base italic text-start">
                    {testimonial.text}
                  </blockquote>
                </div>
                <div className="flex justify-between ">
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <Image
                        key={index}
                        src={"/icons/star.svg"}
                        alt="star icon"
                        width={32}
                        height={32}
                      />
                    ))}
                  </div>
                  <div className="flex items-end leading-none">
                    <Image
                      src={"/icons/user_male.svg"}
                      alt="User male icon"
                      width={42}
                      height={42}
                    />
                    <p>{testimonial.person}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
}
