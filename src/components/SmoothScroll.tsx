"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";
import { LoadingProvider } from "@/context/LoadingContext";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <LoadingProvider>
      <ReactLenis root options={{ 
        lerp: 0.1, 
        duration: 1.5, 
        touchMultiplier: 2 
      }}>
        {children}
      </ReactLenis>
    </LoadingProvider>
  );
}
