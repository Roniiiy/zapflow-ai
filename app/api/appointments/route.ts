import { prisma } from "../../../src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const appointments = await prisma.appointment.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(appointments);
}

export async function POST(request: Request) {
  const body = await request.json();

  const appointment = await prisma.appointment.create({
    data: {
      client: body.client,
      service: body.service,
      date: body.date,
      time: body.time,
      status: body.status || "Confirmado",
    },
  });

  return NextResponse.json(appointment);
}

export async function PATCH(request: Request) {
  const body = await request.json();

  const appointment = await prisma.appointment.update({
    where: {
      id: body.id,
    },
    data: {
      date: body.date,
      time: body.time,
      status: "Reagendado",
    },
  });

  return NextResponse.json(appointment);
}

export async function DELETE(request: Request) {
  const body = await request.json();

  await prisma.appointment.delete({
    where: {
      id: body.id,
    },
  });

  return NextResponse.json({
    message: "Agendamento excluído com sucesso.",
  });
}