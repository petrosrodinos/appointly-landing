import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type { Account, AccountQuery } from "../interfaces/account.interfaces";

export const getProviders = async (query?: AccountQuery): Promise<Account[]> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.accounts.providers, { params: query });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch providers. Please try again.");
    }
}


export const getProviderAccount = async (uuid: string): Promise<Account> => {
    try {
        const response = await axiosInstance.get(`${ApiRoutes.accounts.providers}/${uuid}`);
        return response.data;
    } catch (error) {
        console.log("error", error);
        throw new Error("Failed to fetch account. Please try again.");
    }
}