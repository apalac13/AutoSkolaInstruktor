"use client";
import Navigacija from "@/components/Navigacija";
import Image from "next/image";
import Section from "@/components/Section";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Category from "@/components/oNamaComponents/Category";
import { motion } from "framer-motion";

export default function ONama() {
  const settings = {
    dots: false,
    arrows: false,
    fade: true,
    speed: 3500,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3500,
    pauseOnHover: false,
  };
  const settingsGallery = {
    dots: true,
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: true,
        },
      },
    ],
  };

  const firstImages = [
    "/bmw-golf2.jpg",
    "/kamion5.jpg",
    "/ured1.jpg",
    "/bmw2.jpg",
    "/audi1.jpeg",
    "/golfkandidat6.jpg",
    "/bmwkandidat3.jpg",
    "/kamion5.jpg",
    "/golfkandidatinstruktor1.jpg",
    "/kandidati3.jpg",
    "/bmwnight.jpg",
    "/golfkandidat5.jpg",
    "/motor2.jpg",
  ];

  const secondImages = [
    "/luka.jpg",
    "/lukavozila.jpg",
    "/golf3bocno.jpg",
    "/kandidatkamion.jpg",
    "/postavljanjetable.jpg",
    "/golf3zadnja.jpeg",
    "/lukakandidati.jpg",
    "/golf3prednja.jpeg",
  ];

  const gallery = [
    "/jurevoznja.jpeg",
    "/bmw-golf2.jpg",
    "/golfkandidat6.jpg",
    "/bmwnovi2.jpg",
    "/bmwkandidat5.jpg",
    "/lukakandidati3.jpg",
    "/bmw2.jpg",
    "/bmwkandidat2.jpg",
    "/motor1.jpg",
    "/golfkandidati-1.jpeg",
    "/golfkandidatinstruktor2.jpg",
    "/bmwkandidat3.jpg",
    "/luka.jpg",
    "/recenzija.jpg",
    "/audi1.jpeg",
    "/kamion5.jpg",
    "/bmwnight.jpg",
    "/kamion1.jpg",
    "/golf3bocno.jpg",
    "/golfkat2.jpeg",
    "/golfkandidatinstruktor1.jpg",
    "/golf3zadnja.jpeg",
    "/kandidati3.jpg",
    "/golfkandidat5.jpg",
    "/motor2.jpg",
    "/lukakandidati.jpg",
    "/golf3prednja.jpeg",
  ];

  const categories = ["A", "B", "C1", "C1E", "C", "CE"];

  return (
    <div className="mb-24">
      <div className=" bg-gradient-to-r from-white-60 to-gray-52 w-lvh h-[500px]  border-b border-black-40   ">
        <div className="flex flex-col w-lvh h-[500px] ">
          <Navigacija />
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
            className=" absolute top-1/4 justify-self-center self-center"
          >
            <Image
              src={"icons/logo-horizontal.svg"}
              alt="asi-logo-horizontal"
              width={600}
              height={211}
              style={{ width: "auto", height: "auto" }}
            />
          </motion.div>
        </div>
      </div>
      <section className="w-full flex max-lg:flex-col border-b border-black-40 ">
        <div className="w-1/2 max-lg:w-full flex flex-col gap-20 p-10">
          <Section number={"01"} text={"O NAMA"} />
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5 text-black-40 "
          >
            <h1 className="text-4xl max-lg:text-3xl font-semibold text-start ">
              AUTOŠKOLA INSTRUKTOR
            </h1>
            <p className="text-base  text-justify">
              Autoškola Instruktor je posvećena osposobljavanju vozača za
              sigurno, odgovorno i samopouzdano upravljanje vozilom, s posebnim
              naglaskom na sigurnost, poštovanje prometnih pravila i razvoj
              prometne kulture. Kroz više od 35 godina iskustva, naši stručni i
              iskusni instruktori pružaju visokokvalitetnu i modernu obuku,
              koristeći najnovije metode i tehnologije prilagođene svakom
              polazniku. Nudimo fleksibilne termine i mogućnost plaćanja na rate
              kako bismo maksimalno olakšali pristup našim uslugama. Naša
              moderna vozila i individualan pristup omogućavaju najbolje
              rezultate. U Autoškoli Instruktor učimo vozače da budu odgovorni i
              pažljivi sudionici u prometu, osposobljeni ne samo za polaganje
              ispita, već i za sigurno i samopouzdano upravljanje vozilom kroz
              cijeli život.
            </p>
          </motion.div>
        </div>
        <div className="w-1/2 max-lg:w-full max-lg:mt-0 ">
          <div className="h-[590px] max-lg:h-[400px]">
            <Slider {...settings}>
              {firstImages.map((image, index) => (
                <div
                  key={index}
                  className="w-full h-[590px] max-lg:h-[400px] cursor-pointer   "
                >
                  <div className="w-full h-full relative">
                    <Image
                      src={image}
                      alt="Slider image"
                      fill
                      style={{ objectFit: "cover", filter: "brightness(60%)" }}
                      quality={100}
                      priority
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
      <section className="w-full flex  max-lg:flex-col-reverse ">
        <div className="w-1/2 max-lg:w-full max-md:mt-0">
          <div className="h-[590px] max-lg:h-[400px]">
            <Slider {...settings}>
              {secondImages.map((image, index) => (
                <div
                  key={index}
                  className="w-full h-[590px] max-lg:h-[400px] cursor-pointer   "
                >
                  <div className="w-full h-full relative">
                    <Image
                      src={image}
                      alt="Slider image"
                      fill
                      style={{ objectFit: "cover", filter: "brightness(60%)" }}
                      quality={100}
                      priority
                    />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-1/2 max-lg:w-full flex flex-col gap-20 p-10 bg-red-72">
          <Section number={"02"} text={"POVIJEST"} />
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-5 text-white-60 "
          >
            <h1 className="text-4xl max-lg:text-3xl font-semibold text-start ">
              1990. - DANAS
            </h1>
            <p className="text-base text-justify">
              Autoškola je osnovana 1990. godine od strane Luke Bradarića, koji
              je bio prvi vlasnik i vizionar iza ove obrazovne ustanove. Pod
              nazivom Autoškola Luka, Luka je svojim entuzijazmom i predanošću
              postavio temelje škole, fokusirajući se na kvalitetnu obuku vozača
              i sigurnost u prometu. Njegova vizija bila je osposobiti vozače ne
              samo za polaganje vozačkog ispita, već i za sigurno i odgovorno
              sudjelovanje u prometu. Sve do 2020. godine autoškola je nosila
              ime Autoškola Luka, kada je preimenovana u Autoškola Instruktor i
              preuzeta od strane Jure Bradarića, Lukinog sina. Jure je nastavio
              očevu misiju s jednakom strašću i posvećenošću, uvodeći moderne
              metode obuke i modernizirajući opremu, osiguravajući da autoškola
              ostane vodeća u pružanju visokokvalitetne vozačke edukacije. Pod
              njegovim vodstvom, autoškola je nastavila rasti i razvijati se,
              pridobivši povjerenje mnogih novih vozača koji su prošli kroz
              njihove programe obuke.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="flex flex-col gap-20 p-10 bg-gray-51">
        <Section number={"03"} text={"KATEGORIJE"} />
        <div className="grid grid-cols-3 max-xl:grid-cols-2 max-[850px]:grid-cols-1  gap-y-3 py-10 justify-center items-center">
          {categories.map((category, index) => (
            <Category key={index} category={category} index={index} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-20 p-10">
        <Section number={"04"} text={"GALERIJA"} />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 2 }}
          className="h-full"
        >
          <Slider {...settingsGallery}>
            {gallery.map((image, index) => (
              <div
                key={index}
                className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"
              >
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-contain px-1"
                  quality={100}
                  priority
                />
              </div>
            ))}
          </Slider>
        </motion.div>
      </section>
    </div>
  );
}
