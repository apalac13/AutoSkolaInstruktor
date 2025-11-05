"use client";
import Navigacija from "@/components/Navigacija";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function OnlineTestvoviLayout({ children }) {
  const pathname = usePathname();
  return (
    <div className="mb-24">
      <div className=" bg-online-testovi bg-cover bg-no-repeat bg-center w-lvh h-[500px]   ">
        <div className="flex flex-col w-lvh h-[500px] bg-[#000]/50 ">
          <Navigacija />
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-[35%] justify-self-center self-center"
          >
            <p className=" text-4xl max-md:text-3xl font-bold italic  text-white-60">
              ONLINE TESTOVI
            </p>
            <p className="text-xl max-md:text-lg text-white-60 font-light italic ">
              Testirajte svoje znanje online uz pomoć testova koje vam nudimo
            </p>
          </motion.div>
        </div>
      </div>
      <motion.div
        className="p-10"
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
    </div>
  );
}
