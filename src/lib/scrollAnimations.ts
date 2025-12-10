import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Fenix-style animation variants
export const scrollAnimationVariants = {
  fadeUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  },
  slideLeft: {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  },
  slideRight: {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

// GSAP ScrollTrigger animation hook
export const useScrollAnimation = (
  animationType: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scaleIn" = "fadeUp",
  delay: number = 0
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const variants = scrollAnimationVariants[animationType];
    
    gsap.fromTo(
      element,
      variants.initial,
      {
        ...variants.animate,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        delay,
        ease: variants.transition.ease,
        duration: variants.transition.duration,
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animationType, delay]);

  return ref;
};

// Stagger animation for multiple children
export const useStaggerScrollAnimation = (
  selector: string,
  animationType: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scaleIn" = "fadeUp",
  stagger: number = 0.1
) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    if (elements.length === 0) return;

    const variants = scrollAnimationVariants[animationType];

    gsap.fromTo(
      elements,
      variants.initial,
      {
        ...variants.animate,
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        stagger,
        ease: variants.transition.ease,
        duration: variants.transition.duration,
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selector, animationType, stagger]);

  return ref;
};

