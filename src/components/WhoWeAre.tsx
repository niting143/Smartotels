"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import whoweare1 from "../assets/whoweare1.png";
import whoweare2 from "../assets/whoweare2.png";
import founderImage from "../assets/tarek.png";
import linkedin from "../assets/linkedin-in 1.png";
import whoWeareMobile from "../assets/whoWeAreMobile.png";
import whoWeAreMobile2 from "../assets/whoweAreMobile2.png";

// Reusable transition for initial fade-ins
const fadeTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const };

export default function WhoWeAre() {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- SECTION 1 REFS & ANIMATION ---
  const section1Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: scrollY1 } = useScroll({
    target: section1Ref,
    offset: ["start end", "end start"],
  });
  const yImg1 = useTransform(scrollY1, [0, 1], ["-10%", "10%"]);
  const yText1 = useTransform(scrollY1, [0, 1], ["5%", "-5%"]);

  // --- SECTION 2 REFS & ANIMATION ---
  const section2Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: scrollY2 } = useScroll({
    target: section2Ref,
    offset: ["start end", "end start"],
  });
  const yImg2 = useTransform(scrollY2, [0, 1], ["-10%", "10%"]);
  const yText2 = useTransform(scrollY2, [0, 1], ["5%", "-5%"]);

  // --- FOUNDER SECTION REFS & ANIMATION ---
  const founderRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: scrollYFounder } = useScroll({
    target: founderRef,
    offset: ["start end", "end start"],
  });
  const scaleFounder = useTransform(scrollYFounder, [0, 0.5, 1], [1.1, 1, 1]);
  const yFounderText = useTransform(scrollYFounder, [0, 1], ["50px", "-50px"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white text-black overflow-clip"
    >
      {/* --- WATERMARK HEADER (FIXED ON TOP) --- */}
      {/* UPDATED: 
          1. z-50: Ensures it sits above the black Founder section (which is z-20).
          2. mix-blend-mode-difference: Makes the text color invert based on background 
             (Grey on White, Light on Black) for better visibility and style.
      */}
      
      {/* --- SCROLLING CONTENT WRAPPER --- */}
      <div className="relative z-10 pt-10 md:pt-16 md:pb-24">
        
        {/* =========================================
            SECTION 1: FOUNDATION 
           ========================================= */}
        <div 
          ref={section1Ref}
          className="max-w-[1440px] mx-auto px-0 md:px-20 mb-0 md:mb-10 relative"
        >
          <div className="flex flex-col md:flex-row items-start">
            
            {/* Image Container */}
            <div className="w-full md:w-[50%] h-auto md:h-[650px] relative overflow-hidden z-0">
              <motion.div 
                style={{ y: yImg1, scale: 1.15 }} 
                className="relative md:absolute inset-0 w-full h-full md:h-[120%]"
              >
                <div className="hidden md:block relative w-full h-full">
                  <Image src={whoweare1} alt="Abstract Architecture" fill className="object-cover" />
                </div>
                <div className="block md:hidden w-full">
                  <Image src={whoWeareMobile} alt="Abstract Mobile" className="w-full h-auto" sizes="100vw" quality={100} priority />
                </div>
              </motion.div>
            </div>

            {/* Text Box */}
            <motion.div
              style={{ y: yText1 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={fadeTransition}
              viewport={{ once: true }}
              className="w-full md:w-[60%] bg-white z-10 relative
                         px-6 py-12 md:p-16 
                         md:mx-0
                         mt-0 md:-ml-48 md:mt-24 
                         shadow-none"
            >
              <h4 className="text-base font-regular font-open-sans uppercase tracking-[0.2em] text-gray-900 mb-6">
                Why Smartotels?
              </h4>
              <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold font-open-sans leading-[1.1] mb-8 tracking-tight">
                Intelligence is our foundation. Hospitality is our language.
              </h2>
              <p className="text-[#474747] text-lg font-regular font-open-sans leading-relaxed">
Smartotels operates at the intersection of hospitality, finance, and design. We apply data-native intelligence and disciplined structuring to an industry shaped by emotion and experience. The result is a platform built for investors and operators who demand clarity, performance, and enduring value.              </p>
            </motion.div>
          </div>
        </div>

        {/* =========================================
            SECTION 2: VISION 
           ========================================= */}
        <div 
          ref={section2Ref}
          className="max-w-[1440px] mx-auto px-0 md:px-0 md:mt-20 md:mb-10 relative"
        >
          <div className="flex flex-col md:flex-row items-center md:justify-end">
            
            {/* Image Container */}
            {/* ADDED: md:mr-20 to push the image away from the right edge on desktop */}
            <div className="w-full md:w-[50%] h-auto md:h-[650px] relative overflow-hidden z-10 order-1 md:order-2 md:mr-20">
              <motion.div 
                style={{ y: yImg2, scale: 1.15 }} 
                className="relative md:absolute inset-0 w-full h-full md:h-[120%]"
              >
                <div className="hidden md:block relative w-full h-full">
                  <Image src={whoweare2} alt="Spheres Pattern" fill className="object-cover" />
                </div>
                <div className="block md:hidden w-full">
                  <Image src={whoWeAreMobile2} alt="Spheres Pattern Mobile" className="w-full h-auto" sizes="100vw" quality={100} />
                </div>
              </motion.div>
            </div>

            {/* Text Box */}
            <motion.div
              style={{ y: yText2 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={fadeTransition}
              viewport={{ once: true }}
              className="w-full md:w-[60%] bg-white z-20 relative order-2 md:order-1 
                         px-6 py-12 md:p-16 
                         md:mx-0
                         mt-0 md:-mr-48 md:mt-32 md:ml-20 
                         text-left 
                         shadow-none"
            >
              <h4 className="text-base font-regular font-open-sans uppercase tracking-[0.2em] text-gray-900 mb-6">
                Our Vision
              </h4>
              <h2 className="text-3xl md:text-5xl lg:text-[3.5rem] font-bold font-open-sans leading-[1.1] mb-8 tracking-tight">
                We believe hospitality isn’t just experienced. <br className="hidden lg:block"/> It’s engineered.
              </h2>
              <p className="text-[#474747] text-lg font-regular font-open-sans leading-relaxed">
                We see hospitality as a living, intelligent ecosystem where design and performance coexist. Our vision is built on precision, human experience, and an intelligence designed to endure.
              </p>
            </motion.div>

          </div>
        </div>

      </div>

      {/* --- SECTION 3: FOUNDER'S PERSPECTIVE --- */}
      <div 
        ref={founderRef}
        id="section-founder" 
        className="relative z-20 w-full bg-black text-white pt-0 md:pt-0"
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-16 items-center">
          
          {/* IMAGE COLUMN */}
          <div className="md:col-span-5 bottom-0 relative group order-2 md:order-1 mt-0 md:mt-0">
            <motion.div
              style={{ scale: scaleFounder }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative aspect-[3/4] w-full overflow-hidden"
            >
              <Image 
                src={founderImage} 
                alt="Tarek M. Daouk" 
                fill
                className="object-cover grayscale"
              />
              
              <div className="absolute w-[85%] md:w-[70%] bottom-4 left-1/2 -translate-x-1/2 bg-black/40 px-4 py-3 flex items-center justify-between gap-10 border-l-2 border-white backdrop-blur-sm">
                <div>
                  <h3 className="text-white font-semibold font-open-sans text-sm leading-none">Tarek M. Daouk</h3>
                  <p className="text-white text-[10px] mt-1 font-regular font-open-sans uppercase tracking-wide">Founder + Managing Partner</p>
                </div>
                <img src={linkedin.src} alt="Linkedin" className="w-4 h-4 object-contain" />
              </div>

            </motion.div>
          </div>

          {/* TEXT COLUMN */}
          <div className="md:col-span-7 order-1 md:order-2">
            <motion.div
              style={{ y: yFounderText }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={fadeTransition}
              viewport={{ once: true }}
              className="pb-16 md:pb-0"
            >
              <h4 className="text-base font-regular font-open-sans uppercase tracking-[0.06em] text-white mb-6 mt-16 md:mt-10 mx-6 md:mx-10">
                Founder's Perspective
              </h4>
              
              <h2 className="text-3xl md:text-5xl lg:text-[3rem] font-bold font-open-sans leading-[1.1] mb-6 mx-6 md:mx-10">
                Hospitality is not a service. It is a system of intelligent human interactions.
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-white text-lg font-regular mx-6 md:mx-10">
                <div className="space-y-6">
                  <p>
                    <span className="text-white font-regular font-open-sans text-base">Smartotels was created from a belief</span> that hospitality can be both profoundly human and deeply intelligent.
                  </p>
                  <p className="text-white font-regular font-open-sans text-base">
                    The founder’s perspective comes from decades across investment, operations, technology, and design, where clarity and emotion work together to shape destinations that endure.
                  </p>
                </div>
                <div className="space-y-6">
                  <p className="text-white font-regular font-open-sans text-base">
                    This perspective understands that meaningful experiences do not happen by chance; they emerge from precision, intention, technological insight, and an understanding of how people and places connect.
                  </p>
                  <p className="text-white font-regular font-open-sans text-base">
                    It is this philosophy that guides Smartotels in building hospitality systems that perform, resonate, and last.
                  </p>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>

    </section>
  );
}