import { prisma } from "../../../src/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const settings = await prisma.companySettings.findFirst();

  return NextResponse.json(settings);
}

export async function POST(request: Request) {
  const body = await request.json();

  const existingSettings =
    await prisma.companySettings.findFirst();

  if (existingSettings) {
    const updatedSettings =
      await prisma.companySettings.update({
        where: {
          id: existingSettings.id,
        },
        data: {
          companyName: body.companyName,
          businessHours: body.businessHours,
          address: body.address,
          services: body.services,
          autoMessage: body.autoMessage,
        },
      });

    return NextResponse.json(updatedSettings);
  }

  const settings =
    await prisma.companySettings.create({
      data: {
        companyName: body.companyName,
        businessHours: body.businessHours,
        address: body.address,
        services: body.services,
        autoMessage: body.autoMessage,
      },
    });

  return NextResponse.json(settings);
}