"use client";
import Navigacija from "@/components/Navigacija";
import Image from "next/image";
import Section from "@/components/Section";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Category from "@/components/aboutUsComponents/Category";
import { motion } from "framer-motion";

export default function ONama() {
  const settings = {
    dots: false,
    arrows: false,
    fade: true,
    speed: 5000,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 5000,
  };
  const settingsGallery = {
    dots: false,
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
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

  const firstImages = [
    "/driving.jpg",
    "/teaching.jpg",
    "/bmw1.jpg",
    "/car_drive.jpg",
    "/golf7.jpg",
    "/mirror.jpg",
  ];
  const secondImages = [
    "/man_with_car.jpg",
    "/old_teaching.jpg",
    "/old_drive.jpg",
    "/couple_car.jpg",
    "/scooter.jpg",
  ];

  const gallery = [
    "/driving.jpg",
    "/teaching.jpg",
    "/bmw1.jpg",
    "/car_drive.jpg",
    "/golf7.jpg",
    "/mirror.jpg",
    "/man_with_car.jpg",
    "/old_teaching.jpg",
    "/old_drive.jpg",
    "/couple_car.jpg",
    "/scooter.jpg",
  ];

  const categories = ["A", "A1", "B", "BE", "C1", "C1E", "C", "CE"];

  return (
    <div className="mb-24">
      <div className=" bg-gradient-to-r  from-white-60 to-gray-52 w-lvh h-[500px]  border-b border-black-40   ">
        <div className="flex flex-col w-lvh h-[500px] ">
          <Navigacija />
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
            className=" absolute top-[25%] justify-self-center self-center"
          >
            <Image
              src={"icons/logo-horizontal.svg"}
              alt="asi logo horizontal"
              width={800}
              height={211}
            />
          </motion.div>
        </div>
      </div>
      <section className="w-full flex border-b border-black-40 ">
        <div className="w-1/2 flex flex-col gap-20 p-10">
          <Section number={"01"} text={"O NAMA"} />
          <div className="flex flex-col gap-5 text-black-40 ">
            <h1 className="text-4xl font-semibold text-start ">
              AUTOŠKOLA INSTRUKTOR
            </h1>
            <p className="text-base text-justify">
              Autoškola Instruktor je posvećena osposobljavanju vozača za
              sigurno, odgovorno i samopouzdano upravljanje vozilom, s naglaskom
              na sigurnost i poštovanje prometnih pravila. Kroz 34 godine
              iskustva, naši stručni i iskusni instruktori pružaju
              visokokvalitetnu obuku koristeći najnovije metode i tehnologije.
              Nudimo fleksibilne termine i mogućnost plaćanja na rate kako bismo
              prilagodili naše usluge vašim potrebama. Naša moderna vozila i
              individualan pristup osiguravaju najbolje rezultate, što se ogleda
              u visokom postotku prolaznosti na ispitima. U Autoškoli Instruktor
              učimo vozače da budu odgovorni sudionici u prometu, opremljeni
              trajnim znanjima i vještinama za cijeli život.
            </p>
          </div>
        </div>
        <div className="w-1/2 mt-10 md:mt-0 ">
          <Slider {...settings}>
            {firstImages.map((image, index) => (
              <div key={index} className="w-full h-[590px] cursor-pointer   ">
                <Image
                  src={image}
                  alt="Slider image"
                  fill
                  style={{ objectFit: "cover", filter: "brightness(60%)" }}
                  quality={100}
                  priority
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>
      <section className="w-full flex ">
        <div className="w-1/2 mt-10 md:mt-0">
          <Slider {...settings}>
            {secondImages.map((image, index) => (
              <div key={index} className="w-full h-[590px]   cursor-pointer   ">
                <Image
                  src={image}
                  alt="Slider image"
                  fill
                  style={{ objectFit: "cover", filter: "brightness(70%)" }}
                  quality={100}
                  priority
                />
              </div>
            ))}
          </Slider>
        </div>
        <div className="w-1/2 flex flex-col gap-20 p-10 bg-red-72">
          <Section number={"02"} text={"POVIJEST"} />
          <div className="flex flex-col gap-5 text-white-60 ">
            <h1 className="text-4xl font-semibold text-start ">
              1990. - DANAS
            </h1>
            <p className="text-base text-justify">
              Autoškola Instruktor osnovana je 1990. godine od strane Luke
              Bradarića, koji je bio prvi vlasnik i vizionar iza ove obrazovne
              ustanove. Luka je svojim entuzijazmom i predanošću postavio
              temelje autoškole, fokusirajući se na kvalitetnu obuku vozača i
              sigurnost u prometu. Njegova vizija bila je osposobiti vozače ne
              samo za polaganje vozačkog ispita, već i za sigurno i odgovorno
              sudjelovanje u prometu. Kasnije, autoškolu je preuzeo njegov sin
              Jure Bradarić, koji je nastavio očevu misiju s jednakom strašću i
              posvećenošću. Jure je unio nove metode obuke i modernizaciju
              opreme, osiguravajući da Autoškola Instruktor ostane na vrhu u
              pružanju visokokvalitetne vozačke edukacije. Pod njegovim
              vodstvom, autoškola je nastavila rasti i razvijati se, pridobivši
              povjerenje mnogih novih vozača koji su prošli kroz njihove
              programe obuke.
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-20 p-10 bg-gray-51">
        <Section number={"03"} text={"KATEGORIJE"} />
        <div className="grid grid-cols-3  gap-y-3 py-10">
          {categories.map((category, index) => (
            <Category key={index} category={category} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-20 p-10">
        <Section number={"04"} text={"GALERIJA"} />
        <div>
          <Slider {...settingsGallery}>
            {gallery.map((image, index) => (
              <div key={index} className="h-[400px]">
                <Image
                  src={image}
                  alt="Gallery image"
                  width={500}
                  height={400}
                  style={{
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(70%)",
                  }}
                  quality={100}
                  priority
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
}
