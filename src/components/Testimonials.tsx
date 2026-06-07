"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const copy = {
  en: {
    label: "Customer stories",
    title: "Thai businesses love Callme TH",
    reviews: [
      { name: "Khun Somchai", role: "Owner, Som Tam Nua Restaurant", industry: "Restaurant",
        quote: "We used to miss 30% of our reservation calls during dinner rush. Now Callme TH handles them all while I'm in the kitchen. Bookings are up and I'm less stressed." },
      { name: "Dr. Nattaporn", role: "Clinic Manager, Nattaporn Medical", industry: "Clinic",
        quote: "Our patients can call at midnight and still get answers about appointments and directions. It even handles the most common questions so my staff can focus on care." },
      { name: "Khun Wanida", role: "Owner, W Beauty Salon", industry: "Salon",
        quote: "Set up took less than 10 minutes. It handles booking, cancellations, and rescheduling automatically. Genuinely feels like having an extra staff member." },
    ],
  },
  th: {
    label: "เสียงจากลูกค้า",
    title: "ธุรกิจไทยรัก Callme TH",
    reviews: [
      { name: "คุณสมชาย", role: "เจ้าของ ร้านส้มตำนัว", industry: "ร้านอาหาร",
        quote: "เราเคยพลาดสายจองถึง 30% ช่วงเวลาเย็น ตอนนี้ Callme TH จัดการทั้งหมดในขณะที่ผมอยู่ในครัว การจองเพิ่มขึ้นและผมเครียดน้อยลงมาก" },
      { name: "นพ.ณัฐพร", role: "ผู้จัดการคลินิก ณัฐพรเวชกรรม", industry: "คลินิก",
        quote: "ผู้ป่วยโทรมาตีสองก็ยังได้รับคำตอบเรื่องนัดหมายและทิศทาง AI ยังตอบคำถามทั่วไปแทนพนักงานได้อีกด้วย ทีมงานโฟกัสกับการดูแลผู้ป่วยได้มากขึ้น" },
      { name: "คุณวนิดา", role: "เจ้าของ ร้านเสริมสวย W Beauty", industry: "ร้านเสริมสวย",
        quote: "ตั้งค่าใช้เวลาไม่ถึง 10 นาที รับสาย จัดการการยกเลิก และจัดตารางใหม่อัตโนมัติ รู้สึกเหมือนมีพนักงานเพิ่มอีกหนึ่งคน" },
    ],
  },
};

const avatarStyles = [
  { letter: "ส", from: "#A8C8BE", to: "#6BA898", industryBg: "#EFF7F4", industryColor: "#4A8875" },
  { letter: "น", from: "#8DB5C8", to: "#5A8098", industryBg: "#EEF4F7", industryColor: "#5A8098" },
  { letter: "ว", from: "#E8C4AE", to: "#C97B5A", industryBg: "#F7F2EF", industryColor: "#A0604A" },
];

export default function Testimonials() {
  const { lang } = useLang();
  const t = copy[lang];

  return (
    <section className="py-24 px-4" style={{ background: "#F5EDE3" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="text-center mb-16">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#6BA898" }}>{t.label}</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: "#2C2420" }}>{t.title}</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {t.reviews.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl p-7 flex flex-col transition-all duration-200"
              style={{ background: "#FDF8F3", border: "1px solid #E8DDD5", boxShadow: "0 2px 16px rgba(44,36,32,0.05)" }}
            >
              <div className="flex gap-0.5 mb-5">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4" style={{ fill: "#D4A852", color: "#D4A852" }} />)}
              </div>
              <blockquote className="text-[15px] leading-relaxed flex-1 mb-6" style={{ color: "#5C4E47" }}>
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${avatarStyles[i].from}, ${avatarStyles[i].to})` }}>
                  {avatarStyles[i].letter}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: "#2C2420" }}>{r.name}</div>
                  <div className="text-xs" style={{ color: "#9C8C85" }}>{r.role}</div>
                </div>
                <span className="ml-auto text-xs font-medium px-2.5 py-1 rounded-full"
                  style={{ background: avatarStyles[i].industryBg, color: avatarStyles[i].industryColor }}>
                  {r.industry}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
