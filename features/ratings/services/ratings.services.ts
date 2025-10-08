import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type { AverageRating, RatingQuery, RatingsResponse } from "../interfaces/ratings.interfaces";


export const getRatings = async (query?: RatingQuery): Promise<RatingsResponse> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.ratings.prefix, { params: query });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch ratings. Please try again.");
    }
};


export const getAverageRating = async (provider_uuid: string): Promise<AverageRating> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.ratings.average(provider_uuid));
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch average rating. Please try again.");
    }
};

