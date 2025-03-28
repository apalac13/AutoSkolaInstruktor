"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroOverlay() {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showOverlay && (
        <div className="fixed top-0 left-0 w-full h-full bg-black-40 z-[9999] flex justify-center items-center">
          <div className="animate-pulse ">
            <Image
              src="/icons/ASInstruktorLogoOrginalBW.svg"
              alt="Autoškola Instruktor logo"
              width={500}
              height={500}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
