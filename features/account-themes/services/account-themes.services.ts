import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import type { AccountTheme } from "../interfaces/account-themes.interfaces";

export const getAccountTheme = async (provider_uuid: string): Promise<AccountTheme | null> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.account_themes.providers(provider_uuid));
        return response.data;
    } catch (error) {
        return null;
    }
};