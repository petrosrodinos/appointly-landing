import type { Document } from "@/features/documents/interfaces/documents.interfaces";
import { Coordinates } from "@/features/google-maps/interfaces/address.interface";
import { Service } from "@/features/services/interfaces/services.interfaces";
import { OpeningHoursResponse } from "@/features/opening-hours/interfaces/opening-hours.interfaces";

export interface Account {
    id: string;
    uuid: string;
    user_uuid: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    account_type: AccountType;
    category: string;
    title: string;
    description: string;
    country: string;
    city: string;
    address: string;
    zip_code: string;
    coordinates: Coordinates;
    timezone?: string;
    logo_uuid: string;
    banner_uuid: string;
    logo: Document;
    banner: Document;
    active: boolean;
    verified: boolean;
    archived: boolean;
    services: Service[];
    oppening_hours: OpeningHoursResponse;
    created_at: string;
    updated_at: string;
}


export interface AccountQuery {
    account_type?: AccountType;
    email?: string;
    phone?: string;
    phone_or_email?: string;
    first_name?: string;
    last_name?: string;
    country?: string;
    city?: string;
    address?: string;
    zip_code?: string;
    active?: boolean;
    verified?: boolean;
    archived?: boolean;
}


export const AccountTypes = {
    CLIENT: 'CLIENT',
    PROVIDER: 'PROVIDER',
    EMPLOYEE: 'EMPLOYEE',
} as const;

export type AccountType = (typeof AccountTypes)[keyof typeof AccountTypes];
