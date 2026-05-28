import { prisma } from "../../../src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalLeads = await prisma.lead.count();

    const closedLeads = await prisma.lead.count({
      where: {
        status: "Fechado",
      },
    });

    let totalAppointments = 0;
    let totalMessages = 0;

    try {
      totalAppointments = await prisma.appointment.count();
    } catch {}

    try {
      totalMessages = await prisma.message.count();
    } catch {}

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
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      totalLeads: 0,
      closedLeads: 0,
      totalAppointments: 0,
      totalMessages: 0,
      conversionRate: "0",
    });
  }
}