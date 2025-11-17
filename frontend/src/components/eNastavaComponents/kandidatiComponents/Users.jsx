"use client";
import axios from "axios";
import clsx from "clsx";
import Notification from "@/components/Notification";
import { useState } from "react";

export default function Users({ users, setUsers }) {
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const resetMessageWithTimeout = (message, type = "success") => {
    setMessage(message);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Jeste li sigurni da želite izbrisati kandidata"))
      return;
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/e-nastava/kandidati/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUsers(users.filter((u) => u._id !== id));
      const message = response.data.message;
      if (message) resetMessageWithTimeout(message, "success");
    } catch (error) {
      resetMessageWithTimeout(
        error.response?.data?.message || "Greška pri brisanju kandidata.",
        "error"
      );
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row max-sm:flex-col justify-around border-b-[1px] border-black-40 text-base font-semibold ">
        <p>IME KANDIDATA</p>
        <p>KORISNIČKO IME</p>
        <p>ŠIFRA</p>
        <p>OPCIJE</p>
      </div>
      <Notification message={message} messageType={messageType} />
      {users && users.length > 0 ? (
        users.map((user) => (
          <div
            key={user._id}
            className=" grid grid-cols-4 max-sm:flex max-sm:flex-col max-sm:items-center gap-4 p-6  border-b-[1px] border-black-40 text-base"
          >
            <p>{user.name}</p>
            <p>{user.username}</p>
            <p>{user.password}</p>
            <div>
              <button
                onClick={() => deleteUser(user._id)}
                className="relative group w-[100px] h-10 border-red-71 bg-red-71 "
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#DA291C,#231F20)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease-in-out"></div>
                <span className="relative text-white-60 text-xs text-center font-light">
                  IZBRIŠI
                </span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center mt-4 text-gray-600">
          Nemate još nijednog kandidata.
        </p>
      )}
    </div>
  );
}
