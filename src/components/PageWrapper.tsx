"use client";

import { useLoading } from "@/context/LoadingContext";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  const { showContent } = useLoading();

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.main>
  );
}
