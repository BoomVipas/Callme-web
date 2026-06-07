"use client";

import { motion } from "framer-motion";
import { Languages, Clock, CalendarCheck, FileText, HelpCircle, Bell } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const copy = {
  en: {
    label: "Features",
    title: "Everything a receptionist does,",
    titleHighlight: "automated",
    sub: "Built specifically for Thai SMBs — restaurants, clinics, and salons.",
    industries: ["Restaurants", "Clinics", "Salons"],
    features: [
      { title: "Thai & English, naturally", desc: "Speaks with customers in Thai or English without robotic scripts. Sounds like a real person on every call." },
      { title: "24/7, 365 days a year", desc: "Handles calls at midnight, on holidays, during rush hours — whenever customers call, the AI is there." },
      { title: "Books appointments", desc: "Automatically schedules reservations and appointments and confirms them directly with your customers." },
      { title: "Instant call summaries", desc: "Get a clean summary of every call via Line or email so you always know what was discussed." },
      { title: "Handles FAQs & pricing", desc: "Answer the same questions — hours, menu, prices, directions — automatically, every time." },
      { title: "Real-time notifications", desc: "Get alerted for urgent calls or anything the AI flags as needing your personal attention." },
    ],
  },
  th: {
    label: "ฟีเจอร์",
    title: "ทุกสิ่งที่พนักงานต้อนรับทำ",
    titleHighlight: "อัตโนมัติ",
    sub: "สร้างมาเพื่อธุรกิจ SMB ไทยโดยเฉพาะ — ร้านอาหาร คลินิก และร้านเสริมสวย",
    industries: ["ร้านอาหาร", "คลินิก", "ร้านเสริมสวย"],
    features: [
      { title: "ภาษาไทยและอังกฤษ เป็นธรรมชาติ", desc: "คุยกับลูกค้าได้ทั้งภาษาไทยและอังกฤษโดยไม่ฟังดูเหมือนโรบอต ฟังดูเหมือนคนจริงทุกสาย" },
      { title: "24/7 ตลอด 365 วัน", desc: "รับสายได้ทุกเวลา วันหยุดนักขัตฤกษ์ ช่วงเร่งด่วน หรือแม้แต่ตี 4 — AI พร้อมเสมอ" },
      { title: "นัดหมายอัตโนมัติ", desc: "จัดการการจองและนัดหมายโดยอัตโนมัติ พร้อมยืนยันกับลูกค้าโดยตรง" },
      { title: "สรุปสายทันที", desc: "รับสรุปสายทุกสายผ่าน Line หรืออีเมล เพื่อให้คุณรู้ทุกอย่างที่เกิดขึ้น" },
      { title: "ตอบ FAQ และราคา", desc: "ตอบคำถามซ้ำๆ อัตโนมัติ — เวลาทำการ เมนู ราคา เส้นทาง ทุกครั้ง" },
      { title: "แจ้งเตือนแบบ Real-time", desc: "รับแจ้งเตือนสำหรับสายสำคัญหรือสิ่งที่ AI ตั้งค่าสถานะว่าต้องการความสนใจจากคุณ" },
    ],
  },
};

const iconList = [Languages, Clock, CalendarCheck, FileText, HelpCircle, Bell];
const iconStyles = [
  { iconBg: "#EFF7F4", iconColor: "#6BA898" },
  { iconBg: "#EEF4F7", iconColor: "#8DB5C8" },
  { iconBg: "#EFF7F4", iconColor: "#6BA898" },
  { iconBg: "#F7F2EF", iconColor: "#C97B5A" },
  { iconBg: "#EFF7F4", iconColor: "#6BA898" },
  { iconBg: "#EEF4F7", iconColor: "#8DB5C8" },
];
const industryStyles = [
  { bg: "#EFF7F4", color: "#4A8875" },
  { bg: "#EEF4F7", color: "#5A8098" },
  { bg: "#F7F2EF", color: "#A0604A" },
];

export default function Features() {
  const { lang } = useLang();
  const t = copy[lang];

  return (
    <section className="py-24 px-4" style={{ background: "#F5EDE3" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#6BA898" }}>
            {t.label}
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: "#2C2420" }}>
            {t.title}{" "}<span style={{ color: "#6BA898" }}>{t.titleHighlight}</span>
          </h2>
          <p className="text-lg mt-4 max-w-xl mx-auto leading-relaxed" style={{ color: "#7A6660" }}>{t.sub}</p>
          <div className="flex items-center justify-center gap-3 mt-6">
            {t.industries.map((ind, i) => (
              <span key={ind} className="inline-flex items-center text-sm font-medium px-4 py-1.5 rounded-full"
                style={{ background: industryStyles[i].bg, color: industryStyles[i].color }}>
                {ind}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.features.map((feature, i) => {
            const Icon = iconList[i];
            const s = iconStyles[i];
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group p-7 rounded-3xl cursor-default transition-all duration-200"
                style={{ background: "#FDF8F3", border: "1px solid #E8DDD5", boxShadow: "0 2px 12px rgba(44,36,32,0.04)" }}
              >
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5" style={{ background: s.iconBg }}>
                  <Icon className="w-5 h-5" style={{ color: s.iconColor }} strokeWidth={2} />
                </div>
                <h3 className="font-bold text-[17px] mb-2 leading-snug" style={{ color: "#2C2420" }}>{feature.title}</h3>
                <p className="text-[14px] leading-relaxed" style={{ color: "#7A6660" }}>{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
