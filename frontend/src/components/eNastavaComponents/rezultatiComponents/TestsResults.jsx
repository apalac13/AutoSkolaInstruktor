"use client";
import Section from "@/components/Section";
import { useState, useEffect } from "react";
import axios from "axios";
import TestResult from "./TestResult";
import Notification from "@/components/Notification";

export default function TestsResults({ user }) {
  const [testResults, setTestResults] = useState([]);
  const [loadingResults, setLoadingResults] = useState(true);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const resetMessageWithTimeout = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };
  useEffect(() => {
    setLoadingResults(true);

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/e-nastava/rezultati/testovi`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const allResults = res.data;
        const filteredResults =
          user?.role === "admin"
            ? allResults
            : allResults.filter((r) => r?.username === user?.username);

        setTestResults(filteredResults);
      })
      .catch((error) => {
        resetMessageWithTimeout(
          error.response?.data?.message ||
            "Greška prilikom dohvaćanja rezultata.",
          "error"
        );
      })
      .finally(() => {
        setLoadingResults(false);
      });
  }, [user]);

  if (loadingResults)
    return (
      <p className="text-center mt-4 text-gray-600">Učitavanje rezultata...</p>
    );

  return (
    <div className="flex flex-col gap-11">
      <Notification message={message} messageType={messageType} />
      <Section number={"01"} text={"REZULTATI TESTOVA"} />
      <div className="flex flex-col">
        <div className="flex  flex-row max-sm:flex-col justify-around border-b-[1px] border-black-40 text-base font-semibold ">
          <p>KANDIDAT</p>
          <p>TEST</p>
          <p>REZULTAT</p>
          <p>OPCIJE</p>
        </div>
        {testResults.length > 0 ? (
          testResults.map((testResult) => (
            <TestResult
              key={testResult._id}
              user={user}
              testResults={testResults}
              testResult={testResult}
              setTestResults={setTestResults}
            />
          ))
        ) : (
          <p className="text-center mt-4 text-gray-600">
            Nema dostupnih rezultata.
          </p>
        )}
      </div>
    </div>
  );
}
