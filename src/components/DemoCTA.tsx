"use client";

import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { useModal } from "@/contexts/ModalContext";

const copy = {
  en: {
    title: "Ready to never miss a call?",
    sub: "Book a 15-minute demo and see Callme TH answer a live call for your business. No commitment, no credit card.",
    cta: "Free Demo",
    note: "7-day free trial included · No credit card required",
  },
  th: {
    title: "พร้อมที่จะไม่พลาดสายอีกต่อไปแล้วหรือยัง?",
    sub: "จองการสาธิต 15 นาที และดู Callme TH รับสายสดให้ธุรกิจของคุณ ไม่มีข้อผูกมัด ไม่ต้องใช้บัตรเครดิต",
    cta: "สาธิตฟรี",
    note: "ทดลองใช้ฟรี 7 วัน · ไม่ต้องใช้บัตรเครดิต",
  },
};

export default function DemoCTA() {
  const { lang } = useLang();
  const { openModal } = useModal();
  const t = copy[lang];
  return (
    <section id="demo" className="py-24 px-4" style={{ background: "#F5EDE3" }}>
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="relative rounded-3xl px-8 md:px-16 py-16 text-center overflow-hidden"
          style={{ background: "linear-gradient(145deg, #4A8875 0%, #3D7265 50%, #2C5A50 100%)", boxShadow: "0 32px 80px rgba(74,136,117,0.25)" }}>
          <div className="drift-blob absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none opacity-15"
            style={{ background: "radial-gradient(ellipse, #A8D0C4, transparent)", transform: "translate(30%, -30%)" }} />
          <div className="drift-blob absolute bottom-0 left-0 w-56 h-56 rounded-full pointer-events-none opacity-10"
            style={{ background: "radial-gradient(ellipse, #E8C4AE, transparent)", transform: "translate(-30%, 30%)", animationDelay: "2s" }} />
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6"
              style={{ background: "rgba(253,248,243,0.15)", border: "1px solid rgba(253,248,243,0.2)" }}>
              <CalendarCheck className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">{t.title}</h2>
            <p className="text-lg mb-8 max-w-xl mx-auto leading-relaxed" style={{ color: "rgba(253,248,243,0.75)" }}>{t.sub}</p>
            <button onClick={openModal}
              className="cursor-pointer inline-flex items-center gap-2 text-white font-bold text-base px-10 py-4 rounded-2xl transition-all duration-200 hover:opacity-90"
              style={{ background: "#C97B5A", boxShadow: "0 8px 24px rgba(44,36,32,0.2)" }}>
              {t.cta}
            </button>
            <p className="text-sm mt-5" style={{ color: "rgba(253,248,243,0.45)" }}>{t.note}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
