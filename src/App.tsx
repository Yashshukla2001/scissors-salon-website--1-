import { useState } from "react";
import { useLenis } from "@/hooks/useLenis";

import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import EngagementPopup from "@/components/EngagementPopup";
import BackToTop from "@/components/BackToTop";

import Hero from "@/sections/Hero";
import TrustStrip from "@/sections/TrustStrip";
import BrandStory from "@/sections/BrandStory";
import Services from "@/sections/Services";
import Transformation from "@/sections/Transformation";
import Artists from "@/sections/Artists";
import SignatureFeatures from "@/sections/SignatureFeatures";
import ExperienceStat from "@/sections/ExperienceStat";
import Journey from "@/sections/Journey";
import BookingFlow from "@/sections/BookingFlow";
import WhyUs from "@/sections/WhyUs";
import Gallery from "@/sections/Gallery";
import InstagramSection from "@/sections/InstagramSection";
import Reviews from "@/sections/Reviews";
import BrandMoment from "@/sections/BrandMoment";
import FAQ from "@/sections/FAQ";
import VisitUs from "@/sections/VisitUs";
import FinalCTA from "@/sections/FinalCTA";
import Footer from "@/sections/Footer";

export default function App() {
  const [loading, setLoading] = useState(true);
  useLenis();

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <Navbar />

      <main>
        <Hero />
        <TrustStrip />
        <BrandStory />
        <Services />
        <Transformation />
        <Artists />
        <SignatureFeatures />
        <ExperienceStat />
        <Journey />
        <BookingFlow />
        <WhyUs />
        <Gallery />
        <InstagramSection />
        <Reviews />
        <BrandMoment />
        <FAQ />
        <VisitUs />
        <FinalCTA />
        <Footer />
      </main>

      <WhatsAppFloat />
      <EngagementPopup />
      <BackToTop />
    </>
  );
}
