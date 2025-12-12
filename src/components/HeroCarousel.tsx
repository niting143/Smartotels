"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import Image, { StaticImageData } from "next/image"; 

// Configure Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "600", "800", "900"],
});

// Video Assets
import video1 from "../assets/hero1.mp4";
import video2 from "../assets/hero2.mp4";
import video3 from "../assets/hero3.mp4";
import video4 from "../assets/hero4.mp4";
import logoWhite from "../assets/smartotels-final-logo-colored.svg";

// Updated Interface
interface Slide {
  id: number;
  videoUrl: string;
  text: string[];
  logoImage?: StaticImageData; 
}

const slides: Slide[] = [
  {
    id: 1,
    videoUrl: video1,
    text: ["HOSPITALITY", "STRUCTURED BY DATA"],
  },
  {
    id: 2,
    videoUrl: video2,
    text: ["EXPERIENCE DESIGNED", "WITH INTELLIGENCE"],
  },
  {
    id: 3,
    videoUrl: video3,
    text: ["PERFORMANCE", "ENGINEERED TO ENDURE"],
  },
  {
    id: 4,
    videoUrl: video4,
    text: ["THIS IS"], 
    logoImage: logoWhite, 
  },
];

const ARCHITECTURAL_EASE = [0.76, 0, 0.24, 1] as const;
const SLIDE_DURATION = 7000;

// Primary Button Component
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
      "w-full py-3 text-xs tracking-widest px-4 text-center font-opensans",
      "md:py-4 md:text-sm",
      "bg-white text-neutral-950 font-regular font-opensans uppercase rounded-sm",
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
      const targetId = href.replace("#", "");
      const targetElement = document.getElementById(targetId);

      if (targetElement && lenis) {
        lenis.scrollTo(targetElement, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });

        gsap.fromTo(
          targetElement,
          { x: "-100%", opacity: 0 },
          {
            x: "0%",
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.2,
          }
        );
      }
    } else {
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

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 1. Minimum 3s Timer
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 2000);

    if (videoRef.current && videoRef.current.readyState >= 2) {
      setIsVideoLoaded(true);
    }

    return () => clearTimeout(timer);
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };
  
  // Only reveal content when BOTH video is loaded AND 3s have passed
  const isReady = isVideoLoaded && minTimeElapsed;

  return (
    <section
      className={cn(
        "relative h-[100dvh] w-full overflow-hidden bg-[#2F4E54] text-white",
        inter.className
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
          
          {/* Green Loading Overlay */}
          <div 
            className={cn(
              "absolute inset-0 bg-[#2F4E54] z-20 transition-opacity duration-1000 ease-in-out",
              isReady ? "opacity-0 pointer-events-none" : "opacity-100"
            )}
          />

          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={handleVideoLoad}
            onCanPlay={handleVideoLoad}
            className={cn(
               "object-cover w-full h-full transition-opacity duration-1000 ease-in-out",
               isReady ? "opacity-80" : "opacity-0"
            )}
          >
            <source src={slides[currentIndex].videoUrl} type="video/mp4" />
          </video>
        </motion.div>
      </AnimatePresence>

      {/* 2. Main Content Layer - TEXT & BUTTONS */}
      <div 
        className={cn(
            "absolute inset-0 z-20 flex flex-col items-center justify-center px-4 pointer-events-none md:px-12 transition-opacity duration-1000 ease-in-out delay-200", 
            isReady ? "opacity-100" : "opacity-0"
        )}
      >
        
        {/* TEXT CONTAINER */}
        {/* Changed mb-8 md:mb-12 to mb-24 md:mb-40 to push buttons down */}
        <div className="relative w-full flex items-center justify-center h-[15vh] md:h-[22vh] mb-15 md:mb-20">
            <AnimatePresence mode="wait">
            <motion.div
                key={currentIndex}
                variants={containerVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 flex flex-col items-center justify-center w-full text-center"
            >
                <div className="flex flex-col items-center">
                  {slides[currentIndex].text.map((line, index) => (
                    <div key={index} className="relative overflow-hidden">
                      <motion.span
                        variants={lineVariants}
                        className={cn(
                          "flex font-black uppercase tracking-tighter text-white whitespace-nowrap",
                          "text-[8vw] md:text-[6.5vw]",
                          "leading-[0.85] pb-[4vw] md:pb-[1vw] tracking-normal md:tracking-wider" 
                        )}
                      >
                        {line}
                      </motion.span>
                    </div>
                  ))}

                  {/* Logo Logic */}
                  {slides[currentIndex].logoImage && (
                    <div className="relative overflow-hidden pb-[4vw] md:pb-[1vw]">
                      <motion.div
                         variants={lineVariants}
                         className="relative w-[50vw] h-[10vw] md:w-[30vw] md:h-[4vw]"
                      >
                        <Image 
                          src={slides[currentIndex].logoImage} 
                          alt="Brand Logo" 
                          fill
                          className="object-contain"
                          priority
                        />
                      </motion.div>
                    </div>
                  )}
                </div>
            </motion.div>
            </AnimatePresence>
        </div>

        {/* Buttons */}
        <div className="flex flex-col w-full max-w-md md:max-w-none md:w-auto gap-3 pointer-events-auto md:flex-row md:gap-4 items-center justify-center">
            <PrimaryButton 
                href="#section-what-we-do"
                onClick={handleNavigation}
                className="w-[85%] md:w-[300px] rounded-lg"
            >
                Performance + Intelligence
            </PrimaryButton>

            <PrimaryButton 
                href="#section-brand-experience"
                onClick={handleNavigation}
                className="w-[85%] md:w-[240px] rounded-lg"
            >
                Brand + Experience
            </PrimaryButton>
        </div>
      </div>
    </section>
  );
}