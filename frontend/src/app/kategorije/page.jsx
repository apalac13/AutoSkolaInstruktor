import Navigacija from "@/components/Navigacija";

export default function Kategorije() {
  return (
    <div>
      <div className=" bg-category-title bg-cover bg-no-repeat bg-center w-lvh h-[500px]   ">
        <div className="flex flex-col w-lvh h-[500px] bg-[#000]/80 ">
          <Navigacija />
          <p className="absolute top-1/3 left-[41%] text-4xl font-bold italic  text-white-60">
            KATEGORIJE
          </p>
        </div>
      </div>
      <div></div>
    </div>
  );
}
