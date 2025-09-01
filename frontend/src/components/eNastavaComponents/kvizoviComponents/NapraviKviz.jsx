"use client";
import { useState } from "react";
import axios from "axios";
import clsx from "clsx";

export default function NapraviKviz({ quizes, setQuizes }) {
  const [quiz, setQuiz] = useState({
    name: "",
    description: "",
  });
  const [createQuiz, setCreateQuiz] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setQuiz({ ...quiz, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3003/e-nastava/kvizovi",
        { name: quiz.name, description: quiz.description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res.data);
      setQuizes([...quizes, res.data]);
      setCreateQuiz(false);
      setQuiz({ name: "", description: "" });
      alert("Quiz created successfully!");
    } catch (error) {
      console.error("Error creating quiz", error);
      alert("There was an error creating the quiz.");
    }
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setCreateQuiz(!createQuiz)}
        className={clsx("self-end w-[200px] h-10 border", {
          "border-black-40 bg-black-40": createQuiz,
          "border-red-70 bg-red-70": !createQuiz,
        })}
      >
        {createQuiz ? (
          <p className=" text-white-60 text-base font-light text-center ">
            ODUSTANI
          </p>
        ) : (
          <p className=" text-white-60 text-base font-light text-center ">
            + NOVI KVIZ
          </p>
        )}
      </button>
      {createQuiz && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 items-center"
        >
          <label htmlFor="" className="flex flex-col gap-[6px] items-start">
            <p className=" text-base">NASLOV KVIZA</p>
            <input
              type="text"
              name="name"
              value={quiz.name}
              onChange={handleChange}
              className="w-[500px] h-10 p-1 border border-black-40"
              required
            />
          </label>
          <label htmlFor="" className="flex flex-col gap-[6px] items-start ">
            <p className="text-base">OPIS</p>
            <input
              type="text"
              name="description"
              value={quiz.description}
              onChange={handleChange}
              className="w-[500px] h-10 p-1 border border-black-40"
              required
            />
          </label>
          <button
            type="submit"
            className="w-[500px] h-10 border border-red-70 bg-red-70 "
          >
            <p className=" text-white-60 text-base font-light text-center ">
              NAPRAVI
            </p>
          </button>
        </form>
      )}
    </div>
  );
}
