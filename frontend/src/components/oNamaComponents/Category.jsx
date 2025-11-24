import { motion } from "framer-motion";
import Link from "next/link";

export default function Category({ category, index }) {
  return (
    <motion.div
      initial={{ x: -50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.7, duration: index * 0.2 }}
      className="flex items-center cursor-pointer"
    >
      <div className=" flex items-center justify-center w-[60px] h-[60px]  transition duration-400 ease-in-out border border-white-60  rounded-full hover:border-red-71   ">
        <p className="text-red-71 text-[26px] font-light">{category}</p>
      </div>
      <div className="flex flex-col text-sm  font-light mb-[21px] ">
        <Link
          href="/kategorije"
          className="self-end text-white-60 transition duration-00 ease-in-out  hover:text-gray-50 "
        >
          <p>SAZNAJ VIŠE...</p>
        </Link>
        <div className="w-72 max-[500px]:w-44 h-[1px] bg-white-60 "></div>
      </div>
    </motion.div>
  );
}
