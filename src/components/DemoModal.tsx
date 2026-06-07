"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Loader2, Phone } from "lucide-react";
import { useModal } from "@/contexts/ModalContext";
import { useLang } from "@/contexts/LanguageContext";

const copy = {
  en: {
    title: "Book Your Free Demo",
    sub: "We'll call your number live — 15 minutes, no pressure.",
    name: "Your name", namePh: "Somchai Jaidee",
    business: "Business name", businessPh: "Som Tam Nua Restaurant",
    phone: "Phone number", phonePh: "08X-XXX-XXXX",
    email: "Email address", emailPh: "you@example.com",
    type: "Business type",
    types: ["Restaurant", "Clinic", "Beauty Salon", "Retail Shop", "Hotel / Guesthouse", "Other"],
    message: "Anything to tell us? (optional)", messagePh: "E.g. busy hours, language preference...",
    submit: "Book Free Demo",
    submitting: "Sending...",
    successTitle: "We'll be in touch!",
    successSub: "Check your inbox for a confirmation. We'll reach out within 24 hours to schedule your live demo.",
    done: "Done",
    errRequired: "Please fill in all required fields.",
    errEmail: "Please enter a valid email address.",
    errRate: "Too many requests. Please try again in an hour.",
    errGeneric: "Something went wrong. Please try again.",
  },
  th: {
    title: "จองการสาธิตฟรี",
    sub: "เราจะโทรหาเบอร์คุณสด — 15 นาที ไม่มีข้อผูกมัด",
    name: "ชื่อของคุณ", namePh: "สมชาย ใจดี",
    business: "ชื่อธุรกิจ", businessPh: "ร้านส้มตำนัว",
    phone: "เบอร์โทรศัพท์", phonePh: "08X-XXX-XXXX",
    email: "อีเมล", emailPh: "you@example.com",
    type: "ประเภทธุรกิจ",
    types: ["ร้านอาหาร", "คลินิก", "ร้านเสริมสวย", "ร้านค้าปลีก", "โรงแรม / เกสต์เฮาส์", "อื่นๆ"],
    message: "มีอะไรอยากบอกเพิ่มเติม? (ไม่บังคับ)", messagePh: "เช่น ช่วงเวลาเร่งด่วน ภาษาที่ต้องการ...",
    submit: "จองการสาธิตฟรี",
    submitting: "กำลังส่ง...",
    successTitle: "รับทราบแล้ว!",
    successSub: "เช็คอีเมลของคุณเพื่อดูการยืนยัน เราจะติดต่อกลับภายใน 24 ชั่วโมงเพื่อนัดหมายการสาธิต",
    done: "เสร็จสิ้น",
    errRequired: "กรุณากรอกข้อมูลที่จำเป็นให้ครบ",
    errEmail: "กรุณากรอกอีเมลที่ถูกต้อง",
    errRate: "ส่งคำขอมากเกินไป กรุณาลองใหม่ใน 1 ชั่วโมง",
    errGeneric: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
  },
};

type Status = "idle" | "loading" | "success" | "error";

const EMPTY_FORM = { name: "", business: "", phone: "", email: "", type: "", message: "" };

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) && s.length <= 254;
}

