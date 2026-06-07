"use client";

import { Phone } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const copy = {
  en: {
    tagline: "AI receptionist built for Thai SMBs. Never miss a call again.",
    links: ["Features", "Pricing", "FAQ"],
    linkHrefs: ["#features", "#pricing", "#faq"],
    demo: "Book a Demo",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
  th: {
    tagline: "AI เลขานุการสำหรับธุรกิจ SMB ไทย ไม่พลาดทุกสาย",
    links: ["ฟีเจอร์", "ราคา", "คำถามที่พบบ่อย"],
    linkHrefs: ["#features", "#pricing", "#faq"],
    demo: "จองการสาธิต",
    privacy: "นโยบายความเป็นส่วนตัว",
    terms: "ข้อกำหนดการใช้งาน",
  },
};

export default function Footer() {
  const { lang } = useLang();
  const t = copy[lang];

  return (
    <footer className="py-12 px-4" style={{ background: "#2C2420", color: "#8C7B72" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#6BA898" }}>
                <Phone className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-extrabold text-[15px] tracking-tight" style={{ color: "#FDF8F3" }}>
                Callme <span style={{ color: "#A8D0C4" }}>TH</span>
              </span>
            </div>
            <p className="text-sm max-w-xs text-center md:text-left leading-relaxed" style={{ color: "#6C5C58" }}>{t.tagline}</p>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            {t.links.map((link, i) => (
              <a key={link} href={t.linkHrefs[i]} className="cursor-pointer transition-colors duration-200" style={{ color: "#6C5C58" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#A8D0C4")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#6C5C58")}>
                {link}
              </a>
            ))}
            <a href="#demo" className="cursor-pointer font-semibold" style={{ color: "#A8D0C4" }}>{t.demo}</a>
          </nav>
        </div>
        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderTop: "1px solid #3C3230", color: "#5C4E47" }}>
          <span>&copy; {new Date().getFullYear()} Callme TH. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="cursor-pointer hover:opacity-70 transition-opacity">{t.privacy}</a>
            <a href="#" className="cursor-pointer hover:opacity-70 transition-opacity">{t.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
