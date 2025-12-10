"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import brand1 from "../assets/brand1.png";
import brand2 from "../assets/brand2.png";
import brand3 from "../assets/brand.png";

// Enhanced Fenix-style transitions
const textTransition = { 
  duration: 1.2, 
  ease: [0.16, 1, 0.3, 1] as const 
};

const cardTransition = {
  duration: 1.4,
  ease: [0.16, 1, 0.3, 1] as const
};

// --- PARALLAX IMAGE COMPONENT (REFINED) ---
function ParallaxImage({ src, alt }: { src: StaticImageData; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // We keep the vertical movement for the parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  // SCALE FIXED: Set to 1.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <motion.div style={{ y, scale }} className="w-full h-full relative">
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw" 
          priority={false}
        />
      </motion.div>
    </div>
  );
}

export default function BrandExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef} 
      className="relative h-auto bg-[#FAFAFA] text-black"
    >
      
      {/* Main Title */}
      <div className="text-center py-6 lg:py-8">
        <motion.h2 
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...textTransition, delay: 0.2 }}
          className="text-2xl md:text-5xl font-extrabold uppercase tracking-widest text-[#BEA787]"
        >
          Brand + Experience
        </motion.h2>
      </div>

      {/* --- STACK AREA --- */}
      <div className="relative w-full flex flex-col">
        
        {/* ROW 1: Hospitality Technology */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={cardTransition}
          className="relative w-full min-h-screen flex items-center bg-white"
        >
          <div className="w-full max-w-[1600px] mx-auto px-0 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-2 min-h-[80vh]">
              {/* Left: Text Block */}
              <div className="flex flex-col h-auto lg:h-full gap-0 lg:gap-2 order-1 lg:order-1">
                <div className="p-8 lg:p-12 bg-[#E6E6E6] grow flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ ...textTransition, delay: 0.3 }}
                  >
                    <h3 className="text-2xl lg:text-5xl font-bold font-open-sans mb-4 leading-tight text-black">Hospitality <br/> Technology</h3>
                    <p className="text-base lg:text-xl font-open-sans italic font-semibold mb-4 lg:mb-8 text-black">
                      Technology that strengthens operations and elevates experience.
                    </p>
                    <p className="text-[#474747] text-sm lg:text-lg font-regular font-open-sans leading-relaxed">
                      Smartotels implements tools and systems that improve efficiency, support staff, enhance service delivery, and create smoother guest interactions.
                    </p>
                  </motion.div>
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ ...textTransition, delay: 0.5 }}
                  className="bg-[#2F4E54] text-white p-6 lg:p-8 shrink-0 flex items-center justify-center"
                >
                  <p className="text-base lg:text-2xl font-bold leading-relaxed text-center text-[#D9D9D9]">
                    The approach is simple: use technology to improve performance without compromising the human experience.
                  </p>
                </motion.div>
              </div>
              
              {/* Right: Image Block */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...textTransition, delay: 0.4 }}
                className="relative h-[250px] lg:h-full w-full order-2 lg:order-2"
              >
                <ParallaxImage src={brand3} alt="Hospitality Technology" />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* ROW 2: Experience Design */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={cardTransition}
          className="relative w-full min-h-screen flex items-center bg-white"
        >
          <div className="w-full max-w-[1600px] mx-auto px-0 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-2 min-h-[80vh]">
              {/* Left: Image Block */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...textTransition, delay: 0.3 }}
                className="relative h-[250px] lg:h-full w-full order-2 lg:order-1"
              >
                <ParallaxImage src={brand2} alt="Experience Design" />
              </motion.div>

              {/* Right: Text Block */}
              <div className="flex flex-col h-auto lg:h-full order-1 lg:order-2 gap-0 lg:gap-2">
                <div className="p-8 lg:p-12 bg-[#E6E6E6] grow flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ ...textTransition, delay: 0.4 }}
                  >
                    <h3 className="text-2xl lg:text-5xl font-bold font-open-sans mb-4 leading-tight text-black">Experience <br/> Design</h3>
                    <p className="text-base lg:text-xl font-open-sans italic font-semibold mb-4 lg:mb-8 text-black">
                      Design that shapes emotion and reinforces performance.
                    </p>
                    <p className="text-[#474747] text-sm lg:text-lg font-regular font-open-sans leading-relaxed">
                      Smartotels develops guest journeys that are intentional, clear, and aligned with the identity of the asset.
                    </p>
                  </motion.div>
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ ...textTransition, delay: 0.6 }}
                  className="bg-[#2F4E54] text-white p-6 lg:p-8 shrink-0 flex items-center justify-center"
                >
                  <p className="text-base lg:text-2xl font-bold leading-relaxed text-center text-[#D9D9D9]">
                    Our focus is on moments, flow, service touchpoints, and operational harmony that create meaningful connection and stronger outcomes.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ROW 3: Brand Architecture */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-150px" }}
          transition={cardTransition}
          className="relative w-full min-h-screen flex items-center bg-white"
        >
          <div className="w-full max-w-[1600px] mx-auto px-0 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-2 min-h-[80vh]">
              {/* Left: Text Block */}
              <div className="flex flex-col h-auto lg:h-full gap-0 lg:gap-2 order-1 lg:order-1">
                <div className="p-8 lg:p-12 bg-[#E6E6E6] grow flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ ...textTransition, delay: 0.3 }}
                  >
                    <h3 className="text-2xl lg:text-5xl font-bold font-open-sans mb-4 leading-tight text-black">Brand <br/> Architecture</h3>
                    <p className="text-base lg:text-xl font-open-sans italic font-semibold mb-4 lg:mb-8 text-black">
                      Identity with purpose. Positioning with clarity. Value with longevity.
                    </p>
                    <p className="text-[#474747] text-sm lg:text-lg font-regular font-open-sans leading-relaxed">
                      Smartotels builds hospitality brands with distinct voice, visual identity, and strategic positioning.
                    </p>
                  </motion.div>
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ ...textTransition, delay: 0.5 }}
                  className="bg-[#2F4E54] text-white p-6 lg:p-8 shrink-0 flex items-center justify-center"
                >
                  <p className="text-base lg:text-2xl font-bold leading-relaxed text-center text-[#D9D9D9]">
                    We define the principles, narrative, and market presence that allow a brand to attract the right guests and support higher performance.
                  </p>
                </motion.div>
              </div>

              {/* Right: Image Block */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...textTransition, delay: 0.4 }}
                className="relative h-[250px] lg:h-full w-full order-2 lg:order-2"
              >
                <ParallaxImage src={brand1} alt="Brand Architecture" />
              </motion.div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
