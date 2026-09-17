import React, { useState, useEffect } from "react";
import { listPartners } from "@/api/partners";
import Header from "@/components/club/Header";
import ScrollLockedVideoHero from "@/components/ui/scroll-locked-video-hero";
import TrustSection from "@/components/editorial/TrustSection";
import StepsSection from "@/components/editorial/StepsSection";
import StatsSection from "@/components/editorial/StatsSection";
import EditorialFooter from "@/components/editorial/EditorialFooter";
import PartnerGrid from "@/components/club/PartnerGrid";
import PartnerModal from "@/components/club/PartnerModal";
import Testimonials from "@/components/club/Testimonials";
import Faq from "@/components/club/Faq";

export default function Home() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    listPartners("-featured").then((data) => {
      setPartners(data);
      setLoading(false);
    });
  }, []);

  const handleSelect = (partner) => {
    setSelected(partner);
    setOpen(true);
  };

  const categoryCount = new Set(partners.map((p) => p.category)).size;

  return (
    <div className="min-h-screen bg-white antialiased">
      <ScrollLockedVideoHero
        videoSrc="/media/hero-video.mp4"
        title="A CIDADE SE ABRE"
        tagline="Clube de Benefícios Adim Aluguéis"
        scrollHint="ROLE"
      />
      <Header />
      <main className="w-full overflow-x-clip p-2 sm:p-3">
        <TrustSection />
        <StepsSection />
        <PartnerGrid partners={partners} loading={loading} onSelect={handleSelect} />
        <Testimonials />
        <StatsSection partnerCount={partners.length} categoryCount={categoryCount} />
        <Faq />
        <EditorialFooter />
      </main>
      <PartnerModal partner={selected} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