export default function DemoModal() {
  const { open, closeModal } = useModal();
  const { lang } = useLang();
  const t = copy[lang];

  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  // Record when the modal opened — sent as _t so server can detect instant bot submissions
  const openedAtRef = useRef<number>(0);

  useEffect(() => {
    if (open) openedAtRef.current = Date.now();
  }, [open]);

  const set = (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    // Client-side validation before hitting the network
    if (!form.name.trim() || !form.business.trim() || !form.phone.trim() || !form.email.trim()) {
      setError(t.errRequired);
      return;
    }
    if (!isValidEmail(form.email)) {
      setError(t.errEmail);
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          _hp: "",                        // honeypot — always empty for real users
          _t: openedAtRef.current,        // form-open timestamp for bot timing check
        }),
      });

      if (res.status === 429) {
        setStatus("error");
        setError(t.errRate);
        return;
      }
      if (!res.ok) throw new Error("server error");

      setStatus("success");
    } catch {
      setStatus("error");
      setError(t.errGeneric);
    }
  }

  function handleClose() {
    closeModal();
    setTimeout(() => { setStatus("idle"); setForm(EMPTY_FORM); setError(""); }, 300);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 14px", borderRadius: 12, border: "1px solid #E8DDD5",
    background: "#FEFAF7", color: "#2C2420", fontSize: 14, outline: "none",
    transition: "border-color 0.2s",
  };
  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 12, fontWeight: 600, color: "#7A6660",
    marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.04em",
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100]" style={{ background: "rgba(44,36,32,0.55)", backdropFilter: "blur(6px)" }}
            onClick={handleClose} />

          {/* Modal */}
          <motion.div initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4">
            <div className="w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl"
              style={{ background: "#FDF8F3", border: "1px solid #E8DDD5" }}>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center gap-4 px-8 py-16 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "#EFF7F4" }}>
                    <CheckCircle2 className="w-8 h-8" style={{ color: "#6BA898" }} />
                  </div>
                  <h3 className="text-2xl font-extrabold" style={{ color: "#2C2420" }}>{t.successTitle}</h3>
                  <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#7A6660" }}>{t.successSub}</p>
                  <button onClick={handleClose}
                    className="cursor-pointer mt-4 px-8 py-3 rounded-2xl font-bold text-white text-sm transition-opacity hover:opacity-90"
                    style={{ background: "#6BA898" }}>{t.done}</button>
                </div>
              ) : (
                <>
                  {/* Header */}
                  <div className="flex items-start justify-between p-7 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: "linear-gradient(145deg, #6BA898, #4A8875)" }}>
                        <Phone className="w-5 h-5 text-white" strokeWidth={2} />
                      </div>
                      <div>
                        <h2 className="text-lg font-extrabold leading-tight" style={{ color: "#2C2420" }}>{t.title}</h2>
                        <p className="text-xs mt-0.5" style={{ color: "#9C8C85" }}>{t.sub}</p>
                      </div>
                    </div>
                    <button onClick={handleClose}
                      className="cursor-pointer w-8 h-8 rounded-xl flex items-center justify-center transition-colors hover:opacity-70 ml-4 mt-0.5 flex-shrink-0"
                      style={{ background: "#F0E8DF" }}>
                      <X className="w-4 h-4" style={{ color: "#7A6660" }} />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={submit} className="px-7 pb-7 space-y-4">
                    {/*
                      Honeypot: absolutely positioned off-screen.
                      Real users never see or fill this. Bots that auto-fill all fields will fill it.
                      Using opacity+position (not display:none) because some bots skip hidden fields.
                    */}
                    <div style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0 }} aria-hidden="true">
                      <input type="text" name="_hp" tabIndex={-1} autoComplete="off"
                        value={form.message && ""} onChange={() => {}} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label style={labelStyle}>{t.name} *</label>
                        <input style={inputStyle} type="text" placeholder={t.namePh} value={form.name} onChange={set("name")} required maxLength={100}
                          onFocus={e => (e.target.style.borderColor = "#6BA898")} onBlur={e => (e.target.style.borderColor = "#E8DDD5")} />
                      </div>
                      <div>
                        <label style={labelStyle}>{t.phone} *</label>
                        <input style={inputStyle} type="tel" placeholder={t.phonePh} value={form.phone} onChange={set("phone")} required maxLength={25}
                          onFocus={e => (e.target.style.borderColor = "#6BA898")} onBlur={e => (e.target.style.borderColor = "#E8DDD5")} />
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>{t.business} *</label>
                      <input style={inputStyle} type="text" placeholder={t.businessPh} value={form.business} onChange={set("business")} required maxLength={150}
                        onFocus={e => (e.target.style.borderColor = "#6BA898")} onBlur={e => (e.target.style.borderColor = "#E8DDD5")} />
                    </div>
                    <div>
                      <label style={labelStyle}>{t.email} *</label>
                      <input style={inputStyle} type="email" placeholder={t.emailPh} value={form.email} onChange={set("email")} required maxLength={254}
                        onFocus={e => (e.target.style.borderColor = "#6BA898")} onBlur={e => (e.target.style.borderColor = "#E8DDD5")} />
                    </div>
                    <div>
                      <label style={labelStyle}>{t.type}</label>
                      <select style={{ ...inputStyle, appearance: "none" }} value={form.type} onChange={set("type")}
                        onFocus={e => (e.target.style.borderColor = "#6BA898")} onBlur={e => (e.target.style.borderColor = "#E8DDD5")}>
                        <option value="">— {t.type} —</option>
                        {t.types.map(tp => <option key={tp} value={tp}>{tp}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>{t.message}</label>
                      <textarea style={{ ...inputStyle, resize: "none" } as React.CSSProperties} rows={3}
                        placeholder={t.messagePh} value={form.message} onChange={set("message")} maxLength={800}
                        onFocus={e => (e.target.style.borderColor = "#6BA898")} onBlur={e => (e.target.style.borderColor = "#E8DDD5")} />
                    </div>
                    {error && (
                      <p className="text-xs px-1 py-2 rounded-xl text-center"
                        style={{ color: "#C97B5A", background: "rgba(201,123,90,0.08)" }}>
                        {error}
                      </p>
                    )}
                    <button type="submit" disabled={status === "loading"}
                      className="cursor-pointer w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-white text-sm transition-opacity hover:opacity-90 disabled:opacity-60"
                      style={{ background: "linear-gradient(135deg, #C97B5A, #B56A4A)", boxShadow: "0 6px 20px rgba(201,123,90,0.3)" }}>
                      {status === "loading" ? <><Loader2 className="w-4 h-4 animate-spin" />{t.submitting}</> : t.submit}
                    </button>
                    <p className="text-center text-xs" style={{ color: "#B0A09A" }}>
                      {lang === "th" ? "ข้อมูลของคุณปลอดภัย ไม่มีสแปม" : "Your info is safe. No spam, ever."}
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
