import { motion } from "framer-motion";
import clsx from "clsx";

export default function Notification({ message, messageType }) {
  return (
    <>
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={clsx(
            "fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] mt-4 p-3 shadow-md uppercase w-full max-w-[500px] text-center",
            {
              "bg-green-80 text-white-60": messageType === "success",
              "bg-red-70 text-white-60": messageType === "error",
            }
          )}
        >
          {message}
        </motion.p>
      )}
    </>
  );
}
