"use client";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import Link from "next/link";
import Section from "@/components/Section";
import BlackButton from "@/components/buttons/BlackButton";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function Testovi() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  const items = [
    {
      sectionNumber: "01",
      sectionText: "ISPITI",
      text: "",
      firstButtonLink: `/e-nastava/testovi/kategorija-b`,
      firstButtonText: "KATEGORIJA B",
      secondButtonLink: `/e-nastava/testovi/prva-pomoc`,
      secondButtonText: "PRVA POMOĆ",
    },
    {
      sectionNumber: "02",
      sectionText: "DODATNA PITANJA",
      text: "Pored pitanja iz B kategorije u prilogu se nalaze dodatna pitanja za kategorije A, C i D kategoriju.",
      firstButtonLink: `/e-nastava/testovi/kategorija-a`,
      firstButtonText: "KATEGORIJA A",
      secondButtonLink: `/e-nastava/testovi/kategorija-cd`,
      secondButtonText: "KATEGORIJA C-D",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <SubNavigacija />
      <div className="flex flex-col  gap-24">
        {items.map((item, index) => (
          <div key={index} className="flex  flex-col gap-11">
            <div className="flex flex-col gap-6 items-start ">
              <Section number={item.sectionNumber} text={item.sectionText} />
              <p className="text-justify">{item.text}</p>
            </div>
            <div className="flex max-[470px]:flex-col items-start gap-4 ml-4">
              <Link href={item.firstButtonLink}>
                <BlackButton text={item.firstButtonText} />
              </Link>
              <Link href={item.secondButtonLink}>
                <BlackButton text={item.secondButtonText} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
