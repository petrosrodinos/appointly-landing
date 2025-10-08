import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type { Account, AccountQuery, SeoResponse } from "../interfaces/account.interfaces";

export const getProviders = async (query?: AccountQuery): Promise<Account[]> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.accounts.providers, { params: query });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch providers. Please try again.");
    }
}


export const getProviderAccount = async (uuid_or_slug: string): Promise<Account> => {
    try {
        const response = await axiosInstance.get(`${ApiRoutes.accounts.providers}/${uuid_or_slug}`);
        return response.data;
    } catch (error) {
        console.log("error", error);
        throw new Error("Failed to fetch account. Please try again.");
    }
}

export const getAccountSeo = async (uuid_or_slug: string): Promise<SeoResponse> => {
    try {
        const response = await axiosInstance.get(`${ApiRoutes.accounts.seo(uuid_or_slug)}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch account seo. Please try again.");
    }
}