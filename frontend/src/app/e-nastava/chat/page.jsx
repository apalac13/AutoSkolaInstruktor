"use client";
import { useState, useEffect } from "react";
import SubNavigacija from "@/components/eNastavaComponents/SubNavigacija";
import Chat from "@/components/eNastavaComponents/chatComponents/Chat";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function ChatPage() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center mb-28">
      <SubNavigacija />
      <Chat user={user.name} />
    </div>
  );
}
