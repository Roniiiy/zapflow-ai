import { prisma } from "../../../src/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { message } = body;

    const settings = await prisma.companySettings.findFirst();

    const companyName =
      settings?.companyName || "Nossa empresa";

    const services =
      settings?.services || "nossos serviços";

    const businessHours =
      settings?.businessHours || "horário comercial";

    const address =
      settings?.address || "endereço não informado";

    const autoMessage =
      settings?.autoMessage ||
      "Olá! Como podemos ajudar você hoje?";

    let reply = "";

    const lowerMessage = message.toLowerCase();

    if (
      lowerMessage.includes("preço") ||
      lowerMessage.includes("valor") ||
      lowerMessage.includes("quanto custa")
    ) {
      reply = `Olá! 😊

Obrigado pelo contato com ${companyName}.

Trabalhamos com:
${services}

Para enviarmos valores mais exatos, precisamos entender melhor sua necessidade.`;

    } else if (
      lowerMessage.includes("horário") ||
      lowerMessage.includes("funcionamento")
    ) {
      reply = `Nosso horário de funcionamento é:

${businessHours}`;

    } else if (
      lowerMessage.includes("endereço") ||
      lowerMessage.includes("localização")
    ) {
      reply = `Estamos localizados em:

${address}`;

    } else if (
      lowerMessage.includes("oi") ||
      lowerMessage.includes("olá") ||
      lowerMessage.includes("bom dia")
    ) {
      reply = autoMessage;

    } else {
      reply = `Olá! 😊

Recebemos sua mensagem:

"${message}"

Nossa equipe da ${companyName} responderá em breve.

Serviços disponíveis:
${services}`;
    }

    return NextResponse.json({
      reply,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Erro ao gerar resposta IA",
      },
      {
        status: 500,
      }
    );
  }
}