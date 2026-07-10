import { NextRequest, NextResponse } from "next/server";
import { submitRsvp } from "@/lib/wix/events";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { eventId, firstName, lastName, email, guestCount, notes } = body ?? {};

  if (!eventId || !firstName || !lastName || !email) {
    return NextResponse.json(
      { success: false, message: "Missing required RSVP fields." },
      { status: 400 },
    );
  }

  const result = await submitRsvp({
    eventId,
    firstName,
    lastName,
    email,
    guestCount: Number(guestCount) || 1,
    notes,
  });

  return NextResponse.json(result, { status: result.success ? 200 : 502 });
}
