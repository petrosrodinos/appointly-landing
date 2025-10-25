import { ApiRoutes } from "@/config/api/routes";
import type { CreateAnalyticsEventDto } from "../interfaces/analytics-events.interfaces";
import axiosInstance from "@/config/api/axios";
// import { environments } from "@/config/environments";


export const sendEvent = async (event: CreateAnalyticsEventDto) => {
    // const url = `${environments.API_URL}${ApiRoutes.analytics_events.prefix}`;
    // const payload = JSON.stringify(event);
    // const blob = new Blob([payload], { type: 'application/json' });

    try {

        await axiosInstance.post(ApiRoutes.analytics_events.prefix, event, {
            headers: { 'Content-Type': 'application/json' },
        });

        // const sent = navigator.sendBeacon(url, blob);

        // if (!sent) {
        //     await axiosInstance.post(ApiRoutes.analytics_events.prefix, event, {
        //         headers: { 'Content-Type': 'application/json' },
        //         timeout: 5000,
        //     });
        // }
    } catch (err) {
        console.error("Failed to send beacon:", err);
    }
};


