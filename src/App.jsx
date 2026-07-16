import React from "react";

// Import all sections
import Header from "./Compoents/Header";
import HeroSection from "./Compoents/HeroSection";
import IntegrationsBar from "./Compoents/IntegrationsBar";
import HiringPainPoints from "./Compoents/HiringPainPoints";
import SmartHiringStack from "./Compoents/SmartHiringStack";
import HiringFlow from "./Compoents/HiringFlow";
import HiringFeatures from "./Compoents/HiringFeatures";
import HumanVsAI from "./Compoents/HumanVsAI";
import AptahireImpactTable from "./Compoents/AptahireImpactTable";
import TestimonialsSection from "./Compoents/TestimonialsSection";
import RatingsSection from "./Compoents/RatingsSection";
import FAQSection from "./Compoents/FAQSection";
import GuaranteeSection from "./Compoents/GuaranteeSection";
import FinalCTASection from "./Compoents/FinalCTASection";
import Footer from "./Compoents/Footer";
import AIHiringPartnerSection from "./Compoents/AIHiringPartnerSection";
import StickyOfferFooter from "./Compoents/StickyOfferFooter";

const App = () => {
  
  return (
    <>
      <Header />
      <HeroSection />
      <IntegrationsBar />
      <HiringPainPoints />
      <SmartHiringStack />
      <AIHiringPartnerSection />
      <HiringFlow />
      <HiringFeatures />
      <HumanVsAI />
      <AptahireImpactTable />
      <TestimonialsSection />
      <RatingsSection />
      <FAQSection />
      <GuaranteeSection />
      <FinalCTASection />
       <Footer />
       <StickyOfferFooter />
    </>
  );
};

export default App;
