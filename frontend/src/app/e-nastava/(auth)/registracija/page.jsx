"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Registracija() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3003/e-nastava/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      router.push("/e-nastava");
    } catch (error) {
      console.error("Error registering", error);
    }
  };

  return (
    <div className=" mt-28 font-sourceSans3 text-black-40 ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-12 ">
        <p className=" text-xl font-semibold">REGISTRACIJA</p>
        <div className="flex flex-col gap-6 items-center">
          <label htmlFor="" className="flex flex-col gap-[6px] items-start">
            <p className=" text-base">KORISNIČKO IME</p>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className="w-[500px] h-10 p-1 border border-black-40"
              required
            />
          </label>
          <label htmlFor="" className="flex flex-col gap-[6px] items-start">
            <p className=" text-base">EMAIL</p>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className="w-[500px] h-10 p-1 border border-black-40"
              placeholder="example@gmail.com"
              required
            />
          </label>
          <label htmlFor="" className="flex flex-col gap-[6px] items-start ">
            <p className="text-base">LOZINKA</p>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="w-[500px] h-10 p-1 border border-black-40"
              placeholder="unesite lozinku"
              required
            />
          </label>
          <button
            type="submit"
            className="w-[500px] h-10 border border-red-70 bg-red-70 "
          >
            <p className=" text-white-60 text-base font-light text-center ">
              REGISTRIRAJ SE
            </p>
          </button>
        </div>
      </form>
    </div>
  );
}
