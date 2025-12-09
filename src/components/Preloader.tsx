"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "../assets/smartotels-final-logo-white.svg";
import { useEffect } from "react";
import { useLoading } from "@/context/LoadingContext";

export default function Preloader() {
  const { isLoading, setIsLoading, setShowNavbar, setShowContent } = useLoading();

  useEffect(() => {
    // 1. Start with Logo Splash
    // 2. After 3s, finish loading (this triggers exit animation of Preloader)
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // 3. Immediately after Preloader starts exiting, show Navbar
      setTimeout(() => setShowNavbar(true), 500); // 0.5s delay to sync with preloader exit

      // 4. Then show Content
      setTimeout(() => setShowContent(true), 800); 

    }, 3000);

    return () => clearTimeout(timer);
  }, [setIsLoading, setShowNavbar, setShowContent]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[45] flex items-center justify-center bg-[#2F4E54]"
        >
          {/* Pulse Animation for Logo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: [0.9, 1.1, 1],
              opacity: 1
            }}
            transition={{ 
              duration: 2.5, 
              times: [0, 0.6, 1],
              ease: "easeOut" 
            }}
            className="relative w-48 md:w-64"
          >
            <Image
              src={logo}
              alt="Smartotels Logo"
              className="w-full h-auto object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
