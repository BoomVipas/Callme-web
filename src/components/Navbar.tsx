"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import { useModal } from "@/contexts/ModalContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggle } = useLang();
  const { openModal } = useModal();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="fixed top-4 left-4 right-4 z-50"
    >
      <div className="mx-auto max-w-6xl">
        <div
          className="flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300"
          style={{
            background: scrolled ? "rgba(253,248,243,0.92)" : "rgba(253,248,243,0.75)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(232,221,213,0.8)",
            boxShadow: scrolled ? "0 4px 24px rgba(44,36,32,0.08)" : "none",
          }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#6BA898" }}>
              <Phone className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-extrabold text-[15px] tracking-tight" style={{ color: "#2C2420" }}>
              Callme <span style={{ color: "#6BA898" }}>TH</span>
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <button
              onClick={toggle}
              className="cursor-pointer flex items-center rounded-xl p-1 transition-all duration-200"
              style={{ background: "rgba(107,168,152,0.1)", border: "1px solid rgba(107,168,152,0.2)" }}
              aria-label="Toggle language"
            >
              {(["en", "th"] as const).map((l) => (
                <span key={l} className="px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200"
                  style={lang === l ? { background: "#6BA898", color: "#fff" } : { color: "#7A6660" }}>
                  {l.toUpperCase()}
                </span>
              ))}
            </button>

            {/* CTA */}
            <button onClick={openModal}
              className="cursor-pointer inline-flex items-center text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 hover:opacity-90"
              style={{ background: "#C97B5A" }}>
              {lang === "en" ? "Demo" : "สาธิต"}
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
