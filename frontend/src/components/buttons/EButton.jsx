import clsx from "clsx";

export default function EButton({ type, width, text, color }) {
  return (
    <button
      type={type}
      style={{ width }}
      className={clsx(
        `relative group h-10  `,

        {
          "border-red-71 bg-red-71 ": color === "red",
          "border-black-40 bg-black-40  ": color === "black",
          "bg-green-80 text-white-60": color === "green",
        }
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#DA291C,#231F20)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out"></div>
      <span className="relative text-white-60 text-xs text-center font-light">
        {text}
      </span>
    </button>
  );
}
