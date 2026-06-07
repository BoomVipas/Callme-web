"use client";

import { motion } from "framer-motion";
import { Plug, Brain, MessageSquare } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const copy = {
  en: {
    label: "How it works",
    title: "Up and running in under 10 minutes",
    sub: "No developers needed. Just connect, train, and let the AI handle every call.",
    steps: [
      { title: "Connect in 5 minutes", desc: "Forward your business phone number to Callme TH. No hardware, no tech skills required." },
      { title: "Train it on your business", desc: "Add your menu, hours, prices, and FAQs. The AI learns your business and speaks in your tone." },
      { title: "Get summaries instantly", desc: "Every call is answered and summarized. Receive call logs via Line or email so nothing slips through." },
    ],
  },
  th: {
    label: "วิธีการทำงาน",
    title: "เริ่มใช้งานได้ภายใน 10 นาที",
    sub: "ไม่ต้องใช้นักพัฒนา เพียงเชื่อมต่อ ตั้งค่า แล้วให้ AI รับสายแทนคุณ",
    steps: [
      { title: "เชื่อมต่อใน 5 นาที", desc: "โอนสายธุรกิจของคุณมาที่ Callme TH ไม่ต้องใช้อุปกรณ์พิเศษ ไม่ต้องมีความรู้ด้านเทคนิค" },
      { title: "ฝึก AI ให้รู้จักธุรกิจคุณ", desc: "เพิ่มเมนู เวลาทำการ ราคา และคำถามที่พบบ่อย AI จะเรียนรู้และพูดในโทนของคุณ" },
      { title: "รับสรุปสายทันที", desc: "ทุกสายถูกรับและสรุปส่งให้คุณผ่าน Line หรืออีเมล ไม่มีสายหลุดอีกต่อไป" },
    ],
  },
};

const colors = [
  { iconBg: "#EFF7F4", iconColor: "#6BA898", border: "rgba(107,168,152,0.2)" },
  { iconBg: "#EEF4F7", iconColor: "#8DB5C8", border: "rgba(141,181,200,0.2)" },
  { iconBg: "#F7F2EF", iconColor: "#C97B5A", border: "rgba(201,123,90,0.2)" },
];
const icons = [Plug, Brain, MessageSquare];

export default function HowItWorks() {
  const { lang } = useLang();
  const t = copy[lang];

  return (
    <section id="how-it-works" className="py-24 px-4" style={{ background: "#FDF8F3" }}>
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
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight" style={{ color: "#2C2420" }}>
            {t.title}
          </h2>
          <p className="text-lg mt-4 max-w-xl mx-auto leading-relaxed" style={{ color: "#7A6660" }}>
            {t.sub}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-10 h-px"
            style={{ left: "calc(16.67% + 28px)", right: "calc(16.67% + 28px)", background: "linear-gradient(90deg, #A8D0C4, #8DB5C8, #C97B5A)", opacity: 0.3 }} />

          {t.steps.map((step, i) => {
            const Icon = icons[i];
            const c = colors[i];
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative rounded-3xl p-8"
                style={{ background: "#FDF8F3", border: `1px solid ${c.border}`, boxShadow: "0 2px 16px rgba(44,36,32,0.05)" }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: c.iconBg }}>
                  <Icon className="w-5 h-5" style={{ color: c.iconColor }} strokeWidth={2} />
                </div>
                <div className="text-xs font-bold tracking-widest mb-2" style={{ color: "#C8B8B0" }}>
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3 leading-snug" style={{ color: "#2C2420" }}>{step.title}</h3>
                <p className="text-[15px] leading-relaxed" style={{ color: "#7A6660" }}>{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
