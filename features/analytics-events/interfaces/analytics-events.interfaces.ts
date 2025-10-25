export interface CreateAnalyticsEventDto {
    provider_uuid?: string;
    service_uuid?: string;
    booking_uuid?: string;
    campaign_uuid?: string;
    type: AnalyticsEventsTypes;
    metadata?: any;
}


export const AnalyticsEventsTypes = {
    PROVIDER_PAGE_VIEW: 'PROVIDER_PAGE_VIEW',
    BOOKING_PAGE_VIEW: 'BOOKING_PAGE_VIEW',
    BOOKING_STARTED: 'BOOKING_STARTED',
    CAMPAIGN_PROVIDER_PAGE_VIEW: 'CAMPAIGN_PROVIDER_PAGE_VIEW',
} as const;

export type AnalyticsEventsTypes = typeof AnalyticsEventsTypes[keyof typeof AnalyticsEventsTypes];