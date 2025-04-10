import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Button from "../buttons/Button";
import InputField from "../InputField";

const initialFormData = {
  person: "",
  email: "",
  date: "",
  placeOfBirth: "",
  phoneNumber: "",
  categories: [],
  message: "",
};

const categories = ["A", "A1", "B", "BE", "C1", "C1E", "C", "CE"];

export default function Form() {
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState(null);

  const resetMessageWithTimeout = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      categories: checked
        ? [...prev.categories, value]
        : prev.categories.filter((cat) => cat !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3003/online-prijava",
        formData
      );
      if (response.status === 200) {
        resetMessageWithTimeout(response.data.message);
        setFormData(initialFormData);
      }
    } catch (error) {
      console.error("Greška pri slanju podataka:", error);
      const msg =
        error.response?.data?.message ||
        "Dogodila se greška pri slanju podataka.";
      resetMessageWithTimeout(msg);
    }
  };

  return (
    <form
      className="w-[500px] max-[500px]:w-full flex flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <InputField
        label={"IME I PREZIME"}
        id={"person"}
        type={"text"}
        name={"person"}
        value={formData.person}
        onChange={handleChange}
      />
      <InputField
        label={"EMAIL"}
        id={"email"}
        type={"email"}
        name={"email"}
        value={formData.email}
        onChange={handleChange}
      />
      <InputField
        label={"DATUM I GODINA ROĐENJA"}
        id={"date"}
        type={"date"}
        name={"date"}
        value={formData.date}
        onChange={handleChange}
      />
      <InputField
        label={"MJESTO ROĐENJA"}
        id={"place"}
        type={"text"}
        name={"placeOfBirth"}
        value={formData.placeOfBirth}
        onChange={handleChange}
      />
      <InputField
        label={"KONTAKT BROJ"}
        id={"phone-number"}
        type={"text"}
        name={"phoneNumber"}
        value={formData.phoneNumber}
        onChange={handleChange}
      />
      <div className="w-full flex flex-col gap-3 items-start ">
        <p className="text-lg max-xl:text-base">
          KATEGORORIJA <span className="text-red-71">*</span>{" "}
        </p>
        <div className="grid grid-cols-2 justify-items-start gap-x-28 gap-y-3 ">
          {categories.map((category, index) => (
            <label
              key={index}
              htmlFor={category}
              className="flex  items-end gap-2 cursor-pointer "
            >
              <input
                id={category}
                type="checkbox"
                value={category}
                onChange={handleCategoryChange}
                checked={formData.categories.includes(category)}
                className="online-prijava-checkbox w-[50px] h-[50px] max-xl:w-[40px] max-xl:h-[40px] border border-black-40 bg-white-60 checked:bg-black-40 cursor-pointer "
              />
              <p className="text-lg max-xl:text-base leading-none">
                {category}{" "}
              </p>
            </label>
          ))}
        </div>
      </div>
      <label htmlFor="message" className="flex flex-col items-start">
        <p className="text-lg max-xl:text-base">
          NAPOMENA <span className="font-light">(neobavezno)</span>
        </p>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="border border-black-40 w-full p-1 h-[150px] max-xl:h-[100px] bg-white-60"
        ></textarea>
      </label>
      <Button type={"submit"} width={"full"} text={"POŠALJI"} color={"red"} />
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white-60  mt-4 shadow-md uppercase p-3 bg-green-80 "
        >
          {message}
        </motion.p>
      )}
    </form>
  );
}
