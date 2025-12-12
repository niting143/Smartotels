"use client";

import { useState } from "react";

export default function TheVault() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Check if user entered inputs
    if (username && password) {
      // Simulate validation failure as requested
      setError("Invalid username or password. Please try again.");
    } else {
        // Optional: Handle empty fields if 'required' attribute isn't enough
        setError("Please fill in both fields.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-[#2F4E54] p-4 overflow-hidden">
      {/* Login Card - Reduced padding (p-6 md:p-10) to compact height */}
      <div className="w-full max-w-[400px] bg-white/90 backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-sm p-6 md:p-10 relative z-10">
        
        {/* Header - Reduced bottom margin */}
        <div className="text-center mb-6">
          <h1 className="text-xl md:text-2xl font-regular text-black tracking-wide mb-1 uppercase">
            The Vault
          </h1>
          <h2 className="text-lg md:text-xl font-regular text-black tracking-wide uppercase mb-4">
            Access Portal
          </h2>
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed max-w-[260px] mx-auto">
            Please use the access credentials shared with you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label 
              htmlFor="username" 
              className="text-gray-700 text-sm font-medium"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 p-2.5 rounded-sm focus:outline-none focus:border-[#2F4E54] transition-colors bg-white/80 text-sm"
            />
          </div>

          {/* Password with Eye Icon */}
          <div className="flex flex-col gap-1.5">
            <label 
              htmlFor="password" 
              className="text-gray-700 text-sm font-medium"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-2.5 pr-10 rounded-sm focus:outline-none focus:border-[#2F4E54] transition-colors bg-white/80 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  // Eye Icon (Visible)
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  // Eye Slash Icon (Hidden)
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 mt-1">
              <p className="text-red-700 text-xs font-medium">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#2F4E54] text-white font-bold py-3 rounded-md hover:bg-[#264046] transition-colors mt-2 text-sm uppercase tracking-wider shadow-lg"
          >
            Access
          </button>
        </form>
      </div>
    </div>
  );
}