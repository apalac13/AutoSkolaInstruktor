export default function Section({ number, text }) {
  return (
    <div className=" flex gap-1 text-base items-end text-red-71">
      <p>{number}</p>
      <div className=" w-24 h-[1px] bg-red-71 mb-[5px]"></div>
      <p>{text}</p>
    </div>
  );
}
