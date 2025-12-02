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

  function formatTimeDifference(dateString) {
    const start = new Date(dateString);
    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();
    let hours = now.getHours() - start.getHours();

    // ako su dani negativni → pozajmi iz mjeseca
    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }

    // ako su mjeseci negativni → pozajmi iz godine
    if (months < 0) {
      months += 12;
      years--;
    }

    // ako su sati negativni → pozajmi iz dana
    if (hours < 0) {
      hours += 24;
      days--;
    }

    const parts = [];
    if (years > 0) parts.push(`${years} god`);
    if (months > 0) parts.push(`${months} mj`);
    if (days > 0) parts.push(`${days} dana`);
    if (hours > 0) parts.push(`${hours} h`);

    return parts.join(" ");
  }

  function formatDate(dateString) {
    const d = new Date(dateString);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();

    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");

    return `${day}.${month}.${year}. ${hours}:${minutes}:${seconds}`;
  }

  return (
    <div className="grid grid-cols-5 max-sm:flex max-sm:flex-col items-center gap-4 p-6  border-b-[1px] border-black-40 text-base">
      <Notification message={message} messageType={messageType} />
      <p>{testResult.name}</p>
      <p>{testResult.test.testName}</p>
      <p>{formatDate(testResult.createdAt)}</p>
      <div className="flex flex-col gap-1">
        <p>
          {testResult.points}/{testResult.totalPoints}
        </p>
        <p>
          {testResult.result}
          <span>%</span>{" "}
        </p>
      </div>
      <div className="flex flex-col items-center gap-3 ">
        <Link href={`/e-nastava/rezultati/test/${testResult._id}`}>
          <EButton
            type={"button"}
            width={"150px"}
            text={"POGLEDAJ"}
            color={"black"}
          />
        </Link>
        {user.role === "admin" && (
          <button
            onClick={() => deleteTestResult(testResult._id)}
            className="relative group w-[150px] h-12 border-red-71 bg-red-71 "
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#DA291C,#231F20)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out"></div>
            <span className="relative text-white-60 text-sm text-center font-light">
              IZBRIŠI
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
