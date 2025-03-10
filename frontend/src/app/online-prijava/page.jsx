"use client";
import Navigacija from "@/components/Navigacija";
import { DatePicker } from "@nextui-org/date-picker";
import { useState } from "react";
import axios from "axios";
import clsx from "clsx";
import { motion } from "framer-motion";

export default function OnlinePrijava() {
  const [formData, setFormData] = useState({
    person: "",
    email: "",
    date: "",
    placeOfBirth: "",
    phoneNumber: "",
    categories: [],
    message: "",
  });
  const categories = ["A", "A1", "B", "BE", "C1", "C1E", "C", "CE"];
  const [moreInformation, setMoreInformation] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, value]
        : prev.categories.filter((category) => category !== value),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3003/online-prijava",
        formData
      );

      if (response.status === 200) {
        alert("Podaci uspješno poslani!");
        setFormData({
          person: "",
          email: "",
          date: "",
          placeOfBirth: "",
          phoneNumber: "",
          categories: [],
          message: "",
        });
      }
    } catch (error) {
      console.error("Greška pri slanju podataka:", error);
      alert("Dogodila se greška pri slanju podataka.");
    }
  };

  return (
    <div>
      <div className=" bg-online-prijava bg-cover bg-no-repeat bg-center w-lvh h-[500px]   ">
        <div className="flex flex-col w-lvh h-[500px] bg-[#000]/80 ">
          <Navigacija />
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-[30%] justify-self-center self-center"
          >
            <p className=" text-4xl font-bold italic  text-white-60">
              ONLINE PRIJAVA
            </p>
            <p className="text-xl text-white-60 font-light italic ">
              Ostavite nam podatke, a mi ćemo vam se javiti u najkraćem mogućem
              roku
            </p>
          </motion.div>
        </div>
      </div>
      <section className="flex justify-center items-center py-14  ">
        <div className="flex flex-col items-center justify-center gap-20">
          <div className="flex flex-col gap-3 items-center justify-center">
            <div className="flex items-end gap-1">
              <p className="text-xl leading-none">UVJETI UPISA</p>
              <div className="flex items-end justify-end w-[300px] border-b border-black-40 mb-1 ">
                {moreInformation ? (
                  <p
                    onClick={() => setMoreInformation(!moreInformation)}
                    className="text-base  cursor-pointer "
                  >
                    -SAKRIJ
                  </p>
                ) : (
                  <p
                    onClick={() => setMoreInformation(!moreInformation)}
                    className="text-base cursor-pointer"
                  >
                    +VIŠE INFORMACIJA
                  </p>
                )}
              </div>
            </div>
            <div
              className={clsx(
                "w-[420px] text-start overflow-hidden transition-all duration-1000 ease-in-out",
                {
                  "max-h-[1000px] opacity-100": moreInformation,
                  "max-h-0 opacity-0": !moreInformation,
                }
              )}
            >
              <p>
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
          <form
            className="w-[500px] flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div className="w-full">
              <label htmlFor="person" className="flex flex-col items-start">
                <p className="text-lg">IME I PREZIME</p>
                <input
                  id="person"
                  type="text"
                  name="person"
                  value={formData.person}
                  onChange={handleChange}
                  className="border border-black-40 w-full h-[50px] p-1"
                  required
                />
                {console.log(formData)}
              </label>
            </div>
            <div className="w-full">
              <label htmlFor="email" className="flex flex-col items-start">
                <p className="text-lg">EMAIL</p>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-black-40 w-full h-[50px] p-1"
                  required
                />
              </label>
            </div>
            <div className="w-full ">
              <label htmlFor="date" className="flex flex-col items-start">
                <p className="text-lg">DATUM I GODINA ROĐENJA</p>
                <DatePicker
                  id="date"
                  hideTimeZone
                  selectorIcon={"/icons/calendar_date.svg"}
                  showMonthAndYearPickers
                  radius="none"
                  selected={formData.date}
                  onChange={(date) =>
                    setFormData((prev) => ({ ...prev, date }))
                  }
                  className="justify-center bg-white-60 h-[50px] b border border-black-40 "
                />
                {console.log(formData.date)}
              </label>
            </div>
            <div className="w-full ">
              <label htmlFor="place" className="flex flex-col items-start">
                <p className="text-lg">MJESTO ROĐENJA</p>
                <input
                  id="place"
                  type="text"
                  name="placeOfBirth"
                  value={formData.placeOfBirth}
                  onChange={handleChange}
                  className="border border-black-40 w-full h-[50px] p-1"
                  required
                />
              </label>
            </div>
            <div className="w-full ">
              <label
                htmlFor="phone-number"
                className="flex flex-col items-start"
              >
                <p className="text-lg">KONTAKT BROJ</p>
                <input
                  id="phone-number"
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="border border-black-40 w-full h-[50px] p-1"
                  required
                />
              </label>
            </div>
            <div className="w-full flex flex-col gap-3 items-start ">
              <p className="text-lg">KATEGORORIJA</p>
              <div className="grid grid-cols-2 justify-items-start gap-x-28 gap-y-3 ">
                {categories.map((category, index) => (
                  <label
                    key={index}
                    htmlFor={category}
                    className="flex items-end gap-2 cursor-pointer "
                  >
                    <input
                      id={category}
                      type="checkbox"
                      value={category}
                      onChange={handleCategoryChange}
                      checked={formData.categories.includes(category)}
                      className="online-prijava-checkbox w-[50px] h-[50px] border border-black-40 bg-white-60 checked:bg-black-40 cursor-pointer "
                    />
                    <p className="text-xl leading-none">{category} </p>
                  </label>
                ))}
              </div>
            </div>
            <label htmlFor="message" className="flex flex-col items-start">
              <p className="text-lg">PORUKA</p>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="border border-black-40 w-full  p-1 h-[150px] bg-white-60"
              ></textarea>
            </label>
            <button
              type="submit"
              className="w-full h-16  border border-red-71 bg-red-71 "
            >
              <p className="text-base text-white-60 ">POŠALJI</p>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
