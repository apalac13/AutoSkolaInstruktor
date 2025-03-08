"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Instruction from "@/components/onlineTestoviComponents/Instruction";
import SingleQuestionView from "@/components/onlineTestoviComponents/SingleQuestionView";
import AllQuestionView from "@/components/onlineTestoviComponents/AllQuestionView";
import Section from "@/components/Section";

export default function Ispit() {
  const { ispitId } = useParams();
  const [test, setTest] = useState(null);
  const [instruction, setInstruction] = useState(true);
  const [option, setOption] = useState("");

  useEffect(() => {
    if (ispitId) {
      axios
        .get(`http://localhost:3003/online-testovi/${ispitId}`)
        .then((res) => setTest(res.data))
        .catch((err) => console.log(err.message));
    }
  }, [ispitId]);

  return (
    <div className="m-5">
      <div className="mb-11">
        <Section number={"ISPIT"} text={"1"} />
      </div>
      {instruction ? (
        <Instruction setOption={setOption} setInstruction={setInstruction} />
      ) : option === "single" ? (
        <SingleQuestionView test={test} />
      ) : (
        <AllQuestionView test={test} />
      )}
    </div>
  );
}
