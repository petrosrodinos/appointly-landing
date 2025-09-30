import { ApiRoutes } from "@/config/api/routes";
import type { CreateAnalyticsEventDto } from "../interfaces/analytics-events.interfaces";
import { environments } from "@/config/environments";

export const sendEvent = async (event: CreateAnalyticsEventDto) => {
    const blob = new Blob([JSON.stringify(event)], { type: 'application/json' });
    navigator.sendBeacon(`${environments.API_URL}${ApiRoutes.analytics_events.prefix}`, blob);
}


