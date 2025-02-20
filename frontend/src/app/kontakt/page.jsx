"use client";
import Navigacija from "@/components/Navigacija";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";

export default function Kontakt() {
  const contactItems = [
    {
      icon: "/icons/pin-map.svg",
      alt: "pin-map logo",
      text: "Stjepana Radića 40, 88240 POSUŠJE",
    },
    {
      icon: "/icons/phone1.svg",
      alt: "phone logo",
      text: "+38739682345",
    },
    {
      icon: "/icons/device-mobile1.svg",
      alt: "mobile phone logo",
      text: "+38763016830",
    },
    {
      icon: "/icons/instagram-red.svg",
      alt: "instagram logo",
      text: "autoskola_instruktor.posusje",
    },
    {
      icon: "/icons/mail1.svg",
      alt: "mail logo",
      text: "autoskola_instruktor@gmail.com",
    },
  ];

  const [formData, setFormData] = useState({
    person: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3003/kontakt",
        formData
      );

      if (response.status === 200) {
        alert("Podaci uspješno poslani!");
        setFormData({
          person: "",
          email: "",
          phoneNumber: "",
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
      <div className=" bg-kontakt bg-cover bg-no-repeat bg-center w-lvh h-[500px]   ">
        <div className="flex flex-col w-lvh h-[500px] bg-[#000]/70 ">
          <Navigacija />
          <p className="justify-self-center self-center absolute top-[33%]  text-4xl font-bold italic  text-white-60">
            KONTAKT
          </p>
        </div>
      </div>
      <section className="flex justify-center items-center gap-44 py-14 text-black-40  ">
        <div className="flex flex-col  gap-14  ">
          <Image
            src="/icons/ASInstruktorLogoOrginal.svg"
            width={314}
            height={258}
            alt="logo"
          />
          <div className="flex flex-col gap-1">
            {contactItems.map((contact) => (
              <div className="flex gap-1 items-end" key={contact.alt}>
                <Image
                  src={contact.icon}
                  width={38}
                  height={38}
                  alt={contact.alt}
                />
                <p className="text-sm">{contact.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-16">
          <p className="text-2xl">POŠALJI UPIT</p>
          <form
            className="w-[470px] flex flex-col gap-4"
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

            <div className="w-full">
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
            </div>
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
