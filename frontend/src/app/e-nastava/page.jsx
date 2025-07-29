"use client";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Navigacija from "@/components/Navigacija";
import { motion } from "framer-motion";
import Image from "next/image";

export default function ENastava() {
  const [data, setData] = useState({
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
      const response = await axios.post("http://localhost:3003/e-nastava", {
        email: data.email,
        password: data.password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      localStorage.setItem("role", decodedToken.role);
      console.log("Decoded token:", decodedToken); // Debugging log
      if (decodedToken.role === "admin" || decodedToken.role === "user") {
        router.push("/e-nastava/pocetna");
      } else {
        router.push("/e-nastava");
      }
    } catch (error) {
      console.error("Error logging in", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <div className="my-28 font-sourceSans3 text-black-40 ">
        <form onSubmit={handleSubmit} className="flex flex-col gap-12 ">
          <p className=" text-xl font-semibold">PRIJAVA</p>
          <div className="flex flex-col gap-6 items-center">
            <label htmlFor="" className="flex flex-col gap-[6px] items-start">
              <p className=" text-base">KORISNIČKO IME</p>
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
            <Link
              href="/e-nastava/registracija"
              className=" text-red-70 text-sm underline"
            >
              Nemaš račun? Registriraj se
            </Link>
            <button
              type="submit"
              className="w-[500px] h-10 border border-red-70 bg-red-70 "
            >
              <p className=" text-white-60 text-base font-light text-center ">
                PRIJAVI SE
              </p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
