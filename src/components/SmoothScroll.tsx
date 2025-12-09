"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";
import { LoadingProvider } from "@/context/LoadingContext";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <LoadingProvider>
      <ReactLenis root>
        {children}
      </ReactLenis>
    </LoadingProvider>
  );
}
