"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#2F4E54]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-ping rounded-full border-2 border-[#D4AF37] opacity-20"></div>
          <div className="absolute inset-2 animate-[spin_3s_linear_infinite] rounded-full border-t-2 border-[#D4AF37]"></div>
          <div className="absolute inset-4 animate-pulse rounded-full bg-[#D4AF37]/20"></div>
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-[#D4AF37]"></div>
        </div>
      </div>
    </div>
  );
}
