"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Instruction from "@/components/eNastavaComponents/testoviComponents/Instruction";
import ESingleQuestionView from "@/components/eNastavaComponents/testoviComponents/ESingleQuestionView";
import EAllQuestionView from "@/components/eNastavaComponents/testoviComponents/EAllQuestionView";
import Section from "@/components/Section";
import { AuthContext } from "@/context/AuthContext";

export default function Ispit() {
  const { ispitId } = useParams();
  const router = useRouter();
  const [test, setTest] = useState(null);
  const [instruction, setInstruction] = useState(true);
  const [option, setOption] = useState("");
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (ispitId) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/e-nastava/testovi/${ispitId}`)
        .then((res) => setTest(res.data))
        .catch((err) => console.log(err.message));
    }
  }, [ispitId]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/e-nastava/testovi");
    }
  }, [loading, user, router]);

  if (loading || !test || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-5">
      <div className="mb-11">
        <Section
          number={"ISPIT"}
          text={test ? test.testName.replace("ispit-", "") : ""}
        />
      </div>

      {instruction ? (
        <Instruction setOption={setOption} setInstruction={setInstruction} />
      ) : option === "single" ? (
        <ESingleQuestionView test={test} user={user} />
      ) : (
        <EAllQuestionView test={test} user={user} />
      )}
    </div>
  );
}
