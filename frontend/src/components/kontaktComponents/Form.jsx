import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Button from "../buttons/Button";
import InputField from "../InputField";
import Notification from "../Notification";

export default function Form() {
  const [formData, setFormData] = useState({
    person: "",
    email: "",
    phoneNumber: "",
    message: "",
  });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const resetMessageWithTimeout = (msg, type = "success") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/kontakt`,
        formData
      );

      if (response.status === 200) {
        resetMessageWithTimeout(response.data.message, "success");
        setFormData({
          person: "",
          email: "",
          phoneNumber: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Greška pri slanju podataka:", error);
      const msg =
        error.response?.data?.message ||
        "Dogodila se greška pri slanju podataka.";
      resetMessageWithTimeout(msg, "error");
    }
  };

  return (
    <div className="max-[500px]:w-full flex flex-col gap-16 max-[500px]:px-6">
      <p className="text-2xl">POŠALJI UPIT</p>
      <Notification message={message} messageType={messageType} />
      <form
        className="w-[470px] max-[500px]:w-full flex flex-col gap-4"
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
          placeholder="primjer@gmail.com"
        />
        <InputField
          label={"KONTAKT BROJ"}
          id={"phone-number"}
          type={"text"}
          name={"phoneNumber"}
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        <div className="w-full">
          <label htmlFor="message" className="flex flex-col items-start">
            <p className="text-lg max-sm:text-base">
              PORUKA <span className="text-red-71">*</span>{" "}
            </p>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="border border-black-40 w-full p-1 h-[150px]  bg-white-60"
              required
            ></textarea>
          </label>
        </div>
        <Button type={"submit"} width={"full"} text={"POŠALJI"} color={"red"} />
      </form>
    </div>
  );
}
