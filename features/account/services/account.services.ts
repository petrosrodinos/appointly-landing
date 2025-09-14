import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type { Account, AccountQuery } from "../interfaces/account.interfaces";

export const getAccounts = async (query?: AccountQuery): Promise<Account[]> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.accounts.prefix, { params: query });
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch accounts. Please try again.");
    }
}

export const getAccount = async (uuid: string): Promise<Account> => {
    try {
        const response = await axiosInstance.get(`${ApiRoutes.accounts.prefix}/${uuid}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch account. Please try again.");
    }
}