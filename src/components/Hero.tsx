"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

const phrases = [
  "THIS IS SMARTOTELS",
  "THIS IS INTELLIGENCE",
  "THIS IS THE FUTURE",
  "THIS IS EXPERIENCE",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black text-white">
      {/* Background Image Placeholder - Replace with actual image */}
      <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-black/40 z-10" />
         {/* Using a placeholder gradient/color for now if no image is available, or a generic one */}
         <div className="w-full h-full bg-gradient-to-br from-orange-500/20 to-blue-900/40 animate-pulse" />
         {/* Ideally we would use <Image src="..." fill ... /> here */}
      </div>

      <div className="relative z-20 text-center px-4">
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            initial={{ y: 40, opacity: 0, filter: "blur(10px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: -40, opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-4xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
          >
            {phrases[index]}
          </motion.h1>
        </AnimatePresence>
      </div>
    </section>
  );
}
