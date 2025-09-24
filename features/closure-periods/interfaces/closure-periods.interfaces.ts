import { Service } from "@/features/services/interfaces/services.interfaces";

export interface ClosurePeriod {
    id: string;
    uuid: string;
    account_uuid: string;
    service_uuid?: string;
    date_from: string;
    date_to?: string;
    time_from?: string;
    time_to?: string;
    description?: string;
    enabled: boolean;
    created_at: string;
    updated_at: string;
    service?: Service;
}