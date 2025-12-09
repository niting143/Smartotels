"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Open_Sans } from "next/font/google";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

// 1. Font Configuration
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["800"], // Extra Bold
  variable: "--font-open-sans",
});

// 2. Video Assets (Ensure your bundler handles these imports)
import video1 from "../assets/hero1.mp4";
import video2 from "../assets/hero2.mp4";
import video3 from "../assets/hero3.mp4";
import video4 from "../assets/hero4.mp4";

interface Slide {
  id: number;
  videoUrl: string;
  text: string[];
}

const slides: Slide[] = [
  {
    id: 1,
    videoUrl: video1,
    text: ["HOSPITALITY.", "STRUCTURED BY DATA"],
  },
  {
    id: 2,
    videoUrl: video2,
    text: ["EXPERIENCE.", "DESIGNED WITH INTELLIGENCE"],
  },
  {
    id: 3,
    videoUrl: video3,
    text: ["PERFORMANCE.", "ENGINEERED TO ENDURE"],
  },
  {
    id: 4,
    videoUrl: video4,
    text: ["THIS IS", "SMARTOTELS"],
  },
];

const ARCHITECTURAL_EASE = [0.76, 0, 0.24, 1] as const;
const SLIDE_DURATION = 7000;

// 3. Updated Primary Button Component
const PrimaryButton = ({
  children,
  href = "#",
  className,
  onClick,
}: {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) => (
  <a
    href={href}
    onClick={(e) => onClick && onClick(e, href)}
    className={cn(
      "group relative overflow-hidden flex items-center justify-center shadow-2xl transition-all z-50",
      // Base Mobile Styles: Full width, tracking, padding
      "w-full py-4 text-xs tracking-widest px-2 text-center",
      // Base Desktop Styles:
      "md:py-4 md:text-sm",
      "bg-white text-neutral-950 font-medium uppercase rounded-sm",
      // Merge custom classes (allows overriding width on desktop)
      className
    )}
  >
    <span className="relative z-10 group-hover:text-white transition-colors duration-500 ease-in-out">
      {children}
    </span>
    <div className="absolute inset-0 bg-neutral-900 transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500 ease-[0.76,0,0.24,1]" />
  </a>
);

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [key, setKey] = useState(0);
  const lenis = useLenis();
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setKey((prev) => prev + 1);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setKey((prev) => prev + 1);
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href.startsWith("#")) {
      // Internal Scroll Link
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);

      if (targetElement && lenis) {
        // 1. Smooth Scroll to the target
        lenis.scrollTo(targetElement, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing for smoother feel
        });

        // 2. GSAP Animation: Card comes from left to right
        // We animate the target element itself
        gsap.fromTo(
          targetElement,
          { x: "-100%", opacity: 0 },
          {
            x: "0%",
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.2, // Slight delay to let scroll start
          }
        );
      }
    } else {
      // External Page Link
      router.push(href);
    }
  };

  // --- Animation Variants ---
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const lineVariants = {
    initial: { y: "100%", opacity: 0 },
    animate: {
      y: "0%",
      opacity: 1,
      transition: { 
        duration: 1.1, 
        ease: ARCHITECTURAL_EASE 
      },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: { 
        duration: 0.6, 
        ease: [0.32, 0, 0.67, 0] as const
      },
    },
  };

  const bgVariants = {
    initial: { opacity: 0, scale: 1.1 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: "easeOut" as const },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <section
      className={cn(
        "relative h-[100dvh] w-full overflow-hidden bg-[#2F4E54] text-white",
        openSans.className
      )}
    >
      {/* 1. Background Layer */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={slides[currentIndex].id}
          variants={bgVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-neutral-950/30 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-neutral-950/30 z-10" />
          
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full opacity-80"
          >
            <source src={slides[currentIndex].videoUrl} type="video/mp4" />
          </video>
        </motion.div>
      </AnimatePresence>

      {/* 2. Text Layer - ABSOLUTE CENTERED */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center text-center gap-y-1 md:gap-y-4"
          >
            {slides[currentIndex].text.map((line, index) => (
              <div key={index} className="overflow-hidden relative">
                <motion.span
                  variants={lineVariants}
                  className={cn(
                    "block font-extrabold uppercase font-open-sans  text-white leading-[0.9]",
                    // Responsive Text Sizing
                    "text-[10vw] md:text-8xl"
                  )}
                >
                  {line}
                </motion.span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 3. Bottom Controls - ABSOLUTE BOTTOM */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center pb-8 md:pb-12 px-0 gap-8 pointer-events-auto">
        
        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col md:flex-row gap-3 md:gap-6 w-auto "
        >
          <PrimaryButton 
            href="#section-what-we-do"
            onClick={handleNavigation}
            // Custom Width for this specific button on Desktop only
            className="md:w-[280px] rounded-md"
          >
            Performance + Intelligence
          </PrimaryButton>

          <PrimaryButton 
            href="#section-brand-experience"
            onClick={handleNavigation}
            // Standard width for Desktop
            className="md:w-[240px] rounded-md"
          >
            Brand + Experience
          </PrimaryButton>
        </motion.div>

        {/* Indicators */}
        <div className="flex gap-4 h-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="group relative h-10 w-[60px] md:w-[100px] flex items-center justify-center"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className="absolute w-full h-[2px] bg-white/20 rounded-full overflow-hidden">
                {index === currentIndex && (
                  <motion.div
                    key={key}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
                    className="h-full bg-white"
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}