"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import axios from "axios";

export default function DodajPitanje() {
  const { kvizId } = useParams();
  const [type, setType] = useState("multiple");
  const [fileName, setFileName] = useState(null);
  const [question, setQuestion] = useState({
    questionText: "",
    answer: "",
    options: [],
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
    const newOption = {
      optionValue: `${question.options.length + 1}`,
      optionText: optionText,
    };
    setQuestion({
      ...question,
      options: [...question.options, newOption],
    });
    setOptionText("");
  };

  const handleAnswerChange = (optionValue) => {
    setQuestion({
      ...question,
      answer: optionValue,
    });
  };

  const onchangeFile = (e) => {
    setFileName(e.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("questionText", question.questionText);
    formData.append("answer", question.answer);
    formData.append("type", type);
    if (fileName) {
      formData.append("image", fileName);
    }
    if (type === "true/false") {
      formData.append(
        "options",
        JSON.stringify([
          { optionValue: "true", optionText: "TOČNO" },
          { optionValue: "false", optionText: "NETOČNO" },
        ])
      );
    } else {
      formData.append("options", JSON.stringify(question.options));
    }

    try {
      await axios.post(
        `http://localhost:3003/e-nastava/kvizovi/${kvizId}/dodaj-pitanje`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Question added successfully!");
      router.push(`/e-nastava/kvizovi`);
    } catch (error) {
      console.error("Error adding question", error);
      alert("There was an error adding the question.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <SubNavigacija />
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex flex-col gap-6 items-center"
      >
        <label htmlFor="" className="flex flex-col gap-[6px] items-start">
          <p className=" text-base">PITANJE</p>
          <input
            type="text"
            name="questionText"
            value={question.questionText}
            onChange={handleChange}
            className="w-[500px] h-10 p-1 border border-black-40"
            required
          />
        </label>
        <label htmlFor="file" className="self-start">
          <input type="file" filename="image" onChange={onchangeFile} />
        </label>
        <label htmlFor="" className="flex flex-col gap-[6px] items-start ">
          <p className="text-base">TIP PITANJA</p>
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-[500px] h-10 p-1 border border-black-40"
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
            <label htmlFor="" className="flex flex-col gap-[6px] items-start">
              <p className="text-base">OPCIJE ODGOVORA</p>
              <input
                type="text"
                value={optionText}
                onChange={handleOptionChange}
                className="w-[500px] h-10 p-1 border border-black-40"
                placeholder="Unesite odgovor"
              />
              <button
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
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="answer"
                value="true"
                checked={question.answer === "true"}
                onChange={() => handleAnswerChange("true")}
              />
              <p>TOČNO</p>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="radio"
                name="answer"
                value="false"
                checked={question.answer === "false"}
                onChange={() => handleAnswerChange("false")}
              />
              <p>NETOČNO</p>
            </div>
          </div>
        )}
        <div className="w-full flex flex-col gap-[6px] items-start">
          <div className="w-full flex justify-between">
            <p>OPCIJE</p>
            <p>TOČAN ODGOVOR</p>
          </div>
          {question.options.map((option, index) => (
            <label
              key={index}
              className="w-full flex justify-between items-start gap-4"
            >
              <p className="w-3/4 h-10 p-1 border border-black-40">
                {option.optionText}
              </p>
              <input
                type="checkbox"
                checked={question.answer === option.optionValue}
                onChange={() => handleAnswerChange(option.optionValue)}
                className="w-1/4 h-10 p-1 border border-black-40"
              />
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="w-[500px] h-10 border border-red-70 bg-red-70 "
        >
          <p className=" text-white-60 text-base font-light text-center ">
            DODAJ
          </p>
        </button>
      </form>
    </div>
  );
}
