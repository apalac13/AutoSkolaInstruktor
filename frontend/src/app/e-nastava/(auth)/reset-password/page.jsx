"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import Button from "@/components/buttons/Button";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function ResetPassword() {
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    repeatPassword: "",
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
    if (data.newPassword !== data.repeatPassword) {
      resetMessageWithTimeout("Lozinke se ne poklapaju.", "error");
      return;
    }
    try {
      const response = await axios.put(
        "http://localhost:3003/e-nastava/reset-password",
        {
          email: data.email,
          newPassword: data.newPassword,
        }
      );
      const message = response.data.message;
      if (message) resetMessageWithTimeout(message, "success");
      router.push("/e-nastava");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Dogodila se greška pri resetiranju lozinke.";
      resetMessageWithTimeout(message, "error");
    }
  };

  return (
    <div className="my-12 font-sourceSans3 text-black-40 flex items-center justify-center  ">
      <form
        onSubmit={handleSubmit}
        className="w-[500px] flex flex-col gap-12 px-5 "
      >
        <p className=" text-xl font-semibold">RESETIRAJ LOZINKU</p>
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
            label={"EMAIL"}
            id={"email"}
            type={"email"}
            name={"email"}
            value={data.email}
            onChange={handleChange}
            placeholder="primjer@gmail.com"
          />
          <InputField
            label={"NOVA LOZINKA"}
            id={"newPassword"}
            type={"password"}
            name={"newPassword"}
            value={data.newPassword}
            onChange={handleChange}
            placeholder="unesite novu lozinku"
          />
          <InputField
            label={"PONOVI LOZINKU"}
            id={"repeatPassword"}
            type={"password"}
            name={"repeatPassword"}
            value={data.repeatPassword}
            onChange={handleChange}
            placeholder="unesite ponovo novu lozinku"
          />
          <Button
            type={"submit"}
            width={"100%"}
            text={"RESETIRAJ"}
            color={"red"}
          />
        </div>
      </form>
    </div>
  );
}
