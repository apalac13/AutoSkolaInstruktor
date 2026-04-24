"use client";
import Navigacija from "@/components/Navigacija";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";

export default function ENastavaLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      if (pathname !== "/e-nastava") {
        router.replace("/e-nastava");
      }
      return;
    }

    if (pathname === "/e-nastava") {
      router.replace("/e-nastava/testovi");
    }
  }, [loading, user, pathname, router]);

  return (
    <div className="mb-24">
      <div className="relative w-full h-[500px]">
        <Image
          src="/lukakandidati.jpg"
          alt="E-nastava naslovna"
          fill
          priority
          className="object-cover object-middle"
        />
        <div className="absolute inset-0 bg-[#000]/40">
          <Navigacija />
          <div className="absolute w-full top-1/2 left-1/2 -translate-x-1/2">
            <motion.div
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ duration: 1 }}
            >
              <p className=" text-4xl max-md:text-3xl font-bold italic  text-white-60">
                E-NASTAVA
              </p>
              <p className="text-xl max-md:text-lg text-white-60 font-light italic ">
                Dobrodošli na E-nastavu Autoškole Instruktor
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="p-10 max-xl:px-0"
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
