export default function InputField({
  label,
  id,
  type,
  name,
  value,
  onChange,
  placeholder = "",
}) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="flex flex-col items-start">
        <p className="text-lg max-sm:text-base">
          {label} <span className="text-red-71">*</span>
        </p>
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="border border-black-40 w-full h-[45px] p-1"
          placeholder={placeholder}
          required
        />
      </label>
    </div>
  );
}
