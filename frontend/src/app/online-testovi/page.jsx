import Link from "next/link";

export default function OnlineTestovi() {
  return (
    <div className="flex gap-4 ">
      <Link href={`/online-testovi/kategorija-b`} className="w-[200px]">
        <button className="w-[200px] h-16  border border-black-40 bg-black-40 ">
          <p className=" text-white-60 text-base font-light  text-center ">
            KATEGORIJA B
          </p>
        </button>
      </Link>
      <Link href={`/online-testovi/prva-pomoc`} className="w-[200px]">
        <button className="w-[200px] h-16  border border-black-40 bg-black-40 ">
          <p className=" text-white-60 text-base font-light  text-center ">
            PRVA POMOĆ
          </p>
        </button>
      </Link>
    </div>
  );
}
