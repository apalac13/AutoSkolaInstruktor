"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import InputField from "@/components/InputField";
import Button from "@/components/buttons/Button";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function ENastava() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const { setUser } = useContext(AuthContext);
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
        `${process.env.NEXT_PUBLIC_API_URL}/e-nastava`,
        {
          username: data.username,
          password: data.password,
        }
      );

      const { token, message } = response.data;
      if (message) resetMessageWithTimeout(message, "success");

      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      localStorage.setItem("role", decodedToken.role);

      setUser({
        name: decodedToken.name || "",
        username: decodedToken.username || "",
        role: decodedToken.role,
      });

      if (decodedToken.role === "admin" || decodedToken.role === "user") {
        router.push("/e-nastava/testovi");
      } else {
        router.push("/e-nastava");
      }
    } catch (error) {
      const backendMsg = error.response?.data?.message || "Došlo je do greške!";
      resetMessageWithTimeout(backendMsg, "error");
    }
  };
  return (
    <div className="my-12 font-sourceSans3 text-black-40 flex items-center justify-center  ">
      <form
        onSubmit={handleSubmit}
        className="w-[500px] flex flex-col gap-12 px-5 "
      >
        <p className=" text-xl font-semibold">PRIJAVA</p>
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
        <div className="w-full flex flex-col gap-7 items-center">
          <InputField
            label={"KORISNIČKO IME"}
            id={"username"}
            type={"text"}
            name={"username"}
            value={data.username}
            onChange={handleChange}
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
            text={"PRIJAVI SE"}
            color={"red"}
          />
        </div>
      </form>
    </div>
  );
}
