export const ApiRoutes = {
    accounts: {
        prefix: "/accounts",
        providers: "/accounts/providers",
        seo: (uuid_or_slug: string) => `/accounts/seo/${uuid_or_slug}`,
    },
    account_themes: {
        prefix: "/account-themes",
        providers: (uuid: string) => `/account-themes/providers/${uuid}`,
    },
    bookings: {
        prefix: "/bookings",
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
    chats: {
        prefix: "/chats",
        landing: "/chats/messages/landing-page",
        messages: (provider_uuid: string, client_uuid: string, include_messages: boolean) => `/chats/provider-client?provider_uuid=${provider_uuid}&client_uuid=${client_uuid}&include_messages=${include_messages}`,
    },
}