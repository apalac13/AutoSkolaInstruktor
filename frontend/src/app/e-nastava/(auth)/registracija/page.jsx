"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import Button from "@/components/buttons/Button";

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
    <div className="my-28 font-sourceSans3 text-black-40 flex items-center justify-center  ">
      <form onSubmit={handleSubmit} className="w-[500px] flex flex-col gap-12 ">
        <p className=" text-xl font-semibold">REGISTRACIJA</p>
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
