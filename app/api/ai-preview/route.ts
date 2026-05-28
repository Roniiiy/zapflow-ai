import { prisma } from "../../../src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const userMessage = String(body.message || "").toLowerCase();

  const settings = await prisma.companySettings.findFirst();

  if (!settings) {
    return NextResponse.json({
      reply: "Configure os dados da empresa antes de usar a IA.",
    });
  }

  let reply = "";

  if (
    userMessage.includes("preço") ||
    userMessage.includes("valor") ||
    userMessage.includes("quanto custa")
  ) {
    reply = `Olá! Os valores podem variar conforme o serviço desejado. Trabalhamos com: ${settings.services}. Para te ajudar melhor, me diga qual serviço você tem interesse.`;
  } else if (
    userMessage.includes("horário") ||
    userMessage.includes("funcionamento") ||
    userMessage.includes("abre")
  ) {
    reply = `Nosso horário de funcionamento é: ${settings.businessHours}.`;
  } else if (
    userMessage.includes("endereço") ||
    userMessage.includes("localização") ||
    userMessage.includes("onde fica")
  ) {
    reply = `Estamos localizados em: ${settings.address}.`;
  } else if (
    userMessage.includes("agendar") ||
    userMessage.includes("marcar consulta") ||
    userMessage.includes("marcar horário")
  ) {
    reply = `Claro! Posso te ajudar com o agendamento. Me informe o melhor dia e horário para você.`;
  } else if (
    userMessage.includes("reagendar") ||
    userMessage.includes("remarcar") ||
    userMessage.includes("trocar horário")
  ) {
    reply = `Sem problemas! Para reagendar, me envie o novo dia e horário desejado.`;
  } else if (
    userMessage.includes("serviços") ||
    userMessage.includes("atendem") ||
    userMessage.includes("fazem")
  ) {
    reply = `Atualmente oferecemos os seguintes serviços: ${settings.services}.`;
  } else {
    reply = `${settings.autoMessage}\n\nSou o assistente virtual da ${settings.companyName}. Posso ajudar com horários, endereço, serviços, agendamentos e reagendamentos.`;
  }

  return NextResponse.json({ reply });
}