"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import Button from "@/components/buttons/Button";
import Notification from "@/components/Notification";
import clsx from "clsx";

export default function RegisterUser({ users, setUsers }) {
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [createUser, setCreateUser] = useState(false);
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
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3003/e-nastava/kandidati",
        {
          name: user.name,
          username: user.username,
          password: user.password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUsers([...users, response.data]);
      setCreateUser(false);
      setUser({ name: "", username: "", password: "" });
      resetMessageWithTimeout("Korisnik je uspješno registriran!", "success");
    } catch (error) {
      const message =
        error.response?.data?.message || "Dogodila se greška pri registraciji.";
      resetMessageWithTimeout(message, "error");
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center">
      <button
        onClick={() => setCreateUser(!createUser)}
        className={clsx(
          "self-end relative group w-[200px] max-md:h-12 h-14 border",
          {
            "border-black-40 bg-black-40": createUser,
            "border-red-71 bg-red-71": !createUser,
          }
        )}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#DA291C,#231F20)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out"></div>
        <span className="relative text-white-60 text-base max-md:text-sm text-center font-light">
          {createUser ? "ODUSTANI" : "+ NOVI KANDIDAT"}
        </span>
      </button>
      <Notification message={message} messageType={messageType} />
      {createUser && (
        <form
          onSubmit={handleSubmit}
          className="w-[500px] flex flex-col gap-12 px-5 "
        >
          <p className=" text-xl font-semibold">REGISTRACIJA</p>
          <div className="w-full flex flex-col gap-6 items-center">
            <InputField
              label={"IME I PREZIME"}
              id={"name"}
              type={"text"}
              name={"name"}
              value={user.name}
              onChange={handleChange}
            />
            <InputField
              label={"KORISNIČKO IME"}
              id={"username"}
              type={"text"}
              name={"username"}
              value={user.username}
              onChange={handleChange}
            />
            <InputField
              label={"LOZINKA"}
              id={"password"}
              type={"password"}
              name={"password"}
              value={user.password}
              onChange={handleChange}
            />
            <Button
              type={"submit"}
              width={"100%"}
              text={"REGISTRIRAJ"}
              color={"red"}
            />
          </div>
        </form>
      )}
    </div>
  );
}
