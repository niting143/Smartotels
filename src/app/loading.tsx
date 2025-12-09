import Image from "next/image";
import logo from "../assets/smartotels-final-logo-white.svg";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[45] flex items-center justify-center bg-[#2F4E54]">
      <div className="relative w-48 md:w-64 animate-pulse">
        <Image
          src={logo}
          alt="Smartotels Loading"
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </div>
  );
}
