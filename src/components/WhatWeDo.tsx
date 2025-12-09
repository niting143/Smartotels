"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import performance1 from "../assets/perfromance.png";
import performance2 from "../assets/perfromance2.png";
import performance3 from "../assets/performance3.png";

// Reusable transition
const textTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const };

// --- PARALLAX IMAGE COMPONENT ---
function ParallaxImage({ src, alt }: { src: StaticImageData; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Image moves slightly slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1.15]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <motion.div style={{ y, scale }} className="w-full h-full relative">
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
      </motion.div>
    </div>
  );
}

export default function WhatWeDo() {
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

  // Track main section scroll
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // --- Horizontal Animation Logic (Deck of Cards) ---
  const x2 = useTransform(scrollYProgress, [0.15, 0.45], ["110%", "0%"]);
  const x3 = useTransform(scrollYProgress, [0.55, 0.85], ["110%", "0%"]);

  // --- Vertical Text Parallax (Subtle Floating Effect) ---
  // Text moves slightly upward as we scroll deep into the section
  const yText = useTransform(scrollYProgress, [0, 1], ["30px", "-30px"]);

  return (
    <section 
      ref={targetRef} 
      className="relative h-auto lg:h-[300vh] bg-white text-black"
    >
      
      {/* Sticky Container */}
      <div className="relative lg:sticky lg:top-0 h-auto lg:h-screen overflow-hidden flex flex-col">
        
        {/* --- CONTENT CONTAINER --- */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-0 md:px-12 pt-[15vh] lg:pt-[25vh] pb-12 lg:pb-24">
          
          {/* Main Title */}
          <div className="text-center mb-8 lg:mb-12 shrink-0 relative z-40">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={textTransition}
              className="text-2xl md:text-5xl font-extrabold uppercase tracking-widest text-[#BEA787] inline-block bg-white/80 backdrop-blur-sm px-4 py-2"
            >
              Performance + Intelligence
            </motion.h2>
          </div>

          {/* --- STACK AREA --- */}
          <div className="relative w-full h-auto lg:h-[600px] flex flex-col gap-8 lg:block">
            
            {/* CARD 1: Asset Management */}
            <div className="relative w-full h-auto lg:absolute lg:inset-0 lg:h-full bg-white shadow-2xl border border-gray-100 z-10">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-2 h-full">
                {/* Text Area */}
                <div className="lg:col-span-2 flex flex-col justify-center p-6 lg:p-12 order-2 lg:order-1 overflow-hidden">
                   <motion.div 
                     style={{ y: isDesktop ? yText : 0 }} // Apply parallax only on Desktop
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={textTransition}
                   >
                     <h3 className="text-2xl lg:text-5xl font-bold font-open-sans mb-4 leading-tight text-black">
                       Asset <br /> Management
                     </h3>
                     <p className="text-base lg:text-xl font-open-sans italic font-semibold mb-4 lg:mb-8 text-black">
                       Performance. Discipline. Value.
                     </p>
                     <p className="text-[#474747] mb-4 lg:mb-6 text-sm font-open-sans font-regular lg:text-lg leading-relaxed">
                       Smartotels strengthens profitability through rigorous operational oversight and strategic decision making.
                     </p>
                     <p className="text-[#474747] text-sm font-open-sans font-regular lg:text-lg leading-relaxed">
                       We focus on revenue growth, cost efficiency, brand integrity, and guest experience to elevate asset performance.
                     </p>
                   </motion.div>
                </div>
                {/* Image Area */}
                <div className="lg:col-span-1 relative w-full h-[250px] lg:h-full order-1 lg:order-2">
                   <ParallaxImage src={performance1} alt="Asset Management" />
                </div>
                {/* Highlight Box */}
                <div className="lg:col-span-1 bg-[#2F4E54] text-[#D9D9D9] p-6 lg:p-12 flex flex-col justify-center items-center text-center order-3 lg:order-3">
                  <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...textTransition, delay: 0.2 }}
                    className="text-base lg:text-2xl font-bold leading-relaxed"
                  >
                    The goal is clear: <br/> deliver stronger results and increase long term value.
                  </motion.p>
                </div>
              </div>
            </div>

            {/* CARD 2: Intelligence + Foresight */}
            <motion.div 
              style={{ x: isDesktop ? x2 : 0 }} 
              className="relative w-full h-auto lg:absolute lg:inset-0 lg:h-full bg-white shadow-2xl border border-gray-100 z-20"
            >
               <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-2 h-full">
                 <div className="lg:col-span-1 bg-[#2F4E54] text-[#D9D9D9] p-6 lg:p-12 flex flex-col justify-center items-center text-center order-3 lg:order-1">
                    <motion.p 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ ...textTransition, delay: 0.2 }}
                      className="text-base lg:text-2xl font-open-sans font-bold leading-relaxed"
                    >
                      Intelligence supports better strategy, clearer decisions, and more resilient assets.
                    </motion.p>
                 </div>
                 <div className="lg:col-span-1 relative w-full h-[250px] lg:h-full order-1 lg:order-2">
                    <ParallaxImage src={performance2} alt="Intelligence" />
                 </div>
                 <div className="lg:col-span-2 flex flex-col justify-center p-6 lg:p-12 order-2 lg:order-3 overflow-hidden">
                    <motion.div
                       style={{ y: isDesktop ? yText : 0 }}
                       initial={{ opacity: 0, y: 30 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={textTransition}
                    >
                       <h3 className="text-2xl lg:text-5xl font-open-sans font-semibold mb-4 leading-tight text-black">
                         Intelligence + <br/> Foresight
                       </h3>
                       <p className="text-base lg:text-xl font-open-sans italic font-semibold mb-4 lg:mb-8 text-black">
                         Insight that drives decisions.
                       </p>
                       <p className="text-[#474747] mb-4 lg:mb-6 text-sm font-open-sans font-regular lg:text-lg leading-relaxed">
                         Smartotels uses artificial intelligence, analytics, and operational data to reveal performance drivers and market dynamics.
                       </p>
                       <p className="text-[#474747] text-sm font-open-sans font-regular lg:text-lg leading-relaxed">
                         We surface the information that matters most: demand shifts, pricing opportunities, competitive positioning, and operational risk.
                       </p>
                    </motion.div>
                 </div>
               </div>
            </motion.div>

            {/* CARD 3: Development + Advisory */}
            <motion.div 
              style={{ x: isDesktop ? x3 : 0 }} 
              className="relative w-full h-auto lg:absolute lg:inset-0 lg:h-full bg-white shadow-2xl border border-gray-100 z-30"
            >
               <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-2 h-full">
                 <div className="lg:col-span-2 flex flex-col justify-center p-6 lg:p-12 order-2 lg:order-1 overflow-hidden">
                    <motion.div
                       style={{ y: isDesktop ? yText : 0 }}
                       initial={{ opacity: 0, y: 30 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       viewport={{ once: true }}
                       transition={textTransition}
                    >
                       <h3 className="text-2xl lg:text-5xl font-open-sans font-bold mb-4 leading-tight text-black">
                         Development + <br/> Advisory
                       </h3>
                       <p className="text-base lg:text-xl font-open-sans italic font-semibold mb-4 lg:mb-8 text-black">
                         Strategy with discipline. <br/> Execution with clarity.
                       </p>
                       <p className="text-[#474747] mb-4 lg:mb-6 text-sm font-open-sans font-regular lg:text-lg leading-relaxed">
                         Smartotels supports owners, investors, and governments in developing, repositioning, and restructuring hospitality assets.
                       </p>
                       <p className="text-[#474747] text-sm font-open-sans font-regular lg:text-lg leading-relaxed">
                         Our work includes concept creation, feasibility, underwriting, operator selection, business planning, and execution oversight.
                       </p>
                    </motion.div>
                 </div>
                 <div className="lg:col-span-1 relative w-full h-[250px] lg:h-full order-1 lg:order-2">
                    <ParallaxImage src={performance3} alt="Development" />
                 </div>
                 <div className="lg:col-span-1 bg-[#2F4E54] text-[#D9D9D9] p-6 lg:p-12 flex flex-col justify-center items-center text-center order-3 lg:order-3">
                    <motion.p 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ ...textTransition, delay: 0.2 }}
                      className="text-base lg:text-2xl font-bold leading-relaxed"
                    >
                      The aim is straightforward: <br/> build stronger assets and create durable hospitality platforms.
                    </motion.p>
                 </div>
               </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}