"use client";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import InputField from "../InputField";
import Button from "../buttons/Button";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function LoginForm() {
  const [data, setData] = useState({
    email: "",
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
      const response = await axios.post("http://localhost:3003/e-nastava", {
        email: data.email,
        password: data.password,
      });

      const { token, message } = response.data;
      if (message) resetMessageWithTimeout(message, "success");

      localStorage.setItem("token", token);
      const decodedToken = jwtDecode(token);
      localStorage.setItem("role", decodedToken.role);

      setUser({
        name: decodedToken.name || "",
        email: decodedToken.email || "",
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
    <div className="my-28 font-sourceSans3 text-black-40 flex items-center justify-center  ">
      <form onSubmit={handleSubmit} className="w-[500px] flex flex-col gap-12 ">
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
        <div className="w-full flex flex-col gap-6 items-center">
          <InputField
            label={"EMAIL"}
            id={"email"}
            type={"email"}
            name={"email"}
            value={data.email}
            onChange={handleChange}
          />
          <div className="w-full">
            <InputField
              label={"LOZINKA"}
              id={"password"}
              type={"password"}
              name={"password"}
              value={data.password}
              onChange={handleChange}
            />
            <div className="flex">
              <Link
                href="/e-nastava/reset-password"
                className=" text-red-70 text-sm underline "
              >
                Zaboravili ste lozinku?
              </Link>
            </div>
          </div>

          <Link
            href="/e-nastava/registracija"
            className=" text-red-70 text-sm underline"
          >
            Nemaš račun? Registriraj se
          </Link>
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
