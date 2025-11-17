"use client";
import { useState } from "react";
import axios from "axios";
import InputField from "@/components/InputField";
import Button from "@/components/buttons/Button";
import Notification from "@/components/Notification";
import clsx from "clsx";

export default function NapraviKviz({ quizes, setQuizes }) {
  const [quiz, setQuiz] = useState({
    name: "",
    description: "",
  });
  const [createQuiz, setCreateQuiz] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const resetMessageWithTimeout = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!quiz.name || !quiz.description) {
      resetMessageWithTimeout("Ime i opis kviza su obavezni.", "error");
      return;
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/e-nastava/kvizovi`,
        { name: quiz.name, description: quiz.description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setQuizes([...quizes, response.data]);
      setCreateQuiz(false);
      setQuiz({ name: "", description: "" });
      resetMessageWithTimeout("Kviz je uspješno kreiran!", "success");
    } catch (error) {
      resetMessageWithTimeout(
        error.response?.data?.message || "Greška pri kreiranju kviza.",
        "error"
      );
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center">
      <button
        onClick={() => setCreateQuiz(!createQuiz)}
        className={clsx(
          "self-end relative group w-[200px] max-md:h-12 h-14 border",
          {
            "border-black-40 bg-black-40": createQuiz,
            "border-red-71 bg-red-71": !createQuiz,
          }
        )}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#DA291C,#231F20)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out"></div>
        <span className="relative text-white-60 text-base max-md:text-sm text-center font-light">
          {createQuiz ? "ODUSTANI" : "+ NOVI KVIZ"}
        </span>
      </button>
      <Notification message={message} messageType={messageType} />
      {createQuiz && (
        <form
          onSubmit={handleSubmit}
          className="w-[500px] max-[500px]:w-full flex flex-col gap-6 items-center"
        >
          <InputField
            label={"NASLOV KVIZA"}
            id={"naslovKviza"}
            type={"text"}
            name={"name"}
            value={quiz.name}
            onChange={handleChange}
          />
          <InputField
            label={"OPIS"}
            id={"opis"}
            type={"text"}
            name={"description"}
            value={quiz.description}
            onChange={handleChange}
          />
          <Button
            type={"submit"}
            width={"100%"}
            text={"NAPRAVI"}
            color={"red"}
          />
        </form>
      )}
    </div>
  );
}
