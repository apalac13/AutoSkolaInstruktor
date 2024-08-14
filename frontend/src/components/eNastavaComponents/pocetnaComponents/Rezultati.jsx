import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import clsx from "clsx";

export default function Rezultati() {
  const [results, setResults] = useState([]);
  const [socket, setSocket] = useState(null);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
    // Initialize socket connection
    const newSocket = io("http://localhost:3003");
    setSocket(newSocket);

    // Fetch initial data
    const fetchInitialData = async () => {
      try {
        const rez = await axios.get(
          "http://localhost:3003/e-nastava/pocetna/rezultati",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setResults(rez.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();

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
  }, []);

  const deleteResult = async (id) => {
    try {
      await axios.delete(
        `http://localhost:3003/e-nastava/pocetna/rezultati/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const rez = await axios.get(
        `http://localhost:3003/e-nastava/pocetna/rezultati`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setResults(rez.data);
    } catch (error) {
      console.error("Error deleting quiz", error);
      alert("There was an error deleting the quiz.");
    }
  };

  return (
    <div className={clsx(role === "user" ? "hidden" : "flex flex-col gap-10 ")}>
      <div className="flex gap-1 text-base items-end text-red-71">
        <p>02</p>
        <div className="w-20 h-[1px] bg-red-71 mb-[5px] "></div>
        <p>REZULTATI KANDIDATA</p>
      </div>
      <div>
        <div className="flex justify-around border-b-[1px] border-black-40 text-base font-semibold ">
          <p>IME</p>
          <p>KVIZ</p>
          <p>REZULTATI</p>
        </div>
        {results.map((result) => (
          <div
            key={result._id}
            className="flex justify-between  p-6  border-b-[1px] border-black-40 text-base"
          >
            <div className="w-full flex justify-between ">
              <p>{result.user}</p>
              <p>{result.quiz.quizname}</p>
              {result.answers.map((answer, index) => (
                <div key={index}>
                  <p>{index + 1}. PITANJE: </p>
                  <p>
                    {answer.selectedOption === answer.correctAnswer
                      ? "TOČNO"
                      : answer.correctAnswer === ""
                      ? answer.selectedOption
                      : "NETOČNO"}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => deleteResult(result._id)}
              className="w-[100px] h-10 border border-red-70 bg-red-70 "
            >
              <p className=" text-white-60 text-xs font-light text-center ">
                IZBRIŠI
              </p>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
