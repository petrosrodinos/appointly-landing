import { useQuery } from "@tanstack/react-query";
import { getRatings, getAverageRating } from "../services/ratings.services";
import type { RatingQuery } from "../interfaces/ratings.interfaces";


export const useGetRatings = (query: RatingQuery) => {
    return useQuery({
        queryKey: ["ratings", query],
        queryFn: () => getRatings(query),
        enabled: !!query.provider_uuid,
    });
};


export const useGetAverageRating = (provider_uuid: string) => {
    return useQuery({
        queryKey: ["average-rating", provider_uuid],
        queryFn: () => getAverageRating(provider_uuid),
        enabled: !!provider_uuid,
    });
};
