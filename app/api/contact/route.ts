import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name =
    typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const subject =
    typeof body.subject === "string" ? body.subject.trim().slice(0, 150) : "";
  const message =
    typeof body.message === "string" && body.message.trim()
      ? body.message.trim().slice(0, 2000)
      : null;

  if (!name)
    return Response.json({ error: "Please enter your name." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return Response.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  if (!subject)
    return Response.json(
      { error: "Please choose a subject." },
      { status: 400 },
    );

  try {
    await prisma.contactMessage.create({
      data: { name, email, subject, message },
    });
    return Response.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
