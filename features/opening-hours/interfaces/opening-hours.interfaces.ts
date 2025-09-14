export interface OpeningHour {
    id: string;
    uuid: string;
    account_uuid: string;
    day: string;
    open_time: string;
    close_time: string;
    created_at: string;
    updated_at: string;
}


export interface OpeningHoursResponse {
    monday: OpeningHour[];
    tuesday: OpeningHour[];
    wednesday: OpeningHour[];
    thursday: OpeningHour[];
    friday: OpeningHour[];
    saturday: OpeningHour[];
    sunday: OpeningHour[];
}
