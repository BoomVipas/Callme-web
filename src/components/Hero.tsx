"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Phone } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { useModal } from "@/contexts/ModalContext";

const copy = {
  en: {
    heading1: "Your AI Receptionist,",
    heading2: "Never Misses a Call",
    sub: "No staff needed. Callme TH answers every customer call for your restaurant, clinic, or salon — in Thai and English, around the clock.",
    cta: "Free Demo",
    secondary: "See how it works",
    trust: "Trusted by",
    businesses: "20+ businesses",
  },
  th: {
    heading1: "AI เลขานุการของคุณ",
    heading2: "ไม่พลาดทุกสาย",
    sub: "ไม่ต้องจ้างพนักงาน Callme TH รับสายลูกค้าทุกสาย ทั้งร้านอาหาร คลินิก และร้านเสริมสวย — ภาษาไทยและอังกฤษ ตลอด 24 ชั่วโมง",
    cta: "สาธิตฟรี",
    secondary: "ดูวิธีการทำงาน",
    trust: "ไว้วางใจโดย",
    businesses: "กว่า 20 ธุรกิจ",
  },
};

export default function Hero() {
  const { lang } = useLang();
  const { openModal } = useModal();
  const t = copy[lang];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden">

      {/* Background video */}
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" src="/videos/hero-bg-kling.mp4" />

      {/* Soft overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(to bottom, rgba(245,237,227,0.45) 0%, rgba(245,237,227,0.25) 50%, rgba(245,237,227,0.6) 100%)",
      }} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">

        {/* Logo symbol */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-3 mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
            style={{ background: "linear-gradient(145deg, #6BA898, #4A8875)", boxShadow: "0 8px 32px rgba(107,168,152,0.35)" }}>
            <Phone className="w-7 h-7 text-white" strokeWidth={2} />
          </div>
          <span className="text-base font-extrabold tracking-tight" style={{ color: "#2C2420" }}>
            Callme <span style={{ color: "#6BA898" }}>TH</span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.06] tracking-tight mb-6" style={{ color: "#2C2420" }}>
          <span className="block">{t.heading1}</span>
          <span className="block" style={{ color: "#4A8875", textShadow: "0 0 40px rgba(255,255,255,1), 0 0 80px rgba(255,255,255,0.9), 0 2px 12px rgba(255,255,255,0.8)" }}>{t.heading2}</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.18 }}
          className="text-base max-w-xl mx-auto leading-relaxed mb-10" style={{ color: "#5C4E47" }}>
          {t.sub}
        </motion.p>

        {/* CTA row */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.26 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button onClick={openModal}
            className="cursor-pointer inline-flex items-center gap-2 text-white font-bold text-base px-8 py-4 rounded-2xl transition-all duration-200 hover:opacity-90"
            style={{ background: "#C97B5A", boxShadow: "0 8px 24px rgba(201,123,90,0.3)" }}>
            {t.cta}
          </button>
          <a href="#how-it-works" className="cursor-pointer inline-flex items-center gap-2 font-medium text-base transition-colors duration-200 hover:opacity-70" style={{ color: "#5C4E47" }}>
            {t.secondary}<ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Social proof */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.35 }}
          className="flex items-center justify-center gap-3">
          <div className="flex -space-x-2">
            {[
              { l: "ส", from: "#A8C8BE", to: "#6BA898" },
              { l: "น", from: "#8DB5C8", to: "#5A95AE" },
              { l: "ว", from: "#E8C4AE", to: "#C97B5A" },
              { l: "ก", from: "#B5C8A8", to: "#7A9E6A" },
            ].map((a, i) => (
              <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-white text-xs font-bold"
                style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})`, borderColor: "rgba(245,237,227,0.8)" }}>
                {a.l}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5" style={{ fill: "#D4A852", color: "#D4A852" }} />)}
          </div>
          <span className="text-sm" style={{ color: "#5C4E47" }}>
            {t.trust} <span className="font-semibold" style={{ color: "#2C2420" }}>{t.businesses}</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}
