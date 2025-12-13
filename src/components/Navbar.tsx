"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import colouredLogo from "../assets/smartotels-final-logo-colored.svg";
import whiteLogo from "../assets/smartotels-final-logo-white.svg";
import { useLenis } from "lenis/react";

import { useRouter, usePathname } from "next/navigation";
import { useLoading } from "@/context/LoadingContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  const lenis = useLenis();
  const router = useRouter();
  const pathname = usePathname();
  const { showNavbar } = useLoading();

  useEffect(() => {
    const handleScroll = () => {
      const x = window.innerWidth / 2;
      const y = 50; 
      
      const elements = document.elementsFromPoint(x, y);
      
      const darkSections = ["section-hero", "section-footer", "section-founder"];
      let foundSectionId = null;

      for (const el of elements) {
        const section = el.closest('[id^="section-"]');
        if (section) {
          foundSectionId = section.id;
          break; 
        }
      }

      if (foundSectionId) {
        if (darkSections.includes(foundSectionId)) {
          setIsDarkBackground(true);
        } else {
          setIsDarkBackground(false);
        }
      } else {
        if (pathname === "/the-vault") {
             setIsDarkBackground(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href.startsWith("#")) {
      if (pathname === "/") {
        const targetId = href.replace("#", "");
        const targetElement = document.getElementById(targetId);

        if (targetElement && lenis) {
          lenis.scrollTo(targetElement, {
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
          });
        }
      } else {
        router.push("/" + href);
      }
    } else {
      router.push(href);
    }

    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = [
    { name: "Who We Are", href: "#section-who-we-are" },
    { name: "What We Do", href: "#section-what-we-do" },
    { name: "The Vault", href: "/the-vault" },
    { name: "Contact", href: "#section-footer" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={showNavbar ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] px-3 py-3 md:py-6 md:px-4 transition-all duration-300 pointer-events-none md:pointer-events-auto"
    >
      <div className="flex items-center justify-between pointer-events-auto">
        {/* LOGO */}
        <Link href="/" className="relative block z-50">
          <Image
            src={pathname === "/the-vault" ? whiteLogo : colouredLogo}
            alt="smartotels logo"
            width={200}
            height={40}
            className="w-auto h-4 md:h-6 object-contain transition-opacity duration-300"
            priority
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-4">
          {menuItems.map((item) => {
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavigation(e, item.href)}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-md transition-colors cursor-pointer text-black bg-white/80 hover:bg-white`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={toggleMenu}
          // UPDATED: Simply toggle between white and black based on background, regardless of open state
          className={`md:hidden z-50 p-2 focus:outline-none transition-colors duration-300 ${
             isDarkBackground ? "text-white" : "text-black"
          }`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            /* Close Icon (X) */
             // UPDATED: Removed 'text-white' so it inherits color from parent button
             <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="w-8 h-8" 
             >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            /* Hamburger Icon */
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md p-6 md:hidden flex flex-col items-center gap-6 shadow-xl border-t border-white/10 pointer-events-auto">
          {menuItems.map((item) => {
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavigation(e, item.href)}
                className="text-base font-regular font-open-sans  uppercase tracking-wider text-white hover:text-gray-300 transition-colors cursor-pointer"
              >
                {item.name}
              </a>
            );
          })}
        </div>
      )}
    </motion.nav>
  );
}