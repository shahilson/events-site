import { createClient, OAuthStrategy } from "@wix/sdk";
import { wixEventsV2 } from "@wix/events";

const clientId = process.env.WIX_CLIENT_ID;

// The site runs fully on curated sample data when no Wix Headless client is
// configured, so `npm run dev` works immediately without any setup. Add
// WIX_CLIENT_ID (see .env.example) to connect it to a real Wix Events
// collection.
export const isWixConfigured = Boolean(clientId);

export const wixClient = clientId
  ? createClient({
      modules: { events: wixEventsV2 },
      auth: OAuthStrategy({ clientId }),
    })
  : null;
