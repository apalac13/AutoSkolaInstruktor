"use client";
import Category from "@/components/aboutUsComponents/Category";
import Navigacija from "@/components/Navigacija";
import Section from "@/components/Section";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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

  return (
    <div>
      <div className=" bg-category-title bg-cover bg-no-repeat bg-center w-lvh h-[500px]   ">
        <div className="flex flex-col w-lvh h-[500px] bg-[#000]/80 ">
          <Navigacija />
          <p className="absolute top-1/3 left-[41%] text-4xl font-bold italic  text-white-60">
            KATEGORIJE
          </p>
        </div>
      </div>
      <section className="p-10 bg-gray-51">
        <Section number={"01"} text={"KATEGORIJE"} />
        <div className="grid grid-cols-3 gap-x-4 gap-y-[74px] justify-items-center p-10">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col gap-5 w-[450px] ">
              <div
                style={{
                  backgroundImage: `url(/${category.image})`,
                }}
                className=" bg-cover bg-no-repeat bg-center w-full h-[400px]  "
              >
                <div className="flex items-center justify-center w-full h-[400px] bg-[#000]/85 ">
                  <div className="flex gap-2 ">
                    <div className="w-1 h-8 bg-red-71 mb-[5px]"></div>
                    <p className="text-white-60 text-xl font-semibold">
                      {category.imageText}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-start">
                <div className="flex gap-1 ">
                  <p className="text-lg text-red-71">OZNAKA:</p>
                  <p className="text-lg text-white-60  ">{category.category}</p>
                </div>
                <div className="flex flex-col  ">
                  <p className="text-lg text-red-71 leading-none">
                    TIPOVI VOZILA:
                  </p>

                  <p className="text-base text-white-60 font-light">
                    {category.type}
                  </p>
                </div>
                <div className="flex flex-col ">
                  <p className="text-lg text-red-71 leading-none">
                    UVJETI ZA UPIS:
                  </p>

                  <p className="text-base text-white-60 font-light">
                    {category.conditions}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="p-10 ">
        <Section number={"02"} text={"KAKO DO VOZAČKE"} />
        <div className="flex flex-col items-center justify-center p-10 ">
          <div className="flex gap-1">
            <div className="flex flex-col items-center">
              <div
                id="steps"
                className="flex items-center justify-center w-[75px] h-[75px]  border   bg-gray-51  rounded-full animate-appear   "
              >
                <p className="text-white-60 text-4xl font-light">1</p>
              </div>
              <div
                id="steps"
                className=" w-[1px] h-[200px] bg-red-71 animate-appearLine "
              ></div>
            </div>
            <div className="flex flex-col items-start w-[300px] pt-6">
              <p className="text-lg text-black-40">OBAVITI LJEČNIČKI PREGLED</p>
              <p className=" ">nfinvirnibnrinbioribnrinb</p>
            </div>
          </div>
          <div className="flex gap-1 ">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-[75px] h-[75px] border border-red-71  bg-gray-51  rounded-full  ">
                <p className="text-white-60 text-4xl font-light">2</p>
              </div>
              <div className="w-[1px] h-[200px] bg-red-71 "></div>
            </div>
            <div className="flex flex-col items-start w-[300px] ">
              <p className="text-lg text-black-40">
                SLUŠATI PREDAVANJA O PROMETNIM PRAVILIMA I SIGURNOSNIM PROPISIMA
              </p>
              <p>nfinvirnibnrinbioribnrinb</p>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-[75px] h-[75px] border border-red-71  bg-gray-51  rounded-full  ">
                <p className="text-white-60 text-4xl font-light">3</p>
              </div>
              <div className="w-[1px] h-[200px] bg-red-71 "></div>
            </div>
            <div className="flex flex-col items-start w-[300px] ">
              <p className="text-lg text-black-40">
                POHAĐATI PREDAVANJA PRVE POMOĆI
              </p>
              <p>nfinvirnibnrinbioribnrinb</p>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-[75px] h-[75px] border border-red-71  bg-gray-51  rounded-full  ">
                <p className="text-white-60 text-4xl font-light">4</p>
              </div>
              <div className="w-[1px] h-[200px] bg-red-71 "></div>
            </div>
            <div className="flex flex-col items-start w-[300px] ">
              <p className="text-lg text-black-40">
                PRIJAVITI I POLOŽITI ISPIT IZ PROPISA I PRVE POMOĆI
              </p>
              <p>nfinvirnibnrinbioribnrinb</p>
            </div>
          </div>
          <div className="flex gap-1">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-[75px] h-[75px] border border-red-71  bg-gray-51  rounded-full  ">
                <p className="text-white-60 text-4xl font-light">5</p>
              </div>
              <div className="w-[1px] h-[200px] bg-red-71 "></div>
            </div>
            <div className="flex flex-col items-start w-[300px] ">
              <p className="text-lg text-black-40">
                POHAĐATI SATE VOŽNJE, PRIJAVITI I POLOŽITI ISPIT
              </p>
              <p>nfinvirnibnrinbioribnrinb</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Image
              src={"/icons/badge_id.svg"}
              alt="Badge icon"
              width={100}
              height={100}
            />
            <div className=" flex items-center w-[300px] ">
              <p className="text-lg text-black-40">VAŠA VOZAČKA 😎</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
