"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ({ step }) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="grid grid-cols-[auto,1fr]  gap-x-5 gap-y-6 items-center ">
      <div className="relative w-24 h-24 max-sm:w-20 max-sm:h-20">
        <svg viewBox="0 0 96 96" className="w-full h-full">
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
          className="absolute top-8 max-sm:top-6 left-8 max-sm:left-6 "
        />
      </div>
      <div className="flex flex-col items-start">
        <p className="text-base max-xl:text-sm text-red-71">{step.number}</p>
        <p className="text-xl font-semibold text-black-40 text-start leading-tight max-sm:leading-none">
          {step.title}
        </p>
      </div>
      <div></div>
      <p className="w-[370px] max-sm:w-full text-base self-center text-justify max-lg:text-sm">
        {step.description}
      </p>
    </div>
  );
}
