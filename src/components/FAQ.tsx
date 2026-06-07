"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const copy = {
  en: {
    label: "FAQ", title: "Common questions",
    faqs: [
      { q: "How does it understand Thai so naturally?", a: "Callme TH is trained on Thai language patterns specific to service businesses — not generic AI. It understands regional accents, common service industry phrases, and customer intent in Thai, ensuring every call feels natural." },
      { q: "What happens if the AI can't answer a question?", a: "If the AI isn't confident in an answer, it gracefully tells the caller it will pass the message on and immediately notifies you via Line or email. You never leave a customer without a response." },
      { q: "Can I customize what it says?", a: "Yes. You write your business's script — greetings, key info, FAQs, and tone. The AI learns your brand voice and stays consistent across every call." },
      { q: "How long does setup take?", a: "Most businesses are live in under 10 minutes. You forward your number, fill in your business details, and the AI is ready. No developers or technical knowledge required." },
      { q: "Is there a free trial?", a: "Yes — every plan starts with a 7-day free trial. No credit card required. If it doesn't work for your business, you pay nothing." },
    ],
  },
  th: {
    label: "คำถามที่พบบ่อย", title: "คำถามที่พบบ่อย",
    faqs: [
      { q: "AI เข้าใจภาษาไทยเป็นธรรมชาติได้อย่างไร?", a: "Callme TH ถูกฝึกมาด้วยรูปแบบภาษาไทยเฉพาะสำหรับธุรกิจบริการ ไม่ใช่ AI ทั่วไป เข้าใจสำเนียงท้องถิ่น วลีในอุตสาหกรรมบริการ และความตั้งใจของลูกค้าในภาษาไทย ทำให้ทุกสายฟังดูเป็นธรรมชาติ" },
      { q: "ถ้า AI ตอบคำถามไม่ได้จะเกิดอะไรขึ้น?", a: "หาก AI ไม่มั่นใจในคำตอบ จะแจ้งผู้โทรอย่างสุภาพว่าจะส่งต่อข้อความ และแจ้งเตือนคุณผ่าน Line หรืออีเมลทันที ลูกค้าจะไม่ถูกทิ้งไว้โดยไม่ได้รับการตอบกลับ" },
      { q: "สามารถกำหนดสิ่งที่ AI พูดได้ไหม?", a: "ได้เลย คุณเขียนสคริปต์ของธุรกิจเอง — คำทักทาย ข้อมูลสำคัญ FAQ และโทน AI จะเรียนรู้เสียงแบรนด์ของคุณและรักษาความสม่ำเสมอในทุกสาย" },
      { q: "ใช้เวลาตั้งค่านานแค่ไหน?", a: "ธุรกิจส่วนใหญ่พร้อมใช้งานภายใน 10 นาที เพียงโอนเบอร์ กรอกข้อมูลธุรกิจ AI ก็พร้อมทำงาน ไม่ต้องใช้นักพัฒนาหรือความรู้ด้านเทคนิค" },
      { q: "มีการทดลองใช้ฟรีไหม?", a: "มี — ทุกแพ็กเกจเริ่มต้นด้วยการทดลองใช้ฟรี 7 วัน ไม่ต้องใช้บัตรเครดิต หากไม่เหมาะกับธุรกิจของคุณ ไม่ต้องจ่ายอะไรเลย" },
    ],
  },
};

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.07 }}
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{ border: open ? "1px solid rgba(107,168,152,0.3)" : "1px solid #E8DDD5", background: open ? "rgba(107,168,152,0.04)" : "#FDF8F3", boxShadow: "0 2px 12px rgba(44,36,32,0.04)" }}>
      <button onClick={() => setOpen(!open)} className="cursor-pointer w-full flex items-center justify-between px-6 py-5 text-left" aria-expanded={open}>
        <span className="font-semibold text-[15px] pr-4 leading-snug" style={{ color: "#2C2420" }}>{q}</span>
        <span className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-200"
          style={open ? { background: "#6BA898" } : { background: "#F0E8DF" }}>
          {open ? <Minus className="w-4 h-4 text-white" strokeWidth={2.5} /> : <Plus className="w-4 h-4" style={{ color: "#9C8C85" }} strokeWidth={2.5} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }}>
            <p className="px-6 pb-5 text-[14px] leading-relaxed" style={{ color: "#7A6660" }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const { lang } = useLang();
  const t = copy[lang];
  return (
    <section className="py-24 px-4" style={{ background: "#FDF8F3" }}>
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.55 }} className="text-center mb-12">
          <span className="inline-block text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: "#6BA898" }}>{t.label}</span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight" style={{ color: "#2C2420" }}>{t.title}</h2>
        </motion.div>
        <div className="space-y-3">
          {t.faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} index={i} />)}
        </div>
      </div>
    </section>
  );
}
