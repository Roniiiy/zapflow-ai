import { prisma } from "../../../src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const messages = await prisma.message.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const body = await request.json();

  const message = await prisma.message.create({
    data: {
      client: body.client,
      content: body.content,
      direction: body.direction || "received",
    },
  });

  return NextResponse.json(message);
}

export async function DELETE(request: Request) {
  const body = await request.json();

  await prisma.message.delete({
    where: {
      id: body.id,
    },
  });

  return NextResponse.json({
    message: "Mensagem excluída com sucesso.",
  });
}