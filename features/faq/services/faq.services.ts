import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type { FaqResponse, FaqQuery } from "../interfaces/faq.interfaces";

export const getFaqs = async (query?: FaqQuery): Promise<FaqResponse | null> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.faq.prefix, { params: query });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch faqs. Please try again.");
    }
}