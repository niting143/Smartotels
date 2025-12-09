"use client";

import { useState } from "react";
import Image from "next/image";
import bgImage from '../../assets/bonsai 1.png';

export default function TheVault() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login attempt:", { username, password });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative p-4 overflow-hidden">
      
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgImage}
          alt="Bonsai background"
          fill
          className="object-cover"
          priority
          placeholder="blur" // Adds a blur effect while loading since it's a static import
        />
        {/* Optional: Dark overlay to ensure the white card pops if the image is too bright */}
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[420px] bg-white/90 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-sm p-8 md:p-12 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-regular text-black tracking-wide mb-2 uppercase">
            The Vault
          </h1>
          <h2 className="text-xl md:text-2xl font-regular text-black tracking-wide uppercase mb-6">
            Access Portal
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-[280px] mx-auto">
            Please use the access credentials shared with you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label 
              htmlFor="username" 
              className="text-gray-700 text-sm md:text-base font-medium"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-[#2F4E54] transition-colors bg-white/80"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label 
              htmlFor="password" 
              className="text-gray-700 text-sm md:text-base font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-sm focus:outline-none focus:border-[#2F4E54] transition-colors bg-white/80"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2F4E54] text-white font-bold py-3.5 rounded-md hover:bg-[#264046] transition-colors mt-2 text-base uppercase tracking-wider shadow-lg"
          >
            Access
          </button>
        </form>
      </div>
    </div>
  );
}