"use client";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import clsx from "clsx";
import axios from "axios";
import moment from "moment";

export default function Chat({ user }) {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // Initialize socket connection
    const newSocket = io("http://localhost:3003");
    setSocket(newSocket);

    // Fetch initial data
    const fetchMessages = async () => {
      try {
        const rez = await axios.get("http://localhost:3003/e-nastava/chat", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessages(rez.data);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchMessages();

    newSocket.on("messageSaved", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on("messagesDeleted", () => {
      setMessages([]);
    });

    // Clean up function
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  const handleSendMessage = async () => {
    if (socket && message.trim() !== "") {
      try {
        await axios.post(
          "http://localhost:3003/e-nastava/chat",
          { user, message },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const deleteMessages = async () => {
    try {
      await axios.delete("http://localhost:3003/e-nastava/chat", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.error("Error deleting messages:", error);
    }
  };

  return (
    <div className="w-[600px] flex flex-col gap-1">
      {user === "Jure" ? (
        <button
          onClick={deleteMessages}
          className="w-[150px] self-end h-10 border rounded-sm border-red-70 bg-red-70 "
        >
          <p className=" text-white-60 text-xs font-light text-center ">
            IZBRIŠI SVE PORUKE
          </p>
        </button>
      ) : (
        <div></div>
      )}
      <div className="flex flex-col gap-1">
        {messages.map((message, index) => (
          <div
            key={index}
            className={clsx(
              "flex flex-col items-start border rounded-sm text-white-61 p-3",
              {
                "self-end border-green-81 bg-green-81": message.user === user,
                "self-start border-green-82 bg-green-82": message.user !== user,
              }
            )}
          >
            <p className="text-base uppercase">{message.user}</p>
            <p className="text-sm ">{message.message}</p>
            <p className="text-xs text-gray-400 font-light">
              {moment(message.timestamp).format("MMMM Do YYYY, h:mm:ss a")}
            </p>
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
