"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Notification from "@/components/Notification";

export default function TestResult({
  testResults,
  testResult,
  setTestResults,
}) {
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const resetMessageWithTimeout = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };
  const deleteTestResult = async (id) => {
    if (!window.confirm("Jeste li sigurni da želite izbrisati rezultat?"))
      return;

    try {
      const response = await axios.delete(
        `http://localhost:3003/e-nastava/rezultati/test/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setTestResults(testResults.filter((q) => q._id !== id));
      const message = response.data.message;
      if (message) resetMessageWithTimeout(message, "success");
    } catch (error) {
      resetMessageWithTimeout(
        error.response?.data?.message || "Greška pri brisanju pitanja.",
        "error"
      );
    }
  };
  return (
    <div className="grid grid-cols-4 gap-4 p-6  border-b-[1px] border-black-40 text-base">
      <Notification message={message} messageType={messageType} />
      <p>{testResult.name}</p>
      <p>{testResult.test.testName}</p>
      <p>
        {testResult.result}
        <span>%</span>{" "}
      </p>
      <div className="flex lg:flex-row flex-col gap-3">
        <Link href={`/e-nastava/rezultati/test/${testResult._id}`}>
          <button className="w-[100px] h-10 border border-black-40 bg-black-40 ">
            <p className=" text-white-60 text-xs font-light text-center ">
              POGLEDAJ
            </p>
          </button>
        </Link>
        <button
          onClick={() => deleteTestResult(testResult._id)}
          className="w-[100px] h-10 border border-red-71 bg-red-71 "
        >
          <p className=" text-white-60 text-xs font-light text-center ">
            IZBRIŠI
          </p>
        </button>
      </div>
    </div>
  );
}
