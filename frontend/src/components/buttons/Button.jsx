import clsx from "clsx";

export default function Button({ type, width, text, color }) {
  return (
    <button
      type={type}
      className={clsx(
        `relative group w-[${width}] max-md:w-[150px] max-sm:h-14 h-16 px-3 text-white-60 overflow-hidden`,
        color === "red"
          ? "border-red-71 bg-red-71"
          : "border-black-40 bg-black-40"
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#DA291C,#231F20)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out"></div>
      <span className="relative text-base max-md:text-sm text-center font-light">
        {text}
      </span>
    </button>
  );
}
