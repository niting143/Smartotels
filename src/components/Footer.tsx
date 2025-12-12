"use client";

import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import footerImage from "../assets/Picture 3.jpeg";
import logo from "../assets/logo.png";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLenis } from "lenis/react";
import gsap from "gsap";
import { useRouter } from "next/navigation";

// --- PARALLAX IMAGE COMPONENT ---
function ParallaxImage({ src, alt }: { src: StaticImageData; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Vertical parallax movement
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  
  // SCALE INCREASED: Set to 1.15 to create a bleed area.
  // This ensures the image covers the container even when moved by the parallax effect.
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1.15]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden">
      <motion.div style={{ y, scale }} className="w-full h-full relative">
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 40vw"
          priority={false}
          placeholder="blur"
        />
      </motion.div>
    </div>
  );
}

export default function Footer() {
  const lenis = useLenis();
  const router = useRouter();

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Ignore mailto links
    if (href.startsWith("mailto:")) return;

    e.preventDefault();

    if (href.startsWith("#")) {
      // Internal Scroll Link
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
      // External Page Link
      router.push(href);
    }
  };

  return (
    <footer id="section-footer" className="relative bg-[#313131]">
      {/* CTA Section */}
      <div className="relative py-12 md:py-24 px-4 md:px-12 flex justify-center items-center">
        {/* White Card Container */}
        <div className="bg-white shadow-2xl flex flex-col md:flex-row w-full overflow-hidden">
          
          {/* Image Side with Parallax */}
          {/* Added bg-[#313131] here to mask any gaps with the footer color instead of white */}
          <div className="relative w-full md:w-[40%] h-[400px] md:h-auto bg-[#313131]">
             <ParallaxImage src={footerImage} alt="Antelope Canyon" />
          </div>

          {/* Text Side */}
          <div className="p-8 md:p-20 md:w-[60%] flex flex-col justify-center bg-white z-10 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-[20px] font-regular uppercase tracking-widest text-black mb-4">
                CONTACT US
              </h3>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6 text-black">
                Let us build something enduring.
              </h2>
              <div className="max-w-2xl">
                <p className="text-[#474747] text-base mb-6 leading-relaxed">
                  Smartotels is based in Dubai and operates across global markets.
                  We work with investors, owners, operators, and institutions that
                  see hospitality as a system of intelligence and performance.
                </p>
                <p className="text-[#474747] text-base mb-8 leading-relaxed">
                  For partnerships, advisory, or asset discussions, reach out directly.
                </p>
                <Link
                  href="mailto:info@smartotels.com"
                  className="inline-block text-black font-semibold tracking-wider hover:text-[#C5A265] transition-colors"
                >
                  e. info@smartotels.com
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Simplified Links Section with Logo and Copyright */}
      <div className="bg-[#313131] text-white py-12 px-6 md:px-12 flex flex-col items-center border-t border-white/10">
        <a 
          href="/" 
          onClick={(e) => handleNavigation(e, "/")}
          className="mb-4 block cursor-pointer"
        >
          <Image src={logo} alt="Smartotels Logo" width={40} height={40} className="h-10 w-auto" />
        </a>
        <div className="text-center text-base font-regular text-white/80">
          <p>Copyright {new Date().getFullYear()}. Smartotels LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}