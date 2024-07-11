"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import io from "socket.io-client";

export default function Pocetna() {
  const router = useRouter();
  const [quizes, setQuizes] = useState([]);
  const [results, setResults] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/e-nastava");
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
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

    // Initialize socket connection
    const newSocket = io("http://localhost:3003");
    setSocket(newSocket);

    // Fetch initial data
    const fetchInitialData = async () => {
      try {
        const [resQuizes, resResults] = await Promise.all([
          axios.get("http://localhost:3003/e-nastava/pocetna/kvizovi", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://localhost:3003/e-nastava/pocetna/rezultati", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);
        setQuizes(resQuizes.data);
        setResults(resResults.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();

    // Listen for socket events
    newSocket.on("quizRemoved", (removedQuizId) => {
      // Update quizzes state by filtering out the removed quiz
      setQuizes((prevQuizes) =>
        prevQuizes.filter((quiz) => quiz._id !== removedQuizId)
      );
    });
    newSocket.on("quizUpdated", (updatedQuiz) => {
      // Update quizzes state by replacing the updated quiz
      setQuizes((prevQuizes) => [...prevQuizes, updatedQuiz]);
    });
    newSocket.on("resultsUpdated", (updatedResult) => {
      // Update quizzes state by filtering out the removed quiz
      setResults((prevResults) => [...prevResults, updatedResult]);
    });
    // Clean up function
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, [router]);

  const uploadQuiz = async (id) => {
    try {
      await axios.put(
        `http://localhost:3003/e-nastava/pocetna/${id}`,
        { upload: false },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const rez = await axios.get(
        "http://localhost:3003/e-nastava/pocetna/kvizovi",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setQuizes(rez.data);
    } catch (error) {
      console.error("Error uploading quiz", error);
      alert("There was an error uploading the quiz.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <SubNavigacija />
      <div>
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
                <Link
                  href={`/e-nastava/pocetna/${quiz._id}`}
                  className="w-[100px]"
                >
                  <button className="w-[100px] h-10  border border-black-40 bg-black-40 ">
                    <p className=" text-white-60 text-sm font-light  text-center ">
                      IGRAJ
                    </p>
                  </button>
                </Link>
                <button
                  onClick={() => uploadQuiz(quiz._id)}
                  className="w-[100px] h-10 border border-red-70 bg-red-70 "
                >
                  <p className=" text-white-60 text-xs font-light text-center ">
                    UKLONI
                  </p>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* rezultati kviza */}
      <div>
        <div className="flex flex-col">
          {results.map((result) => (
            <div
              key={result._id}
              className="flex gap-4 p-6  border-b-[1px] border-black-40 text-base"
            >
              <p>{result.user}</p>
              {result.answers.map((answer, index) => (
                <div key={index}>
                  <p>{index + 1}. PITANJE: </p>
                  <p>
                    {answer.selectedOption === answer.correctAnswer
                      ? "TOČNO"
                      : "NETOČNO"}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
