"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ({ step }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="grid grid-cols-[auto,1fr]  gap-x-5 gap-y-6 items-center ">
      <div className="relative w-24 h-24">
        <svg width="96" height="96">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="#fff"
            stroke="#969696"
            strokeWidth="2"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="#fff"
            stroke="#DA291C"
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: 0 }}
            transition={{ duration: 2 }}
            viewport={{ once: true }}
          />
        </svg>
        <Image
          src={step.icon}
          alt="stethoscope"
          width={32}
          height={32}
          className="absolute top-8 left-8 "
        />
      </div>
      <div className="flex flex-col items-start">
        <p className="text-base max-xl:text-sm text-red-71">{step.number}</p>
        <p className="text-xl font-semibold text-black-40 text-start leading-tight">
          {step.title}
        </p>
      </div>
      <div></div>
      <p className="w-[370px] max-[500px]:w-full  text-base self-center text-justify max-lg:text-sm">
        {step.description}
      </p>
    </div>
  );
}
