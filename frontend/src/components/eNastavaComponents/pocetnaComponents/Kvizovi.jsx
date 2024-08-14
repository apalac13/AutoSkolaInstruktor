import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import Link from "next/link";

export default function Kvizovi() {
  const [quizes, setQuizes] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Initialize socket connection
    const newSocket = io("http://localhost:3003");
    setSocket(newSocket);

    // Fetch initial data
    const fetchInitialData = async () => {
      try {
        const rez = await axios.get(
          "http://localhost:3003/e-nastava/pocetna/kvizovi",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQuizes(rez.data);
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
    // Clean up function
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

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
    <div className="flex flex-col  gap-10">
      <div className="flex gap-1 text-base items-end text-red-71">
        <p>01</p>
        <div className="w-20 h-[1px] bg-red-71 mb-[5px] "></div>
        <p>AKTUALNI KVIZOVI</p>
      </div>
      <div>
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
  );
}
