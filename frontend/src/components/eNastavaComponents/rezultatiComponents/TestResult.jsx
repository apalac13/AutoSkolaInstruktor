"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Notification from "@/components/Notification";
import EButton from "@/components/buttons/EButton";

export default function TestResult({
  user,
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
        `${process.env.NEXT_PUBLIC_API_URL}/e-nastava/rezultati/test/${id}`,
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
    <div className="grid grid-cols-4 max-sm:flex max-sm:flex-col max-sm:items-center gap-4 p-6  border-b-[1px] border-black-40 text-base">
      <Notification message={message} messageType={messageType} />
      <p>{testResult.name}</p>
      <p>{testResult.test.testName}</p>
      <div className="flex flex-col gap-1">
        <p>
          {testResult.points}/{testResult.totalPoints}
        </p>
        <p>
          {testResult.result}
          <span>%</span>{" "}
        </p>
      </div>
      <div className="flex lg:flex-row flex-col gap-3">
        <Link href={`/e-nastava/rezultati/test/${testResult._id}`}>
          <EButton
            type={"button"}
            width={"100px"}
            text={"POGLEDAJ"}
            color={"black"}
          />
        </Link>
        {user.role === "admin" && (
          <button
            onClick={() => deleteTestResult(testResult._id)}
            className="relative group w-[100px] h-10 border-red-71 bg-red-71 "
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#DA291C,#231F20)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out"></div>
            <span className="relative text-white-60 text-xs text-center font-light">
              IZBRIŠI
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
