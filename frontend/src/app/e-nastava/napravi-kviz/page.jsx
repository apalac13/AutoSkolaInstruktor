"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";

export default function NapraviKviz() {
  const router = useRouter();
  const [quiz, setQuiz] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "admin") {
      router.push("/e-nastava");
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        // Token has expired
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        router.push("/e-nastava");
      }
    } catch (error) {
      console.error("Invalid token", error);
      router.push("/e-nastava");
    }
  }, [router]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3003/e-nastava/napravi-kviz",
        { name: quiz.name, description: quiz.description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Quiz created successfully!");
      router.push("/e-nastava/kvizovi");
    } catch (error) {
      console.error("Error creating quiz", error);
      alert("There was an error creating the quiz.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <SubNavigacija />
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 items-center"
      >
        <label htmlFor="" className="flex flex-col gap-[6px] items-start">
          <p className=" text-base">NASLOV KVIZA</p>
          <input
            type="text"
            name="name"
            value={quiz.name}
            onChange={handleChange}
            className="w-[500px] h-10 p-1 border border-black-40"
            required
          />
        </label>
        <label htmlFor="" className="flex flex-col gap-[6px] items-start ">
          <p className="text-base">OPIS</p>
          <input
            type="text"
            name="description"
            value={quiz.description}
            onChange={handleChange}
            className="w-[500px] h-10 p-1 border border-black-40"
            required
          />
        </label>
        <button
          type="submit"
          className="w-[500px] h-10 border border-red-70 bg-red-70 "
        >
          <p className=" text-white-60 text-base font-light text-center ">
            NAPRAVI
          </p>
        </button>
      </form>
    </div>
  );
}
