import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { addCadence, alertSchema, parseIsoDate } from "@/lib/alerts";
import { getCurrentUser } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { scheduleAlertMonitoring } from "@/lib/queue";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const body = await request.json();
    const payload = alertSchema.parse(body);
    const now = new Date();

    const alert = await prisma.alert.create({
      data: {
        userId: user.id,
        fullName: payload.fullName,
        provisionalLicense: payload.provisionalLicense.toUpperCase(),
        existingBookingReference: payload.existingBookingReference || null,
        theoryPassReference: payload.theoryPassReference || null,
        preferredLocation: payload.preferredLocation,
        preferredDateFrom: parseIsoDate(payload.preferredDateFrom),
        preferredDateTo: parseIsoDate(payload.preferredDateTo),
        preferredTimeFrom: payload.preferredTimeFrom,
        preferredTimeTo: payload.preferredTimeTo,
        phoneNumber: payload.phoneNumber,
        email: payload.email.toLowerCase(),
        channels: payload.channels,
        cadenceMinutes: 10,
        nextCheckAt: addCadence(now, 10),
      },
    });

    await scheduleAlertMonitoring(alert.id);

    return NextResponse.json({
      alertId: alert.id,
      status: alert.status,
      cadenceMinutes: alert.cadenceMinutes,
      nextCheckAt: alert.nextCheckAt,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.issues[0]?.message ?? "Invalid alert payload.",
        },
        { status: 400 },
      );
    }

    if (error instanceof Error && error.message.startsWith("Invalid date:")) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Could not create your alert right now." },
      { status: 500 },
    );
  }
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const [activeAlerts, latestAlert] = await Promise.all([
    prisma.alert.count({
      where: { userId: user.id, status: "monitoring" },
    }),
    prisma.alert.findFirst({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        preferredLocation: true,
        status: true,
        nextCheckAt: true,
        createdAt: true,
      },
    }),
  ]);

  return NextResponse.json({
    activeAlerts,
    latestAlert,
  });
}
