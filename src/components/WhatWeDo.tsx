"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import performance1 from "../assets/Picture 5.jpeg";
import performance2 from "../assets/Picture 1.jpeg";
import performance3 from "../assets/performance3.png";

// Enhanced Fenix-style transitions
const textTransition = { 
  duration: 1.2, 
  ease: [0.16, 1, 0.3, 1] as const 
};

const cardTransition = {
  duration: 1.4,
  ease: [0.16, 1, 0.3, 1] as const
};

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
  return (
    <section 
      id="section-what-we-do"
      className="relative h-auto bg-white text-black"
    >
      
      {/* Main Title */}
      {/* Changed lg:py-12 to lg:py-8 to match BrandExperience spacing */}
      <div className="text-center pt-12 pb-6 lg:pt-24 lg:pb-10">
        <motion.h2 
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...textTransition, delay: 0.2 }}
          className="text-2xl md:text-5xl font-extrabold uppercase tracking-widest text-[#BEA787]"
        >
          Performance + Intelligence
        </motion.h2>
      </div>

      {/* --- STACK AREA --- */}
      <div className="relative w-full flex flex-col gap-12 lg:gap-24 ">
        
        {/* CARD 1: Asset Management */}
        <motion.div 
           initial={{ opacity: 0, y: 100 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={cardTransition}
           className="relative w-full flex items-center bg-white"
        >
          <div className="w-full max-w-[1600px] mx-auto px-0 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-2 min-h-[50vh]">
                
                {/* Text Area */}
                <div className="lg:col-span-2 flex flex-col justify-start p-6 md:px-12 md:pt-0 order-3 lg:order-1">
                   <motion.div 
                     initial={{ opacity: 0, y: 60 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-50px" }}
                     transition={{ ...textTransition, delay: 0.3 }}
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
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ ...textTransition, delay: 0.4 }}
                  className="lg:col-span-1 relative w-full h-[40vh] lg:h-full order-1 lg:order-2"
                >
                   <ParallaxImage src={performance1} alt="Asset Management" />
                </motion.div>

                {/* Highlight Box */}
                <motion.div 
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ ...textTransition, delay: 0.5 }}
                  className="lg:col-span-1 bg-[#2F4E54] text-[#D9D9D9] p-6 lg:p-12 flex flex-col justify-center items-center text-center order-2 lg:order-3"
                >
                  <p className="text-base lg:text-2xl font-bold leading-relaxed">
                    The goal is clear: <br/> deliver stronger results and increase long term value.
                  </p>
                </motion.div>
            </div>
          </div>
        </motion.div>

        {/* CARD 2: Intelligence + Foresight */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={cardTransition}
          className="relative w-full flex items-center bg-white"
        >
          <div className="w-full max-w-[1600px] mx-auto px-0 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-2 min-h-[50vh]">
              
              {/* Highlight Box */}
              <motion.div 
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...textTransition, delay: 0.3 }}
                className="lg:col-span-1 bg-[#2F4E54] text-[#D9D9D9] p-6 lg:p-12 flex flex-col justify-center items-center text-center order-2 lg:order-1"
              >
                <p className="text-base lg:text-2xl font-open-sans font-bold leading-relaxed">
                  Intelligence supports better strategy, clearer decisions, and more resilient assets.
                </p>
              </motion.div>

              {/* Image Area */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...textTransition, delay: 0.4 }}
                className="lg:col-span-1 relative w-full h-[40vh] lg:h-full order-1 lg:order-2"
              >
                <ParallaxImage src={performance2} alt="Intelligence" />
              </motion.div>

              {/* Text Area */}
              <div className="lg:col-span-2 flex flex-col justify-start p-6 md:px-12 md:pt-0 order-3 lg:order-3">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ ...textTransition, delay: 0.5 }}
                >
                    <h3 className="text-2xl lg:text-5xl font-open-sans font-bold mb-4 leading-tight text-black">
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
          </div>
        </motion.div>

        {/* CARD 3: Development + Advisory */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={cardTransition}
          className="relative w-full flex items-center bg-white"
        >
          <div className="w-full max-w-[1600px] mx-auto px-0 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-2 min-h-[50vh]">
              
              {/* Text Area */}
              <div className="lg:col-span-2 flex flex-col justify-start p-6 md:px-12 md:pt-0  order-3 lg:order-1">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ ...textTransition, delay: 0.3 }}
                >
                    <h3 className="text-2xl lg:text-5xl font-open-sans font-bold mb-4 leading-tight text-black">
                      Development + <br/> Advisory
                    </h3>
                    <p className="text-base lg:text-xl font-open-sans italic font-semibold mb-4 lg:mb-8 text-black">
                      Strategy with discipline. Execution with clarity.
                    </p>
                    <p className="text-[#474747] mb-4 lg:mb-6 text-sm font-open-sans font-regular lg:text-lg leading-relaxed">
                      Smartotels supports owners, investors, and governments in developing, repositioning, and restructuring hospitality assets.
                    </p>
                    <p className="text-[#474747] text-sm font-open-sans font-regular lg:text-lg leading-relaxed">
                      Our work includes concept creation, feasibility, underwriting, operator selection, business planning, and execution oversight.
                    </p>
                </motion.div>
              </div>

              {/* Image Area */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...textTransition, delay: 0.4 }}
                className="lg:col-span-1 relative w-full h-[40vh] lg:h-full order-1 lg:order-2"
              >
                <ParallaxImage src={performance3} alt="Development" />
              </motion.div>

              {/* Highlight Box */}
              <motion.div 
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...textTransition, delay: 0.5 }}
                className="lg:col-span-1 bg-[#2F4E54] text-[#D9D9D9] p-6 lg:p-12 flex flex-col justify-center items-center text-center order-2 lg:order-3"
              >
                <p className="text-base lg:text-2xl font-bold leading-relaxed">
                  The aim is straightforward: <br/> build stronger assets and create durable hospitality platforms.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}