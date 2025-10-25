import { ApiRoutes } from "@/config/api/routes";
import type { CreateAnalyticsEventDto } from "../interfaces/analytics-events.interfaces";
import { environments } from "@/config/environments";

export const sendEvent = async (event: CreateAnalyticsEventDto) => {
    const url = `${environments.API_URL}${ApiRoutes.analytics_events.prefix}`;
    const payload = JSON.stringify(event);
    const blob = new Blob([payload], { type: 'application/json' });

    try {
        // const sent = navigator.sendBeacon(url, blob);

        if (true) {
            await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: payload,
                keepalive: true,
            });
        }
    } catch (err) {
        console.error("Failed to send beacon:", err);
    }
};


