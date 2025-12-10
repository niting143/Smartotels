"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import colouredLogo from "../assets/smartotels-final-logo-colored.svg";
import { useLenis } from "lenis/react";
import gsap from "gsap";
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
      // Check the element at the center top of the viewport roughly where the navbar logo area is
      // We look a bit below the very top edge to catch the section body
      const x = window.innerWidth / 2;
      const y = 50; // 50px down from top
      
      // Use efficient elementFromPoint vs elementsFromPoint if possible, 
      // but logic relied on traversing parents.
      const elements = document.elementsFromPoint(x, y);
      
      // Define which sections are dark
      const darkSections = ["section-hero", "section-footer", "section-founder"];
      // Assuming others are light

      let foundSectionId = null;

      for (const el of elements) {
        // Find the closest parent with an id starting with 'section-'
        const section = el.closest('[id^="section-"]');
        if (section) {
          foundSectionId = section.id;
          break; // Found the top-most section
        }
      }

      if (foundSectionId) {
        if (darkSections.includes(foundSectionId)) {
          setIsDarkBackground(true);
        } else {
          setIsDarkBackground(false);
        }
      } else {
        // Fallback for pages without sections (e.g., The Vault)
        // For /the-vault, user requested white logo -> isDarkBackground = true
        if (pathname === "/the-vault") {
             setIsDarkBackground(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (href.startsWith("#")) {
      // Internal Scroll Link
      if (pathname === "/") {
        // We are on Home Page -> Scroll Smoothly
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
        // We are on another page (e.g. /the-vault) -> Go to Home + Hash
        router.push("/" + href);
      }
    } else {
      // External/Route Link (The Vault)
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
      className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-4 transition-all duration-300 pointer-events-none md:pointer-events-auto"
    >
      <div className="flex items-center justify-between pointer-events-auto">
        {/* LOGO */}
        <Link href="/" className="relative block z-50">
          <Image
            src={colouredLogo}
            alt="smartotels logo"
            width={200}
            height={40}
            className="w-auto h-4 md:h-6 object-contain transition-opacity duration-300"
            priority
          />
        </Link>

        {/* DESKTOP MENU (Hidden on Mobile) */}
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

        {/* MOBILE HAMBURGER BUTTON (Visible on Mobile) */}
        <button
          onClick={toggleMenu}
          className={`md:hidden z-50 p-2 focus:outline-none transition-colors duration-300 ${
             isDarkBackground && !isMobileMenuOpen ? "text-white" : "text-black"
          }`}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            /* Close Icon (X) */
             <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="w-8 h-8 text-white" 
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
              className={`w-8 h-8 ${isDarkBackground ? "text-white" : "text-black"}`}
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