"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import axios from "axios";
import Button from "@/components/buttons/Button";
import Notification from "@/components/Notification";

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
    { label: "višestruki odgovori", value: "multiple" },
    { label: "točno/netočno", value: "true/false" },
    { label: "upiši odgovor", value: "write" },
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

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);

    if (selectedType === "true/false") {
      setQuestion((prev) => ({
        ...prev,
        answerOptions: [
          { option: "TOČNO", answer: false },
          { option: "NETOČNO", answer: false },
        ],
      }));
    } else {
      setQuestion((prev) => ({ ...prev, answerOptions: [] }));
    }
  };

  const handleAddOption = (event) => {
    event.preventDefault();
    if (!optionText.trim()) return;

    const newOption = {
      option: optionText,
      answer: false,
    };
    setQuestion((prev) => ({
      ...prev,
      answerOptions: [...prev.answerOptions, newOption],
    }));

    setOptionText("");
  };

  const handleRemoveOption = (index) => {
    setQuestion((prev) => {
      const updated = [...prev.answerOptions];
      updated.splice(index, 1);
      return { ...prev, answerOptions: updated };
    });
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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (type === "multiple" && question.answerOptions.length === 0) {
      return resetMessageWithTimeout("Dodaj barem jednu opciju.", "error");
    }

    const formData = new FormData();
    formData.append("questionText", question.questionText);
    formData.append("type", type);
    if (fileName) {
      formData.append("image", fileName);
    }
    formData.append("answerOptions", JSON.stringify(question.answerOptions));
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/e-nastava/kvizovi/${kvizId}/dodaj-pitanje`,
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
    <div className="flex flex-col items-center justify-center p-5">
      <SubNavigacija />
      <Notification message={message} messageType={messageType} />
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-[500px] max-[500px]:w-full flex flex-col gap-6 items-center"
      >
        {/* Pitanje */}
        <label className="w-full flex flex-col gap-[6px] items-start">
          <p className="text-base">PITANJE</p>
          <input
            type="text"
            name="questionText"
            value={question.questionText}
            onChange={handleChange}
            className="w-full h-10 p-1 border border-black-40"
            required
          />
        </label>

        {/* Slika */}
        <label htmlFor="file" className="w-full flex flex-col">
          <input type="file" name="image" onChange={onchangeFile} />
        </label>

        {/* Tip pitanja */}
        <label className="w-full flex flex-col gap-[6px] items-start ">
          <p className="text-base">TIP PITANJA</p>
          <select
            name="type"
            value={type}
            onChange={handleTypeChange}
            className="w-full h-10 p-1 border border-black-40"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        {/* Opcije */}
        {type === "multiple" && (
          <div className="w-full flex flex-col gap-2 items-start">
            <p className="text-base">OPCIJE ODGOVORA</p>
            <div className="flex gap-2 w-full">
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
                className="relative group w-1/4 h-10 border-black-40 bg-black-40 "
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#DA291C,#231F20)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out"></div>
                <span className="relative text-white-60 text-xs text-center font-light">
                  DODAJ
                </span>
              </button>
            </div>
          </div>
        )}

        {type === "true/false" && (
          <p className="italic text-sm text-gray-500">
            Automatski dodane opcije: TOČNO / NETOČNO
          </p>
        )}

        {type === "write" && (
          <p className="italic text-sm text-gray-500">
            Nema opcija — učenik mora unijeti svoj odgovor.
          </p>
        )}

        {/* Lista opcija */}
        {question.answerOptions.length > 0 && (
          <div className="w-full flex flex-col gap-[6px] items-start">
            <div className="w-full flex justify-between">
              <p>OPCIJE</p>
              <p>TOČAN ODGOVOR</p>
            </div>
            {question.answerOptions.map((answerOption, index) => (
              <div
                key={answerOption.option + index}
                className="w-full flex justify-between items-center gap-2"
              >
                <p className="w-2/4 h-10 p-1 border border-black-40">
                  {answerOption.option}
                </p>
                <input
                  type="checkbox"
                  checked={answerOption.answer}
                  onChange={() => handleAnswerChange(index)}
                  className="online-prijava-checkbox w-1/4 h-10 border border-black-40 bg-white-60 checked:bg-black-40 cursor-pointer"
                />
                {type === "multiple" && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    className="relative group w-1/4 h-10 border-red-71 bg-red-71 "
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#DA291C,#231F20)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out"></div>
                    <span className="relative text-white-60 text-xs text-center font-light">
                      UKLONI
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Submit */}
        <Button type="submit" width="100%" text="DODAJ" color="red" />
      </form>
    </div>
  );
}
