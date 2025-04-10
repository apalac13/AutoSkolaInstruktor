export default function InputField({ label, id, type, name, value, onChange }) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="flex flex-col items-start">
        <p className="text-lg max-xl:text-base">
          {label} <span className="text-red-71">*</span>
        </p>
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="border border-black-40 w-full h-[50px] max-xl:h-[40px] p-1"
          required
        />
      </label>
    </div>
  );
}
