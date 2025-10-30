import { Account } from "@/features/account/interfaces/account.interfaces";
import { Pagination } from "@/features/services/interfaces/services.interfaces";

export interface Faq {
    id: string;
    uuid: string;
    account_uuid: string;
    question: string;
    answer: string;
    order: number;
    created_at: string;
    updated_at: string;
    account: Account;
}

export interface FaqResponse {
    data: Faq[];
    pagination: Pagination;
}

export interface FaqQuery {
    account_uuid: string;
    page: number;
    limit: number;
    search: string;
    order_by: 'created_at' | 'updated_at' | 'order';
    order_direction: 'asc' | 'desc';
}