"use client";
import { useRouter, useParams } from "next/navigation";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import Image from "next/image";

export default function KvizPage() {
  const router = useRouter();
  const { kvizId } = useParams();
  const [quiz, setQuiz] = useState({ questions: [] });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token || role !== "admin") {
      router.push("/e-nastava");
      return;
    }
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        // Token has expired
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        router.push("/e-nastava");
        return;
      }
    } catch (error) {
      console.error("Invalid token", error);
      router.push("/e-nastava");
      return;
    }

    axios
      .get(`http://localhost:3003/e-nastava/kvizovi/${kvizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setQuiz(res.data))
      .catch((err) => console.log(err.message));
  }, [router, kvizId]);

  console.log(quiz);

  const deleteQuestion = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3003/e-nastava/kvizovi/${kvizId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const rez = await axios.get(
        `http://localhost:3003/e-nastava/kvizovi/${kvizId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setQuiz(rez.data);
    } catch (error) {
      console.error("Error deleting question", error);
      alert("There was an error deleting the question.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <SubNavigacija />
      <div className="w-[600px] flex flex-col items-start justify-center gap-6 ">
        <div className="w-full flex flex-col gap-6 ">
          <p className=" text-xl text-black-40 uppercase ">{quiz.quizname}</p>
          <Link href={"/e-nastava/kvizovi"} className="w-[120px]">
            <button className="w-[120px] h-12  border border-black-40 bg-black-40 ">
              <p className=" text-white-60 text-sm font-light  text-center ">
                ZAVRŠI PREGLED
              </p>
            </button>
          </Link>
        </div>
        <div className="w-full flex flex-col  gap-6">
          {quiz.questions && quiz.questions.length > 0 ? (
            quiz.questions.map((question, index) => (
              <div
                key={question._id}
                className="flex flex-col gap-6 border-b-[1px] border-black-40 "
              >
                <div className="flex  gap-3 text-lg font-semibold border-b-[1px] border-black-40 ">
                  <p>{index + 1}.</p>
                  <p> {question.questionText}</p>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col gap-3">
                    {question.options.map((option, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className=" w-10 h-10 flex items-center justify-center  border border-black-40">
                          <p className=" text-xl ">{index + 1}</p>
                        </div>
                        <p key={option.optionValue} className=" text-base">
                          {option.optionText}
                        </p>
                      </div>
                    ))}
                  </div>
                  {question.image && (
                    <Image
                      src={`/uploads/${question.image}`}
                      alt="..."
                      width={200}
                      height={200}
                    />
                  )}
                </div>
                <button
                  onClick={() => deleteQuestion(question._id)}
                  className="w-[100px] h-10 mb-2  border border-red-70 bg-red-70 "
                >
                  <p className=" text-white-60 text-xs font-light  text-center ">
                    IZBRIŠI
                  </p>
                </button>
              </div>
            ))
          ) : (
            <p>No questions available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
