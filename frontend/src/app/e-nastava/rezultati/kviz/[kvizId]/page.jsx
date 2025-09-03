"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import QuizQuestion from "@/components/eNastavaComponents/rezultatiComponents/quizesResultsComponents/QuizQuestion";

export default function KvizRezultatDetalji() {
  const { kvizId } = useParams();
  const [quizResult, setQuizResult] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3003/e-nastava/rezultati/kviz/${kvizId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setQuizResult(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="flex flex-col gap-11">
      <div className="flex gap-11 text-lg max-[450px]:text-base ">
        <p>Kandidat: {quizResult.name}</p>
        <p>
          Rezultat: {quizResult.result}
          <span>%</span>{" "}
        </p>
      </div>
      {quizResult.answers?.map((answer, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <QuizQuestion answer={answer} questionNumber={index + 1} />
        </motion.div>
      ))}
      <Link href={"/e-nastava/rezultati"}>
        <button className="w-full h-16 max-sm:h-14 border border-red-71 bg-red-71 hover:bg-red-71/90 transition">
          <p className="text-base max-md:text-sm text-white-60">
            ZAVRŠI PREGLED
          </p>
        </button>
      </Link>
    </div>
  );
}
