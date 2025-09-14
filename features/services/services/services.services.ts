import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type { Service, ServiceQuery, ServicesPagination } from "../interfaces/services.interfaces";

export const getServices = async (query?: ServiceQuery): Promise<ServicesPagination> => {
    try {
        if (query) {
            query.page = query.page ? Number(query.page) : undefined;
            query.limit = query.limit ? Number(query.limit) : undefined;
        }

        const response = await axiosInstance.get(ApiRoutes.services.prefix, { params: query });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch services. Please try again.");
    }
};



export const getService = async (uuid: string): Promise<Service> => {
    try {
        const response = await axiosInstance.get(`${ApiRoutes.services.prefix}/${uuid}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to get service. Please try again.");
    }
};


