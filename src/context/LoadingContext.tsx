"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
  showNavbar: boolean;
  setShowNavbar: (v: boolean) => void;
  showContent: boolean;
  setShowContent: (v: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true); // Splash screen active
  const [showNavbar, setShowNavbar] = useState(false); // Navbar visible
  const [showContent, setShowContent] = useState(false); // Main content visible

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
        showNavbar,
        setShowNavbar,
        showContent,
        setShowContent,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}
