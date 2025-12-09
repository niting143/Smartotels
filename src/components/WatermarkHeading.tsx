"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function WatermarkHeading() {
  const [activeText, setActiveText] = useState<string | null>(null);

  useEffect(() => {
    let ticking = false;
    
    // Cache elements once
    const whoWeAre = document.getElementById("section-who-we-are");
    const whatWeDo = document.getElementById("section-what-we-do");
    const brandExp = document.getElementById("section-brand-experience");
    const footer = document.getElementById("section-footer");

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const vh = window.innerHeight;
          const scrollY = window.scrollY;

          let text = null;

          if (whoWeAre && whatWeDo && brandExp && footer) {
            // Use getBoundingClientRect for more accurate relative positioning if needed, 
            // but offsetTop is faster. We stick to offsetTop.
            
            // Adjust start triggers to be earlier/smoother
            // vh * 0.1 means it triggers when the section is 90% up the viewport (Hero is almost completely gone)
            // This ensures strict "after hero" appearance.
            const startWho = whoWeAre.offsetTop - vh * 0.1; 
            const startWhat = whatWeDo.offsetTop - vh * 0.1;
            const startFooter = footer.offsetTop - vh * 0.8;

            if (scrollY >= startWho && scrollY < startWhat) {
              text = "who we are";
            } else if (scrollY >= startWhat && scrollY < startFooter) {
               text = "what we do";
            }
          }

          setActiveText(text);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-screen z-40 pointer-events-none flex flex-col justify-start pt-20 md:pt-16 pb-16 overflow-hidden md:mix-blend-difference">
       <AnimatePresence mode="wait">
         {activeText && (
           <motion.h1 
             key={activeText}
             initial={{ opacity: 0, y: 50 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -50 }}
             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
             className="text-[12vw] md:text-[8vw] font-bold font-open-sans text-[#E6E6E6] md:text-[#E6E6E6] leading-none tracking-tighter whitespace-nowrap pl-0 md:pl-0 will-change-transform"
           >
             {activeText}
           </motion.h1>
         )}
       </AnimatePresence>
    </div>
  );
}
