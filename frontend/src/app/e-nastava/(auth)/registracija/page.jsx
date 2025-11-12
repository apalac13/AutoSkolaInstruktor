"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import Button from "@/components/buttons/Button";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function Registracija() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const router = useRouter();

  const resetMessageWithTimeout = (message, type = "success") => {
    setMessage(message);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3003/e-nastava/register",
        {
          name: data.name,
          email: data.email,
          password: data.password,
        }
      );
      const message = response.data.message;
      if (message) resetMessageWithTimeout(message, "success");
      router.push("/e-nastava");
    } catch (error) {
      const message =
        error.response?.data?.message || "Dogodila se greška pri registraciji.";
      resetMessageWithTimeout(message, "error");
    }
  };

  return (
    <div className="my-12 font-sourceSans3 text-black-40 flex items-center justify-center  ">
      <form
        onSubmit={handleSubmit}
        className="w-[500px] flex flex-col gap-12 px-5 "
      >
        <p className=" text-xl font-semibold">REGISTRACIJA</p>
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className={clsx("text-white-60 mt-4 shadow-md uppercase p-3 ", {
              "bg-green-80": messageType === "success",
              "bg-red-70": messageType === "error",
            })}
          >
            {message}
          </motion.p>
        )}
        <div className="w-full flex flex-col gap-6 items-center">
          <InputField
            label={"KORISNIČKO IME"}
            id={"name"}
            type={"name"}
            name={"name"}
            value={data.name}
            onChange={handleChange}
          />
          <InputField
            label={"EMAIL"}
            id={"email"}
            type={"email"}
            name={"email"}
            value={data.email}
            onChange={handleChange}
            placeholder="primjer@gmail.com"
          />
          <InputField
            label={"LOZINKA"}
            id={"password"}
            type={"password"}
            name={"password"}
            value={data.password}
            onChange={handleChange}
          />
          <Button
            type={"submit"}
            width={"100%"}
            text={"REGISTRIRAJ SE"}
            color={"red"}
          />
        </div>
      </form>
    </div>
  );
}
