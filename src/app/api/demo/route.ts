import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ---------------------------------------------------------------------------
// In-memory rate limiter
// Persists across warm Vercel invocations on the same instance.
// For a landing page this is plenty; upgrade to Upstash Redis if traffic scales.
// ---------------------------------------------------------------------------
type Bucket = { count: number; resetAt: number };
const ipBuckets = new Map<string, Bucket>();
let globalCount = 0;
let globalResetAt = Date.now() + 3_600_000;

const PER_IP_LIMIT = 3;     // max 3 submissions per IP per hour
const GLOBAL_LIMIT = 40;    // max 40 submissions site-wide per hour
const WINDOW_MS = 3_600_000;

// Prune entries older than 2 hours to prevent unbounded memory growth
function pruneOldEntries() {
  const cutoff = Date.now() - 2 * WINDOW_MS;
  for (const [ip, b] of ipBuckets) {
    if (b.resetAt < cutoff) ipBuckets.delete(ip);
  }
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter: number } {
  const now = Date.now();

  // Reset global window
  if (now > globalResetAt) {
    globalCount = 0;
    globalResetAt = now + WINDOW_MS;
  }
  if (globalCount >= GLOBAL_LIMIT) {
    return { allowed: false, retryAfter: Math.ceil((globalResetAt - now) / 1000) };
  }

  // Per-IP window
  const b = ipBuckets.get(ip);
  if (!b || now > b.resetAt) {
    ipBuckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    globalCount++;
    return { allowed: true, retryAfter: 0 };
  }
  if (b.count >= PER_IP_LIMIT) {
    return { allowed: false, retryAfter: Math.ceil((b.resetAt - now) / 1000) };
  }
  b.count++;
  globalCount++;
  return { allowed: true, retryAfter: 0 };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function getClientIP(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

// Escape every user value before inserting into HTML email
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// Strip newlines to prevent SMTP header injection in Subject / ReplyTo
function stripNewlines(s: string): string {
  return s.replace(/[\r\n\t]/g, " ").trim();
}

function isValidEmail(s: string): boolean {
  // RFC-loose but blocks header injection: no whitespace, newlines, or control chars
  return (
    s.length <= 254 &&
    /^[^\s@\r\n<>(),;:\\'"[\]]+@[^\s@\r\n<>(),;:\\'"[\]]+\.[^\s@\r\n<>(),;:\\'"[\].]{2,}$/.test(s)
  );
}

function sanitizeText(s: unknown, maxLen: number): string {
  if (typeof s !== "string") return "";
  return s.replace(/[\r\n]/g, " ").trim().slice(0, maxLen);
}

function sanitizePhone(s: unknown): string {
  if (typeof s !== "string") return "";
  return s.replace(/[^0-9+\-\s()]/g, "").trim().slice(0, 25);
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(req: NextRequest) {
  try {
    pruneOldEntries();

    // 1. Content-type guard
    if (!req.headers.get("content-type")?.includes("application/json")) {
      return NextResponse.json({ error: "Bad request" }, { status: 400 });
    }

    // 2. Payload size guard (4 KB max — a real form submission is ~1 KB)
    const raw = await req.text();
    if (raw.length > 4096) {
      return NextResponse.json({ error: "Payload too large" }, { status: 413 });
    }

    // 3. Parse JSON
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // 4. Honeypot: bots fill the hidden _hp field; legitimate browsers never see it
    if (body._hp) {
      // Silent 200 — don't signal to the bot that it was caught
      return NextResponse.json({ ok: true });
    }

    // 5. Timing check: real humans take > 4 seconds to fill a form
    const openedAt = Number(body._t);
    if (!isNaN(openedAt) && Date.now() - openedAt < 4000) {
      return NextResponse.json({ ok: true }); // silent drop
    }

    // 6. Rate limiting
    const ip = getClientIP(req);
    const { allowed, retryAfter } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }

    // 7. Extract & validate required fields
    const name     = sanitizeText(body.name, 100);
    const business = sanitizeText(body.business, 150);
    const phone    = sanitizePhone(body.phone);
    const emailRaw = sanitizeText(body.email, 254);
    const type     = sanitizeText(body.type, 80);
    const message  = sanitizeText(body.message, 800);

    if (!name || !business || !phone || !emailRaw) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!isValidEmail(emailRaw)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // 8. Strip newlines from values used in SMTP headers (prevent header injection)
    const safeEmail   = stripNewlines(emailRaw);
    const safeSubject = stripNewlines(`[Callme TH] คำขอสาธิต — ${business}`);

    // 9. Send email — all user data goes through esc() before appearing in HTML
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });

    await transporter.sendMail({
      from: `"Callme TH Website" <${process.env.SMTP_USER}>`,
      to: "Boomvpc@gmail.com",
      replyTo: safeEmail,
      subject: safeSubject,
      html: `
        <div style="font-family:'Segoe UI',sans-serif;max-width:560px;margin:0 auto;background:#FDF8F3;border-radius:16px;overflow:hidden;border:1px solid #E8DDD5;">
          <div style="background:linear-gradient(135deg,#4A8875,#3D7265);padding:28px 32px;">
            <h1 style="color:#FDF8F3;font-size:20px;margin:0;font-weight:800;">Callme TH — New Demo Request</h1>
            <p style="color:rgba(253,248,243,0.7);margin:6px 0 0;font-size:14px;">คำขอสาธิตใหม่เข้ามาแล้ว!</p>
          </div>
          <div style="padding:28px 32px;">
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:10px 0;border-bottom:1px solid #F0E8DF;color:#9C8C85;font-size:13px;width:140px;">ชื่อ / Name</td><td style="padding:10px 0;border-bottom:1px solid #F0E8DF;color:#2C2420;font-weight:600;font-size:14px;">${esc(name)}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #F0E8DF;color:#9C8C85;font-size:13px;">ธุรกิจ / Business</td><td style="padding:10px 0;border-bottom:1px solid #F0E8DF;color:#2C2420;font-weight:600;font-size:14px;">${esc(business)}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #F0E8DF;color:#9C8C85;font-size:13px;">ประเภท / Type</td><td style="padding:10px 0;border-bottom:1px solid #F0E8DF;color:#2C2420;font-weight:600;font-size:14px;">${esc(type) || "—"}</td></tr>
              <tr><td style="padding:10px 0;border-bottom:1px solid #F0E8DF;color:#9C8C85;font-size:13px;">โทร / Phone</td><td style="padding:10px 0;border-bottom:1px solid #F0E8DF;color:#2C2420;font-weight:600;font-size:14px;">${esc(phone)}</td></tr>
              <tr><td style="padding:10px 0;color:#9C8C85;font-size:13px;">อีเมล / Email</td><td style="padding:10px 0;font-size:14px;"><a href="mailto:${esc(safeEmail)}" style="color:#4A8875;font-weight:600;">${esc(safeEmail)}</a></td></tr>
            </table>
            ${message ? `<div style="margin-top:20px;padding:16px;background:#F5EDE3;border-radius:10px;font-size:14px;color:#5C4E47;line-height:1.6;"><strong style="color:#2C2420;">ข้อความ:</strong><br>${esc(message)}</div>` : ""}
            <div style="margin-top:24px;padding:16px;background:rgba(107,168,152,0.08);border-radius:10px;border:1px solid rgba(107,168,152,0.2);font-size:13px;color:#6BA898;">
              Hit <strong>Reply</strong> to respond directly to ${esc(name)} at ${esc(safeEmail)}
            </div>
          </div>
          <div style="padding:16px 32px;border-top:1px solid #E8DDD5;font-size:12px;color:#B0A09A;text-align:center;">
            Sent from callmeth.com · ${new Date().toLocaleString("th-TH")}
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Demo email error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
