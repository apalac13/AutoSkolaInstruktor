export default function BlackButton({ text }) {
  return (
    <button className="relative group w-[200px] max-md:h-14  h-16 border border-black-40 bg-black-40 text-white-60 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#DA291C,#231F20)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out"></div>
      <span className="relative text-base max-md:text-sm text-center">
        {text}
      </span>
    </button>
  );
}
