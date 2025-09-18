"use client";
import Section from "@/components/Section";
import { useState, useEffect } from "react";
import axios from "axios";
import TestResult from "./TestResult";
import Notification from "@/components/Notification";

export default function TestsResults() {
  const [testResults, setTestResults] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const resetMessageWithTimeout = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3003/e-nastava/rezultati/testovi`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setTestResults(res.data))
      .catch((error) => {
        resetMessageWithTimeout(
          error.response?.data?.message ||
            "Greška prilikom dohvaćanja rezultata.",
          "error"
        );
      });
  }, []);

  return (
    <div className="flex flex-col gap-11">
      <Notification message={message} messageType={messageType} />
      <Section number={"01"} text={"REZULTATI TESTOVA"} />
      <div className="flex flex-col">
        <div className="flex justify-around border-b-[1px] border-black-40 text-base font-semibold ">
          <p>KANDIDAT</p>
          <p>TEST</p>
          <p>REZULTAT</p>
          <p>OPCIJE</p>
        </div>
        {testResults.map((testResult) => (
          <TestResult
            key={testResult._id}
            testResults={testResults}
            testResult={testResult}
            setTestResults={setTestResults}
          />
        ))}
      </div>
    </div>
  );
}
