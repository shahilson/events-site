import { NextRequest, NextResponse } from "next/server";
import { createCheckout } from "@/lib/wix/events";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { eventId, ticketDefinitionId, eventPageUrl, quantity } = body ?? {};

  if (!eventId || !ticketDefinitionId) {
    return NextResponse.json(
      { success: false, message: "Missing required checkout fields." },
      { status: 400 },
    );
  }

  const result = await createCheckout({
    eventId,
    ticketDefinitionId,
    eventPageUrl: eventPageUrl ?? "",
    quantity: Number(quantity) || 1,
  });

  return NextResponse.json(result, { status: result.success ? 200 : 502 });
}
