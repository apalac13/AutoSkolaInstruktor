"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import Button from "@/components/buttons/Button";

export default function ResetPassword() {
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    repeatPassword: "",
  });

  const router = useRouter();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios
        .put("http://localhost:3003/e-nastava/reset-password", {
          email: data.email,
          newPassword: data.newPassword,
          repeatPassword: data.repeatPassword,
        })
        .then((res) => alert(res.data.msg));
      router.push("/e-nastava");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        alert(error.response.data.msg);
      } else {
        alert("Došlo je do greške. Pokušajte ponovo.");
      }
    }
  };

  return (
    <div className="my-28 font-sourceSans3 text-black-40 flex items-center justify-center  ">
      <form onSubmit={handleSubmit} className="w-[500px] flex flex-col gap-12 ">
        <p className=" text-xl font-semibold">RESETIRAJ LOZINKU</p>
        <div className="w-full flex flex-col gap-6 items-center">
          <InputField
            label={"EMAIL"}
            id={"email"}
            type={"email"}
            name={"email"}
            value={data.email}
            onChange={handleChange}
          />
          <InputField
            label={"NOVA LOZINKA"}
            id={"newPassword"}
            type={"password"}
            name={"newPassword"}
            value={data.newPassword}
            onChange={handleChange}
          />
          <InputField
            label={"PONOVI LOZINKU"}
            id={"repeatPassword"}
            type={"password"}
            name={"repeatPassword"}
            value={data.repeatPassword}
            onChange={handleChange}
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
