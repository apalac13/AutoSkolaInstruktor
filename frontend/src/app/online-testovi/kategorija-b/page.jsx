import Link from "next/link";

export default function KategorijaB() {
  const buttons = Array.from(
    { length: 12 },
    (_, index) => `ISPIT ${index + 1}`
  );

  return (
    <div className="flex justify-center items-center  flex-wrap gap-8">
      {buttons.map((description, index) => (
        <Link
          key={index}
          href={`/online-testovi/kategorija-b/${description
            .toLowerCase()
            .replace(" ", "-")}`}
          className="w-[200px]"
        >
          <button className="w-[200px] h-16  border border-black-40 bg-black-40 ">
            <p className=" text-white-60 text-base font-light  text-center ">
              {description}
            </p>
          </button>
        </Link>
      ))}
    </div>
  );
}
