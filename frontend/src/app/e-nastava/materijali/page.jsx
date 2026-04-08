"use client";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import Section from "@/components/Section";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import Document from "@/components/eNastavaComponents/Document";

export default function Materijali() {
  const { user, loading } = useContext(AuthContext);
  const documents = [
    {
      title: "Zakon o osnovama sigurnosti prometa na cestama",
      file: "Zakon-o-osnovama-sigurnosti-prometa-na-cestama.pdf",
    },
    {
      title: "Prometni-znakovi",
      file: "Prometni-znakovi.pdf",
    },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <SubNavigacija />
      <div className="w-[600px] max-sm:w-full flex flex-col gap-12">
        <Section number={"01"} text={"MATERIJALI ZA UČENJE"} />
        <div className="flex flex-wrap items-start gap-6">
          {documents.map((document, index) => (
            <Document key={index} document={document} />
          ))}
        </div>
      </div>
    </div>
  );
}
