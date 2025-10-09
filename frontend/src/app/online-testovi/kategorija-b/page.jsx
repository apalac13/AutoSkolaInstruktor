import Link from "next/link";
import Section from "@/components/Section";
import BlackButton from "@/components/buttons/BlackButton";

export default function KategorijaB() {
  const buttons = Array.from(
    { length: 12 },
    (_, index) => `ISPIT ${index + 1}`
  );

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col items-start gap-6">
        <Section number={"B"} text={"kategorija"} />
        <p className="text-justify ">
          Ovdje se nalazi<strong> 12 testova</strong> za polaganje vozačkog
          ispita iz propisa o sigurnosti prometa na cestama. Svaki test sadrži{" "}
          <strong>40 pitanja</strong>. Svako pitanje može imati jedan ili više
          točnih odgovora.
        </p>
      </div>
      <div className="grid grid-cols-6 max-xl:grid-cols-5 max-[1400px]:grid-cols-4 max-[1120px]:grid-cols-3 max-[570px]:grid-cols-2 max-[410px]:grid-cols-1 gap-y-10 max-[1400px]:gap-y-5 ml-4 ">
        {buttons.map((description, index) => (
          <Link
            key={index}
            href={`/online-testovi/kategorija-b/${description
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
