"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const items = [
  {
    title: "HOSPITALITY STRUCTURED WITH THE RIGOR OF FINANCE.",
    image: "bg-gray-800",
  },
  {
    title: "EXPERIENCE CRAFTED WITH INTELLIGENCE AND EMOTIONAL INTENT.",
    image: "bg-orange-800",
  },
  {
    title: "WE ENGINEER PERFORMANCE THAT ENDURES ACROSS CYCLES.",
    image: "bg-blue-900",
  },
  {
    title: "THIS IS SMARTOTELS.",
    image: "bg-gray-900",
  },
];

export default function HospitalityStructured() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <section ref={targetRef} className={`relative bg-black text-white ${isDesktop ? 'h-[300vh]' : 'h-auto py-12'}`}>
      <div className={`${isDesktop ? 'sticky top-0 flex h-screen items-center overflow-hidden' : 'w-full'}`}>
        <motion.div 
          style={isDesktop ? { x } : {}} 
          className={`flex gap-4 px-4 ${!isDesktop ? 'overflow-x-auto snap-x pb-8' : ''}`}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className={`relative shrink-0 overflow-hidden rounded-xl ${item.image} ${
                isDesktop ? 'h-[80vh] w-[80vw] md:w-[60vw]' : 'h-[60vh] w-[85vw] snap-center'
              }`}
            >
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16">
                <h2 className="text-2xl md:text-5xl lg:text-6xl font-black uppercase leading-tight text-center">
                  {item.title}
                </h2>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
