"use client";

import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { useModal } from "@/contexts/ModalContext";

const copy = {
  en: {
    label: "Pricing", title: "Simple, transparent pricing",
    sub: "No setup fees. No hidden costs. Cancel any time.",
    trial: "All plans include a 7-day free trial. No credit card required.",
    badge: "Most Popular",
    tiers: [
      { name: "Starter", desc: "Perfect for small businesses just getting started.", cta: "Get Started",
        features: ["Up to 100 calls / month", "Thai & English support", "Call summaries via Line", "1 custom AI script", "Standard support"] },
      { name: "Professional", desc: "The most popular plan for growing businesses.", cta: "Free Demo", highlight: true,
        features: ["Up to 500 calls / month", "Everything in Starter", "Automatic appointment booking", "Custom greeting & persona", "Priority support"] },
      { name: "Business", desc: "For multi-location businesses needing full coverage.", cta: "Contact Us",
        features: ["Unlimited calls", "Everything in Professional", "Multiple locations / numbers", "Analytics dashboard", "Dedicated account manager"] },
    ],
  },
  th: {
    label: "ราคา", title: "ราคาง่าย โปร่งใส",
    sub: "ไม่มีค่าตั้งค่า ไม่มีค่าซ่อน ยกเลิกได้ตลอดเวลา",
    trial: "ทุกแพ็กเกจมีทดลองใช้ฟรี 7 วัน ไม่ต้องใช้บัตรเครดิต",
    badge: "ยอดนิยม",
    tiers: [
      { name: "ผู้เริ่มต้น", desc: "เหมาะสำหรับธุรกิจขนาดเล็กที่เพิ่งเริ่มต้น", cta: "เริ่มต้น",
        features: ["รับสายได้สูงสุด 100 สาย/เดือน", "รองรับภาษาไทยและอังกฤษ", "สรุปสายผ่าน Line", "สคริปต์ AI กำหนดเอง 1 รายการ", "การสนับสนุนมาตรฐาน"] },
      { name: "มืออาชีพ", desc: "แพ็กเกจยอดนิยมสำหรับธุรกิจที่กำลังเติบโต", cta: "สาธิตฟรี", highlight: true,
        features: ["รับสายได้สูงสุด 500 สาย/เดือน", "ทุกอย่างใน ผู้เริ่มต้น", "นัดหมายอัตโนมัติ", "คำทักทายและบุคลิกที่กำหนดเอง", "การสนับสนุน Priority"] },
      { name: "ธุรกิจ", desc: "สำหรับธุรกิจหลายสาขาที่ต้องการครอบคลุมทุกพื้นที่", cta: "ติดต่อเรา",
        features: ["สายไม่จำกัด", "ทุกอย่างใน มืออาชีพ", "หลายสาขา/หมายเลข", "แดชบอร์ดวิเคราะห์ข้อมูล", "ผู้จัดการบัญชีส่วนตัว"] },
    ],
  },
};

export default function Pricing() {
  const { lang } = useLang();
  const { openModal } = useModal();
  const t = copy[lang];

  return (
    <section id="pricing" className="py-24 px-4" style={{ background: "#FDF8F3" }}>
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="text-center mb-16">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#6BA898" }}>{t.label}</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: "#2C2420" }}>{t.title}</h2>
          <p className="text-lg mt-4 max-w-md mx-auto" style={{ color: "#7A6660" }}>{t.sub}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {t.tiers.map((tier, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex flex-col rounded-3xl p-8 transition-all duration-200"
              style={"highlight" in tier && tier.highlight
                ? { background: "linear-gradient(145deg, #6BA898, #4A8875)", boxShadow: "0 24px 64px rgba(107,168,152,0.3)", transform: "scale(1.03)" }
                : { background: "#FDF8F3", border: "1px solid #E8DDD5", boxShadow: "0 2px 16px rgba(44,36,32,0.05)" }
              }
            >
              {"highlight" in tier && tier.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 text-white text-xs font-bold px-4 py-1.5 rounded-full" style={{ background: "#C97B5A" }}>
                    <Zap className="w-3 h-3 fill-white" />{t.badge}
                  </span>
                </div>
              )}
              <div className="mb-6">
                <div className="text-sm font-semibold uppercase tracking-widest mb-2"
                  style={{ color: "highlight" in tier && tier.highlight ? "rgba(253,248,243,0.7)" : "#9C8C85" }}>{tier.name}</div>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-5xl font-extrabold tracking-tight"
                    style={{ color: "highlight" in tier && tier.highlight ? "#FDF8F3" : "#2C2420" }}>
                    ฿{["990", "2,490", "4,990"][i]}
                  </span>
                  <span className="text-sm mb-2" style={{ color: "highlight" in tier && tier.highlight ? "rgba(253,248,243,0.6)" : "#9C8C85" }}>/เดือน</span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "highlight" in tier && tier.highlight ? "rgba(253,248,243,0.75)" : "#7A6660" }}>{tier.desc}</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: "highlight" in tier && tier.highlight ? "rgba(253,248,243,0.2)" : "#EFF7F4" }}>
                      <Check className="w-3 h-3" style={{ color: "highlight" in tier && tier.highlight ? "#FDF8F3" : "#6BA898" }} strokeWidth={2.5} />
                    </div>
                    <span className="text-[14px]" style={{ color: "highlight" in tier && tier.highlight ? "rgba(253,248,243,0.85)" : "#5C4E47" }}>{f}</span>
                  </li>
                ))}
              </ul>
              {"highlight" in tier && tier.highlight ? (
                <button onClick={openModal} className="cursor-pointer w-full text-center font-bold text-sm py-3.5 rounded-2xl transition-all duration-200 hover:opacity-90"
                  style={{ background: "#FDF8F3", color: "#4A8875" }}>{tier.cta}</button>
              ) : (
                <a href="#demo" className="cursor-pointer w-full text-center font-bold text-sm py-3.5 rounded-2xl transition-all duration-200 hover:opacity-90"
                  style={{ background: "#6BA898", color: "#FDF8F3" }}>{tier.cta}</a>
              )}
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm mt-8" style={{ color: "#B0A09A" }}>{t.trial}</motion.p>
      </div>
    </section>
  );
}
