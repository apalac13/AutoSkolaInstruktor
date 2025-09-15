"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import axios from "axios";
import Button from "@/components/buttons/Button";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function DodajPitanje() {
  const { kvizId } = useParams();
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);
  const router = useRouter();
  const [type, setType] = useState("multiple");
  const [fileName, setFileName] = useState(null);
  const [question, setQuestion] = useState({
    questionText: "",
    questionNumber: null,
    answerOptions: [],
  });
  const [optionText, setOptionText] = useState("");
  const options = [
    {
      label: "višestruki odgovori",
      value: "multiple",
    },
    {
      label: "točno/netočno ",
      value: "true/false",
    },
    {
      label: "upiši odgovor",
      value: "write",
    },
  ];

  const resetMessageWithTimeout = (message, type = "success") => {
    setMessage(message);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value,
    }));
  };
  const handleOptionChange = (event) => {
    setOptionText(event.target.value);
  };

  const handleAddOption = (event) => {
    event.preventDefault();

    if (type === "true/false") {
      const trueFalseOption = [
        { option: "TOČNO", answer: false },
        { option: "NETOČNO", answer: false },
      ];

      setQuestion({
        ...question,
        answerOptions: trueFalseOption,
      });
    } else {
      const newOption = {
        option: optionText,
        answer: false,
      };
      setQuestion({
        ...question,
        answerOptions: [...question.answerOptions, newOption],
      });
    }

    setOptionText("");
  };

  const onchangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  const handleAnswerChange = (index) => {
    setQuestion((prev) => {
      const newAnswerValue = [...prev.answerOptions];
      newAnswerValue[index] = {
        ...newAnswerValue[index],
        answer: !newAnswerValue[index].answer,
      };
      return { ...prev, answerOptions: newAnswerValue };
    });
    console.log(question.answerOptions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("questionText", question.questionText);
    formData.append("type", type);
    if (fileName) {
      formData.append("image", fileName);
    }
    formData.append("answerOptions", JSON.stringify(question.answerOptions));
    try {
      const response = await axios.post(
        `http://localhost:3003/e-nastava/kvizovi/${kvizId}/dodaj-pitanje`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const message = response.data.message;
      if (message) resetMessageWithTimeout(message, "success");
      router.push(`/e-nastava/kvizovi`);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Dogodila se greška pri dodavanju pitanja.";
      resetMessageWithTimeout(message, "error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <SubNavigacija />
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
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-[500px] max-[500px]:w-full flex flex-col gap-6 items-center"
      >
        <label
          htmlFor=""
          className="w-full flex flex-col gap-[6px] items-start"
        >
          <p className=" text-base">PITANJE</p>
          <input
            type="text"
            name="questionText"
            value={question.questionText}
            onChange={handleChange}
            className="w-full h-10 p-1 border border-black-40"
            required
          />
        </label>
        <label htmlFor="file" className="w-full flex flex-col">
          <input type="file" name="image" onChange={onchangeFile} />
        </label>
        <label
          htmlFor=""
          className="w-full flex flex-col gap-[6px] items-start "
        >
          <p className="text-base">TIP PITANJA</p>
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full h-10 p-1 border border-black-40"
          >
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        {type === "multiple" && (
          <>
            <label
              htmlFor=""
              className="w-full flex flex-col gap-[6px] items-start"
            >
              <p className="text-base">OPCIJE ODGOVORA</p>
              <input
                type="text"
                value={optionText}
                onChange={handleOptionChange}
                className="w-full h-10 p-1 border border-black-40"
                placeholder="Unesite odgovor"
              />
              <button
                type="button"
                onClick={handleAddOption}
                className="w-[100px] h-10  border border-black-40 bg-black-40 "
              >
                <p className=" text-white-60 text-xs font-light text-center ">
                  DODAJ
                </p>
              </button>
            </label>
          </>
        )}
        {type === "true/false" && (
          <div className="w-full flex flex-col items-start justify-start gap-4 mt-4">
            <p className="text-base">TOČNO</p>
            <p className="text-base">NETOČNO</p>
            <button
              type="button"
              onClick={handleAddOption}
              className="w-[100px] h-10  border border-black-40 bg-black-40 "
            >
              <p className=" text-white-60 text-xs font-light text-center ">
                DODAJ
              </p>
            </button>
          </div>
        )}
        {type === "write" && (
          <p className="italic text-sm text-gray-500">
            Nema opcija — učenik mora unijeti svoj odgovor.
          </p>
        )}
        <div className="w-full flex flex-col gap-[6px] items-start">
          <div className="w-full flex justify-between">
            <p>OPCIJE</p>
            <p>TOČAN ODGOVOR</p>
          </div>
          {question.answerOptions.map((answerOption, index) => (
            <label
              key={index}
              className="w-full flex justify-between items-start gap-4"
            >
              <p className="w-3/4 h-10 p-1 border border-black-40">
                {answerOption.option}
              </p>
              <input
                type="checkbox"
                checked={answerOption.answer}
                onChange={() => handleAnswerChange(index)}
                className="online-prijava-checkbox w-1/4 h-10 border border-black-40 bg-white-60 checked:bg-black-40 cursor-pointer"
              />
            </label>
          ))}
        </div>
        <Button type={"submit"} width={"100%"} text={"DODAJ"} color={"red"} />
      </form>
    </div>
  );
}
