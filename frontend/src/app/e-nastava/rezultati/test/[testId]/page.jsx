"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import TestQuestion from "@/components/eNastavaComponents/rezultatiComponents/testsResultsComponents/TestQuestion";

export default function TestRezultatDetalji() {
  const { testId } = useParams();
  const [testResult, setTestResult] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3003/e-nastava/rezultati/test/${testId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setTestResult(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className="flex flex-col gap-11">
      <div className="flex gap-11 text-lg max-[450px]:text-base ">
        <p>Kandidat: {testResult.name}</p>
        <p>
          Rezultat: {testResult.result}
          <span>%</span>{" "}
        </p>
      </div>
      {testResult.test?.questions?.map((question, index) => (
        <motion.div
          key={question.questionNumber}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <TestQuestion
            question={question}
            testAnswer={testResult.answers[index]}
          />
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
