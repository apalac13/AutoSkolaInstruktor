"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function Kvizovi() {
  const [quizes, setQuizes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:3003/e-nastava/kvizovi", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setQuizes(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  const uploadQuiz = async (id) => {
    try {
      await axios.put(
        `http://localhost:3003/e-nastava/kvizovi/${id}`,
        { upload: true },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error uploading quiz", error);
      alert("There was an error uploading the quiz.");
    }
  };

  const deleteQuiz = async (id) => {
    try {
      await axios.delete(`http://localhost:3003/e-nastava/kvizovi/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const rez = await axios.get(`http://localhost:3003/e-nastava/kvizovi`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setQuizes(rez.data);
    } catch (error) {
      console.error("Error deleting quiz", error);
      alert("There was an error deleting the quiz.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-around border-b-[1px] border-black-40 text-base font-semibold ">
        <p>IME KVIZA</p>
        <p>OPIS</p>
        <p>OPCIJE</p>
      </div>
      {quizes.map((quiz) => (
        <div
          key={quiz._id}
          className="grid grid-cols-3 gap-4 p-6  border-b-[1px] border-black-40 text-base"
        >
          <p>{quiz.quizname}</p>
          <p>{quiz.quizdescription}</p>
          <div className="flex gap-3">
            <Link href={`/e-nastava/kvizovi/${quiz._id}`}>
              <button className="w-[100px] h-10 border border-black-40 bg-black-40 ">
                <p className=" text-white-60 text-xs font-light text-center ">
                  POGLEDAJ
                </p>
              </button>
            </Link>
            <Link href={`/e-nastava/kvizovi/${quiz._id}/dodaj-pitanje`}>
              <button className="w-[100px] h-10 border border-black-40 bg-black-40 ">
                <p className=" text-white-60 text-xs font-light text-center ">
                  DODAJ
                </p>
              </button>
            </Link>
            <button
              onClick={() => uploadQuiz(quiz._id)}
              className="w-[100px] h-10 border border-green-80 bg-green-80 "
            >
              <p className=" text-white-60 text-xs font-light text-center ">
                POSTAVI
              </p>
            </button>
            <button
              onClick={() => deleteQuiz(quiz._id)}
              className="w-[100px] h-10 border border-red-70 bg-red-70 "
            >
              <p className=" text-white-60 text-xs font-light text-center ">
                IZBRIŠI
              </p>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
