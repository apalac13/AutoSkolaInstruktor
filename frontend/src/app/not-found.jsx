"use client";
import Link from "next/link";
import Button from "@/components/buttons/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
      <h1 className="text-7xl font-extrabold text-red-71 mb-4">404</h1>
      <p className="text-2xl text-gray-51 mb-6  italic">
        Ova stranica ne postoji .
      </p>

      <Link href={"/"}>
        <Button
          type={"button"}
          width={"200px"}
          text={"NATRAG NA POČETNU"}
          color={"red"}
        />
      </Link>
    </div>
  );
}
