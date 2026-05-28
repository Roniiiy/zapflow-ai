import { prisma } from "../../../src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(leads);
}

export async function POST(request: Request) {
  const body = await request.json();

  const lead = await prisma.lead.create({
    data: {
      name: body.name,
      phone: body.phone,
      status: body.status || "Novo Lead",
      tag: body.tag || "WhatsApp",
      notes: body.notes || "",
    },
  });

  return NextResponse.json(lead);
}

export async function PATCH(request: Request) {
  const body = await request.json();

  const updatedLead = await prisma.lead.update({
    where: {
      id: body.id,
    },
    data: {
      name: body.name,
      phone: body.phone,
      tag: body.tag,
      notes: body.notes,
      status: body.status,
    },
  });

  return NextResponse.json(updatedLead);
}

export async function DELETE(request: Request) {
  const body = await request.json();

  await prisma.lead.delete({
    where: {
      id: body.id,
    },
  });

  return NextResponse.json({
    message: "Lead excluído com sucesso.",
  });
}