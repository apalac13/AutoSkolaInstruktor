export default function Category({ category }) {
  return (
    <div className="flex items-center cursor-pointer">
      <div className=" flex items-center justify-center w-[60px] h-[60px] border border-white-60  rounded-full   ">
        <p className="text-red-71 text-[26px] font-light">{category}</p>
      </div>
      <div className="flex flex-col text-sm font-light text-white-60 mb-[21px] ">
        <p className="self-end">SAZNAJ VIŠE...</p>
        <div className="w-72 h-[1px] bg-white-60 "></div>
      </div>
    </div>
  );
}
