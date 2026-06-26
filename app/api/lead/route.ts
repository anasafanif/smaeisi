import { NextResponse } from "next/server";

const VALID_PLANS = new Set([
  "nextjs-engine",
  "dynamic-web",
  "ai-automation",
  "enterprise-portals",
  "retainer",
  "unsure",
]);

const PLAN_LABELS: Record<string, string> = {
  "nextjs-engine": "High-Performance Next.js Engine — $2.2k",
  "dynamic-web": "Dynamic Web & Database Integrations — $3.5k",
  "ai-automation": "AI Automation & Webhook Core — $4.8k",
  "enterprise-portals": "Enterprise Portals & Payment Pipelines — $6.5k",
  retainer: "Full-Stack Engineering Retainer — from $1.5k/mo",
  unsure: "Not sure yet — help me choose",
};

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  plan?: string;
  message?: string;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const plan = body.plan?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !plan || !message) {
    return NextResponse.json(
      { error: "Name, email, package, and project brief are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  if (!VALID_PLANS.has(plan)) {
    return NextResponse.json({ error: "Invalid package selection." }, { status: 400 });
  }

  const planLabel = PLAN_LABELS[plan] ?? plan;
  const subject = `New SMAESI lead: ${planLabel}`;
  const text = [
    "New project brief from smaesi.com",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : "Phone: (not provided)",
    `Package: ${planLabel}`,
    "",
    "Project brief:",
    message,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.LEAD_FROM_EMAIL ?? "SMAESI Leads <onboarding@resend.dev>";

  if (!apiKey) {
    console.warn("[api/lead] RESEND_API_KEY not set — lead logged only:", {
      name,
      email,
      phone,
      plan: planLabel,
      message,
    });
    return NextResponse.json({ ok: true, logged: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: ["contact@smaesi.com"],
      reply_to: email,
      subject,
      text,
    }),
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("[api/lead] Resend error:", res.status, detail);
    return NextResponse.json(
      { error: "Could not send notification. Try WhatsApp or email instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
