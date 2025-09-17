"use client";
import { useRouter, useParams } from "next/navigation";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import { useState, useEffect } from "react";
import axios from "axios";
import Kviz from "@/components/eNastavaComponents/kvizoviComponents/Kviz";
import Rezultat from "@/components/eNastavaComponents/kvizoviComponents/Rezultat";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import Notification from "@/components/Notification";
import { motion } from "framer-motion";

export default function KvizPage() {
  const router = useRouter();
  const { kvizId } = useParams();
  const [finish, setFinish] = useState(false);
  const [quiz, setQuiz] = useState({});
  const { user, loading } = useContext(AuthContext);
  const [result, setResult] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [replay, setReplay] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const resetMessageWithTimeout = (message, type = "success") => {
    setMessage(message);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:3003/e-nastava/kvizovi/${kvizId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setQuiz(res.data))
      .catch((error) => {
        resetMessageWithTimeout(
          error.response?.data?.message || "Greška pri dohvaćanju kviza.",
          "error"
        );
      });
  }, [router, kvizId]);

  useEffect(() => {
    if (replay) {
      setResult(0);
      setUserAnswers([]);
      setReplay(false);
      setFinish(false);
    }
  }, [replay]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center">
      <SubNavigacija />
      <Notification message={message} messageType={messageType} />
      {!finish ? (
        <Kviz
          quiz={quiz}
          kvizId={kvizId}
          user={user}
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
          setFinish={setFinish}
          result={result}
          setResult={setResult}
          resetMessageWithTimeout={resetMessageWithTimeout}
        />
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Rezultat
            result={result}
            userAnswers={userAnswers}
            setFinish={setFinish}
            quiz={quiz}
            kvizId={kvizId}
            setReplay={setReplay}
          />
        </motion.div>
      )}
    </div>
  );
}
