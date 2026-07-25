import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || !body.name || !body.email || !body.message) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email delivery isn't configured yet — please reach out directly at tasif.grandfleet@gmail.com." },
      { status: 501 }
    );
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "tasif.grandfleet@gmail.com",
      reply_to: body.email,
      subject: `[Portfolio] ${body.subject || "New message"} — from ${body.name}`,
      text: `From: ${body.name} <${body.email}>\n\n${body.message}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
