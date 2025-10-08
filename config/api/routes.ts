export const ApiRoutes = {
    accounts: {
        prefix: "/accounts",
        providers: "/accounts/providers",
        seo: (uuid_or_slug: string) => `/accounts/seo/${uuid_or_slug}`,
    },
    bookings: {
        prefix: "/bookings",
        availability: "/bookings/availability",
    },
    services: {
        prefix: "/services",
    },
    google_maps: {
        prefix: "/google-maps",
        timezone: "/google-maps/timezone",
    },
    analytics_events: {
        prefix: "/analytics-events",
    },
    ratings: {
        prefix: "/ratings",
        average: (provider_uuid: string) => `/ratings/average/${provider_uuid}`,
    },
}