"use client";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function TestvoviLayout({ children }) {
  const pathname = usePathname();
  return (
    <motion.div
      className="p-10 mb-24"
      key={pathname}
      initial="initialState"
      animate="animateState"
      exit="exitState"
      transition={{
        duration: 0.7,
      }}
      variants={{
        initialState: {
          opacity: 0,
          x: -50,
        },
        animateState: {
          opacity: 1,
          x: 0,
        },
        exitState: {
          opacity: 0,
          x: 50,
        },
      }}
    >
      {children}
    </motion.div>
  );
}
