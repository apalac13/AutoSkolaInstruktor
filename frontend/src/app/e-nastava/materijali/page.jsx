"use client";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import Section from "@/components/Section";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Materijali() {
  const { user, loading } = useContext(AuthContext);
  const documents = [
    {
      title: "Zakon o osnovama sigurnosti prometa na cestama",
      file: "Zakon-o-osnovama-sigurnosti-prometa-na-cestama.pdf",
    },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <SubNavigacija />
      <div className="w-[600px] max-sm:w-full flex flex-col gap-12">
        <Section number={"01"} text={"MATERIJALI ZA UČENJE"} />
        <div className="flex flex-wrap gap-1">
          {documents.map((document) => (
            <div
              key={document.file}
              className="flex flex-col items-center justify-center w-40"
            >
              <div className="flex flex-col gap-2 items-center justify-center">
                <Image
                  src="/icons/pdf.svg"
                  alt="pdf logo"
                  width={64}
                  height={64}
                />
                <p className="text-sm">{document.title}</p>
              </div>
              <div>
                <Link
                  href={`/documents/${document.file}`}
                  download
                  className="flex flex-col "
                >
                  <p className="text-sm text-red-71 hover:text-gray-50">
                    klikni ovdje za preuzimanje
                  </p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
