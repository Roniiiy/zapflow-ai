import { prisma } from "../../../src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const totalLeads = await prisma.lead.count();

  const closedLeads = await prisma.lead.count({
    where: {
      status: "Fechado",
    },
  });

  const totalAppointments = await prisma.appointment.count();

  const totalMessages = await prisma.message.count();

  const conversionRate =
    totalLeads > 0
      ? ((closedLeads / totalLeads) * 100).toFixed(1)
      : "0";

  return NextResponse.json({
    totalLeads,
    closedLeads,
    totalAppointments,
    totalMessages,
    conversionRate,
  });
}