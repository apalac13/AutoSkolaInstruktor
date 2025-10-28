import Link from "next/link";
import Section from "@/components/Section";
import BlackButton from "@/components/buttons/BlackButton";

export default function PrvaPomoc() {
  const buttons = [
    "TEST 1",
    "TEST 2",
    "TEST 3",
    "TEST 4",
    "TEST 5",
    "TEST 6",
    "TEST 7",
    "TEST 8",
    "TEST 9",
    "TEST 10",
  ];

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col items-start gap-6">
        <Section number={"PP"} text={"PRVA POMOĆ"} />
        <p className="text-justify ">
          Ovdje se nalazi
          <strong> 10 testova za prvu pomoć.</strong> Svako pitanje nosi po 1
          bod te svako pitanje ima 1 točan odgovor.
        </p>
      </div>
      <div className="grid grid-cols-6 max-xl:grid-cols-5 max-[1400px]:grid-cols-4 max-[1120px]:grid-cols-3 max-[570px]:grid-cols-2 max-[410px]:grid-cols-1 gap-y-10 max-[1400px]:gap-y-5 ml-4 ">
        {buttons.map((description, index) => (
          <Link
            key={index}
            href={`/online-testovi/prva-pomoc/${description
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            <BlackButton text={description} />
          </Link>
        ))}
      </div>
    </div>
  );
}
