import type { Account } from "@/features/account/interfaces/account.interfaces";
import type { Document } from "@/features/documents/interfaces/documents.interfaces";

export interface Service {
    id: string;
    uuid: string;
    account_uuid: string;
    name: string;
    description: string;
    price: number;
    slots: number;
    duration: number;
    location_types: LocationTypes[];
    payment_types: PaymentTypes[];
    visible: boolean;
    stripe_product_id: string;
    created_at: string;
    updated_at: string;
    account?: Account;
    images?: Document[];
}



export interface ServicesPagination {
    data: Service[];
    pagination: Pagination;
}

export interface Pagination {
    total: number;
    page: number;
    limit: number;
    total_pages: number;
    has_next: boolean;
    has_prev: boolean;
}



export interface ServiceQuery {
    account_uuid?: string;
    name?: string;
    description?: string;
    price?: number;
    slots?: number;
    location_types?: LocationTypes[];
    payment_types?: PaymentTypes[];
    visible?: boolean;
    limit?: number;
    page?: number;
    sort?: string;
    order?: string;
    search?: string;
}

export const LocationTypes = {
    ONLINE: "ONLINE",
    OFFICE: "OFFICE",
    HOME: "HOME",
} as const;

export const PaymentTypes = {
    CASH: "CASH",
    CARD: "CARD",
} as const;

export type LocationTypes = (typeof LocationTypes)[keyof typeof LocationTypes];
export type PaymentTypes = (typeof PaymentTypes)[keyof typeof PaymentTypes];
