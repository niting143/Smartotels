"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import brand1 from "../assets/brand1.png";
import brand2 from "../assets/brand2.png";
import brand3 from "../assets/brand.png";

// Reusable transition for fade-in elements
const textTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const };

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
  // This prevents the "zoom" that cuts off edges, while 'object-cover' ensures it fills the width.
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <motion.div style={{ y, scale }} className="w-full h-full relative">
        <Image 
          src={src} 
          alt={alt} 
          fill 
          // RETURNED TO OBJECT-COVER: This ensures the image fills the width/height (no grey bars).
          // Combined with scale=1, this is the most "full size" you can get in a filled box.
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

  // We track the main container for the text parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yText = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#FAFAFA] text-black"
    >
      
      {/* --- WATERMARK HEADER (STICKY) --- */}
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col justify-start pt-8 lg:pt-16 z-50 pointer-events-none mix-blend-difference opacity-100 overflow-hidden">
        <h1 className="text-[10vw] md:text-[8vw] font-semibold font-open-sans text-[#DCDCDC] leading-none tracking-tighter whitespace-nowrap pl-6 md:pl-0">
          what we do
        </h1>
      </div>

      {/* --- SCROLLING CONTENT WRAPPER --- */}
      <div className="relative z-10 -mt-[100vh] pt-[20vh] pb-12 lg:pb-32 w-full max-w-[1600px] mx-auto px-0 md:px-12">

        {/* Section Title */}
        <div className="text-center mb-12 md:mb-24 relative z-10">
           <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={textTransition}
              className="text-2xl md:text-5xl font-open-sans font-extrabold uppercase tracking-widest text-[#BEA787] inline-block bg-[#FAFAFA]/80 backdrop-blur-sm px-4 py-2"
            >
              Brand + Experience
            </motion.h2>
        </div>

        <div className="flex flex-col w-full gap-8 lg:gap-0">
          
           {/* --- ROW 1: Hospitality Technology --- */}
           <div className="relative lg:sticky lg:top-[17vh] z-10 py-4 lg:py-8">
              <div className="bg-white shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                   {/* Left: Text Block */}
                   <div className="flex flex-col h-auto lg:h-full lg:min-h-[600px] gap-2">
                      <div className="p-8 lg:p-12 bg-[#E6E6E6] grow flex flex-col justify-center overflow-hidden">
                        <motion.div
                          style={{ y: yText }}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={textTransition}
                        >
                            <h3 className="text-2xl lg:text-4xl font-bold font-open-sans mb-4 text-black">Hospitality <br/> Technology</h3>
                            <p className="text-base lg:text-xl italic font-regular font-open-sans text-black mb-4 lg:mb-6">
                              Technology that strengthens operations and elevates experience.
                            </p>
                            <p className="text-[#5D5D5D] text-sm lg:text-lg font-regular font-open-sans leading-relaxed">
                              Smartotels implements tools and systems that improve efficiency, support staff, enhance service delivery, and create smoother guest interactions.
                            </p>
                        </motion.div>
                      </div>
                      <div className="bg-[#2F4E54] text-white p-6 lg:p-10 shrink-0">
                        <motion.p 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ ...textTransition, delay: 0.2 }}
                          className="text-lg lg:text-xl font-bold font-open-sans leading-relaxed text-center text-[#D9D9D9]"
                        >
                           The approach is simple: use technology to improve performance without compromising the human experience.
                        </motion.p>
                      </div>
                   </div>
                   
                   {/* Right: Image Block */}
                   <div className="relative h-[250px] lg:h-auto w-full">
                      <ParallaxImage src={brand1} alt="Hospitality Technology" />
                   </div>
                </div>
              </div>
           </div>

           {/* --- ROW 2: Experience Design --- */}
           <div className="relative lg:sticky lg:top-[20vh] z-20 py-4 lg:py-8">
             <div className="bg-white shadow-xl">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {/* Left: Image Block */}
                  <div className="relative h-[250px] lg:h-auto w-full order-2 lg:order-1">
                     <ParallaxImage src={brand2} alt="Experience Design" />
                  </div>

                  {/* Right: Text Block */}
                  <div className="flex flex-col h-auto lg:h-full lg:min-h-[600px] order-1 lg:order-2 gap-2">
                     <div className="p-8 lg:p-12 bg-[#E6E6E6] grow flex flex-col justify-center overflow-hidden">
                       <motion.div
                          style={{ y: yText }}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={textTransition}
                       >
                           <h3 className="text-2xl lg:text-4xl font-bold font-open-sans mb-4 text-black">Experience <br/> Design</h3>
                           <p className="text-base lg:text-xl italic font-open-sans text-black mb-4 lg:mb-6">
                             Design that shapes emotion and reinforces performance.
                           </p>
                           <p className="text-[#5D5D5D] text-sm lg:text-lg font-open-sans leading-relaxed">
                             Smartotels develops guest journeys that are intentional, clear, and aligned with the identity of the asset.
                           </p>
                       </motion.div>
                     </div>
                      <div className="bg-[#2F4E54] text-white p-6 lg:p-10 shrink-0">
                       <motion.p 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ ...textTransition, delay: 0.2 }}
                          className="text-lg lg:text-xl font-open-sans leading-relaxed text-center text-[#D9D9D9] font-bold"
                       >
                          Our focus is on moments, flow, service touchpoints, and operational harmony that create meaningful connection and stronger outcomes.
                       </motion.p>
                      </div>
                  </div>
               </div>
             </div>
           </div>

           {/* --- ROW 3: Brand Architecture --- */}
           <div className="relative lg:sticky lg:top-[25vh] z-30 py-4 lg:py-8">
             <div className="bg-white shadow-xl">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                   {/* Left: Text Block */}
                   <div className="flex flex-col h-auto lg:h-full lg:min-h-[600px] gap-2">
                      <div className="p-8 lg:p-12 bg-[#E6E6E6] grow flex flex-col justify-center overflow-hidden">
                        <motion.div
                          style={{ y: yText }}
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={textTransition}
                        >
                            <h3 className="text-2xl lg:text-4xl font-bold font-open-sans mb-4 text-black">Brand <br/> Architecture</h3>
                            <p className="text-base lg:text-xl italic font-open-sans text-black mb-4 lg:mb-6">
                              Identity with purpose. Positioning with clarity. Value with longevity.
                            </p>
                            <p className="text-[#5D5D5D] text-sm lg:text-lg font-open-sans leading-relaxed">
                              Smartotels builds hospitality brands with distinct voice, visual identity, and strategic positioning.
                            </p>
                        </motion.div>
                      </div>
                      <div className="bg-[#2F4E54] text-white p-6 lg:p-10 shrink-0">
                        <motion.p 
                          initial={{ opacity: 0, y: 30 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ ...textTransition, delay: 0.2 }}
                          className="text-lg lg:text-xl font-open-sans leading-relaxed text-[#D9D9D9] text-center font-bold"
                        >
                           We define the principles, narrative, and market presence that allow a brand to attract the right guests and support higher performance.
                        </motion.p>
                      </div>
                   </div>

                   {/* Right: Image Block */}
                   <div className="relative h-[250px] lg:h-auto w-full">
                      <ParallaxImage src={brand3} alt="Brand Architecture" />
                   </div>
               </div>
             </div>
           </div>

        </div>
      </div>
    </section>
  );
}