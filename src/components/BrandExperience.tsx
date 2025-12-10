"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  // We track the main container for the text parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- Vertical Stack Animation Logic ---
  // Card 2 comes up and covers Card 1
  const y2 = useTransform(scrollYProgress, [0.15, 0.45], ["110%", "0%"]);
  // Card 3 comes up and covers Card 2
  const y3 = useTransform(scrollYProgress, [0.55, 0.85], ["110%", "0%"]);

  // Scaling effect for underlying cards to create depth
  const scale1 = useTransform(scrollYProgress, [0.15, 0.45], [1, 0.95]);
  const scale2 = useTransform(scrollYProgress, [0.55, 0.85], [1, 0.95]);

  const yText = useTransform(scrollYProgress, [0, 1], ["40px", "-40px"]);

  return (
    <section 
      ref={containerRef} 
      className="relative h-auto lg:h-[300vh] bg-[#FAFAFA] text-black"
    >
      
      {/* Sticky Container */}
      <div className="relative lg:sticky lg:top-0 h-auto lg:h-screen overflow-hidden flex flex-col">

        {/* --- CONTENT CONTAINER --- */}
        {/* Adjusted padding to be responsive and prevent cropping on small screens */}
        <div className="relative z-10 w-full max-w-[1600px] mx-auto px-0 md:px-12 pt-[10vh] lg:pt-[15vh] pb-8 lg:pb-12 h-full flex flex-col">

          {/* Section Title */}
          <div className="text-center mb-6 lg:mb-8 shrink-0 relative z-40">
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

          {/* --- STACK AREA --- */}
          <div className="relative w-full grow flex flex-col gap-8 lg:block lg:h-auto">
            
             {/* --- ROW 1: Hospitality Technology --- */}
             <motion.div 
               style={{ scale: isDesktop ? scale1 : 1 }}
               className="relative w-full h-auto lg:h-[70vh] lg:max-h-[800px] lg:absolute lg:top-0 lg:left-0 bg-white shadow-xl z-10 origin-top"
             >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-2 h-full">
                   {/* Left: Text Block */}
                   <div className="flex flex-col h-auto lg:h-full gap-0 lg:gap-2 order-2 lg:order-1">
                      <div className="p-8 lg:p-12 bg-[#E6E6E6] grow flex flex-col justify-center overflow-hidden">
                        <motion.div
                          style={{ y: isDesktop ? yText : 0 }}
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
                      <div className="bg-[#2F4E54] text-white p-6 lg:p-8 shrink-0 flex items-center justify-center">
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
                   <div className="relative h-[250px] lg:h-full w-full order-1 lg:order-2">
                      <ParallaxImage src={brand3} alt="Hospitality Technology" />
                   </div>
                </div>
             </motion.div>

             {/* --- ROW 2: Experience Design --- */}
             <motion.div 
               style={{ y: isDesktop ? y2 : 0, scale: isDesktop ? scale2 : 1 }}
               className="relative w-full h-auto lg:h-[70vh] lg:max-h-[800px] lg:absolute lg:top-0 lg:left-0 bg-white shadow-xl z-20 origin-top"
             >
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-2 h-full">
                  {/* Left: Image Block */}
                  <div className="relative h-[250px] lg:h-full w-full order-1 lg:order-1">
                     <ParallaxImage src={brand2} alt="Experience Design" />
                  </div>

                  {/* Right: Text Block */}
                  <div className="flex flex-col h-auto lg:h-full order-2 lg:order-2 gap-0 lg:gap-2">
                     <div className="p-8 lg:p-12 bg-[#E6E6E6] grow flex flex-col justify-center overflow-hidden">
                       <motion.div
                          style={{ y: isDesktop ? yText : 0 }}
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
                      <div className="bg-[#2F4E54] text-white p-6 lg:p-8 shrink-0 flex items-center justify-center">
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
             </motion.div>

             {/* --- ROW 3: Brand Architecture --- */}
             <motion.div 
               style={{ y: isDesktop ? y3 : 0 }}
               className="relative w-full h-auto lg:h-[70vh] lg:max-h-[800px] lg:absolute lg:top-0 lg:left-0 bg-white shadow-xl z-30 origin-top"
             >
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-2 h-full">
                   {/* Left: Text Block */}
                   <div className="flex flex-col h-auto lg:h-full gap-0 lg:gap-2 order-2 lg:order-1">
                      <div className="p-8 lg:p-12 bg-[#E6E6E6] grow flex flex-col justify-center overflow-hidden">
                        <motion.div
                          style={{ y: isDesktop ? yText : 0 }}
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
                      <div className="bg-[#2F4E54] text-white p-6 lg:p-8 shrink-0 flex items-center justify-center">
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
                   <div className="relative h-[250px] lg:h-full w-full order-1 lg:order-2">
                      <ParallaxImage src={brand1} alt="Brand Architecture" />
                   </div>
               </div>
             </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}