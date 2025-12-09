"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import brand1 from "../assets/brand1.png";
import brand2 from "../assets/brand2.png";
import brand3 from "../assets/brand.png";

export default function BrandExperience() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (

    <section 
      ref={containerRef} 
      className="relative w-full bg-[#FAFAFA] text-black"
    >
      {/* --- WATERMARK HEADER (FIXED) --- */}
      {/* This stays fixed until the white content scrolls over it */}
      <div className="hidden md:block relative h-[20vh] lg:sticky lg:top-0 lg:left-0 w-full lg:h-[60vh] flex flex-col justify-start pt-8 lg:pt-16 z-0 pointer-events-none sticky-header-fix">
        <h1 className="text-[10vw] md:text-[8vw] font-semibold text-[#E6E6E6] leading-none tracking-tighter whitespace-nowrap pl-6 md:pl-0">
          What we do
        </h1>
      </div>

      {/* --- SCROLLING CONTENT WRAPPER --- */}
      {/* Pushes up to cover the watermark */}
      <div className="relative z-10 lg:-mt-[40vh] pb-12 lg:pb-32 w-full max-w-[1600px] mx-auto  px-0 md:px-12">
{/* Main Title (Fixed above cards on DT, scroll starts here) */}
          <div className="hidden md:block text-center mb-8 lg:mb-12 md:pt-16 shrink-0">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-5xl font-open-sans font-extrabold uppercase tracking-widest text-[#BEA787]  px-4 py-2"
            >
              Brand + Experience
            </motion.h2>
          </div>

         {/* Main Title */}
         <div className="text-center mb-12 md:mb-24 lg:hidden">
          <h2 className="text-3xl md:text-6xl font-open-sans font-bold uppercase tracking-widest text-[#BEA787] inline-block px-4 py-2 rounded-sm">
            Brand + Experience
          </h2>
        </div>

        <div className="flex flex-col w-full gap-8 lg:gap-0">
          
           {/* --- ROW 1: Hospitality Technology (Stacked Card 1) --- */}
           {/* Sticky positioning creates the stack effect */}
           <div className="relative lg:sticky lg:top-[17vh] z-10 py-4 lg:py-8">
              <div className="bg-white shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                   {/* Left: Text Block */}
                   <div className="flex flex-col h-auto lg:h-full lg:min-h-[600px] gap-2">
                      {/* Top: Light Gray */}
                      <div className="p-8 lg:p-12 bg-[#E6E6E6] grow flex flex-col justify-center">
                        {/* Animated Text Block */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
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
                      {/* Bottom: Dark Teal */}
                      <div className="bg-[#2F4E54] text-white p-6 lg:p-10 shrink-0">
                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="text-lg lg:text-xl font-bold font-open-sans leading-relaxed text-center text-[#D9D9D9]"
                        >
                           The approach is simple: use technology to improve performance without compromising the human experience.
                        </motion.p>
                      </div>
                   </div>
                   
                   {/* Right: Image Block */}
                   <div className="relative h-[250px] lg:h-auto w-full">
                      <Image 
                        src={brand1} 
                        alt="Hospitality Technology" 
                        fill 
                        className="object-cover" 
                      />
                   </div>
                </div>
              </div>
           </div>

           {/* --- ROW 2: Experience Design (Stacked Card 2) --- */}
           {/* Stacks slightly lower than the first one */}
           <div className="relative lg:sticky lg:top-[20vh] z-20 py-4 lg:py-8">
             <div className="bg-white shadow-xl">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                  {/* Left: Image Block */}
                  <div className="relative h-[250px] lg:h-auto w-full order-2 lg:order-1">
                     <Image 
                       src={brand2} 
                       alt="Experience Design" 
                       fill 
                       className="object-cover" 
                     />
                  </div>

                  {/* Right: Text Block */}
                  <div className="flex flex-col h-auto lg:h-full lg:min-h-[600px] order-1 lg:order-2 gap-2">
                     {/* Top: Light Gray */}
                     <div className="p-8 lg:p-12 bg-[#E6E6E6] grow flex flex-col justify-center">
                       <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                       >
                           <h3 className="text-2xl lg:text-4xl font-bold mb-4 text-black">Experience <br/> Design</h3>
                           <p className="text-base lg:text-xl italic font-open-sans text-black mb-4 lg:mb-6">
                             Design that shapes emotion and reinforces performance.
                           </p>
                           <p className="text-[#5D5D5D] text-sm lg:text-lg font-open-sans leading-relaxed">
                             Smartotels develops guest journeys that are intentional, clear, and aligned with the identity of the asset.
                           </p>
                       </motion.div>
                     </div>
                     {/* Bottom: Dark Teal */}
                      <div className="bg-[#2F4E54] text-white p-6 lg:p-10 shrink-0">
                       <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="text-lg lg:text-xl font-open-sans leading-relaxed text-center text-[#D9D9D9] font-bold"
                       >
                          Our focus is on moments, flow, service touchpoints, and operational harmony that create meaningful connection and stronger outcomes.
                       </motion.p>
                      </div>
                  </div>
               </div>
             </div>
           </div>

           {/* --- ROW 3: Brand Architecture (Stacked Card 3) --- */}
           {/* Stacks on top of the previous two */}
           <div className="relative lg:sticky lg:top-[25vh] z-30 py-4 lg:py-8">
             <div className="bg-white shadow-xl">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                   {/* Left: Text Block */}
                   <div className="flex flex-col h-auto lg:h-full lg:min-h-[600px] gap-2">
                      {/* Top: Light Gray */}
                      <div className="p-8 lg:p-12 bg-[#E6E6E6] grow flex flex-col justify-center">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6 }}
                        >
                            <h3 className="text-2xl lg:text-4xl font-bold mb-4 font-open-sans text-black">Brand <br/> Architecture</h3>
                            <p className="text-base lg:text-xl italic font-open-sans text-black mb-4 lg:mb-6">
                              Identity with purpose. Positioning with clarity. Value with longevity.
                            </p>
                            <p className="text-[#5D5D5D] text-sm lg:text-lg font-open-sans leading-relaxed">
                              Smartotels builds hospitality brands with distinct voice, visual identity, and strategic positioning.
                            </p>
                        </motion.div>
                      </div>
                      {/* Bottom: Dark Teal */}
                      <div className="bg-[#2F4E54] text-white p-6 lg:p-10 shrink-0">
                        <motion.p 
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          className="text-lg lg:text-xl font-open-sans leading-relaxed text-[#D9D9D9] text-center font-bold"
                        >
                           We define the principles, narrative, and market presence that allow a brand to attract the right guests and support higher performance.
                        </motion.p>
                      </div>
                   </div>

                   {/* Right: Image Block */}
                   <div className="relative h-[250px] lg:h-auto w-full">
                      <Image 
                        src={brand3} 
                        alt="Brand Architecture" 
                        fill 
                        className="object-cover" 
                      />
                   </div>
               </div>
             </div>
           </div>

        </div>
      </div>
    </section>
  );
}
