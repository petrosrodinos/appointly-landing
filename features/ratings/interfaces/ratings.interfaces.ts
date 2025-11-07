import { Account } from "@/features/account/interfaces/account.interfaces";
import type { Pagination, Service } from "@/features/services/interfaces/services.interfaces";

export interface Rating {
    id: string;
    uuid: string;
    provider_uuid: string;
    client_uuid: string;
    booking_uuid: string;
    service_uuid: string;
    punctuality: number;
    friendliness: number;
    professionalism: number;
    experience: number;
    trustworthiness: number;
    total: number;
    comment: string;
    response: string;
    created_at: string;
    updated_at: string;
    client: Account;
}


export interface RatingsResponse {
    data: Rating[];
    pagination: Pagination;
}

export interface RatingQuery {
    provider_uuid: string;
    limit?: number;
    page?: number;
    order_by?: 'created_at' | 'total' | 'punctuality' | 'friendliness' | 'professionalism' | 'experience' | 'trustworthiness';
    order_direction?: 'asc' | 'desc';
}


export interface AverageRating {
    average_rating: number;
    total_ratings: number;
    ratings_landing_sentiment: string;
    ratings_breakdown: {
        punctuality: number;
        friendliness: number;
        professionalism: number;
        experience: number;
        trustworthiness: number;
    };
}