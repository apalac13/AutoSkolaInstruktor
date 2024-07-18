"use client";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import clsx from "clsx";

export default function Chat({ user }) {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:3003");
    setSocket(newSocket);

    newSocket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up function
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (socket && message.trim() !== "") {
      socket.emit("sendMessage", { sender: user, message });
      setMessage("");
    }
  };

  return (
    <div className="w-[600px] flex flex-col gap-1">
      <div className="flex flex-col gap-1">
        {messages.map((message, index) => (
          <div
            key={index}
            className={clsx(
              "flex flex-col items-start border rounded-sm text-white-61 p-3",
              {
                "self-end border-green-81 bg-green-81": message.sender === user,
                "self-start border-green-82 bg-green-82":
                  message.sender !== user,
              }
            )}
          >
            <p className="text-base uppercase">{message.sender}</p>
            <p className="text-sm ">{message.message}</p>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-between ">
        <input
          type="text"
          value={message}
          className="w-full h-10 border-b border-black-40 p-1 "
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Poruka..."
        />
        <button
          onClick={handleSendMessage}
          className="w-[100px] h-10 border rounded-sm border-green-80 bg-green-80 "
        >
          <p className=" text-white-60 text-xs font-light text-center ">
            POŠALJI
          </p>
        </button>
      </div>
    </div>
  );
}
