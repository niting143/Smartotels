import HeroCarousel from "@/components/HeroCarousel";
import WhoWeAre from "@/components/WhoWeAre";
import WhatWeDo from "@/components/WhatWeDo";
import BrandExperience from "@/components/BrandExperience";
import HospitalityStructured from "@/components/HospitalityStructured";
import Footer from "@/components/Footer";
import WatermarkHeading from "@/components/WatermarkHeading";

import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <div id="section-hero" className="relative z-0">
        <HeroCarousel />
      </div>

      <WatermarkHeading />

      {/* WhoWeAre */}
      <div id="section-who-we-are" className="relative z-10 bg-white">
        <WhoWeAre />
      </div>

      {/* WhatWeDo */}
      <div id="section-what-we-do" className="relative z-20 bg-white">
        <WhatWeDo />
      </div>

      {/* BrandExperience */}
      <div id="section-brand-experience" className="relative z-30 bg-gray-50">
        <BrandExperience />
      </div>

      {/* HospitalityStructured */}
      {/* <div className="relative z-40 bg-black">
        <HospitalityStructured />
      </div> */}

      {/* Footer */}
      <div id="section-footer" className="relative z-50 bg-black">
        <Footer />
      </div>
    </div>
  );
}
