import { useQuery, } from "@tanstack/react-query";
import { getAccount, getAccounts, } from "../services/account.services";
import type { AccountQuery } from "../interfaces/account.interfaces";

export const useGetAccounts = (query?: AccountQuery & { enabled?: boolean }) => {
    return useQuery({
        queryKey: ["accounts", query],
        queryFn: () => getAccounts(query),
        enabled: query?.enabled ?? true,
    });
};

export const useGetAccount = (uuid: string) => {
    return useQuery({
        queryKey: ["account", uuid],
        queryFn: () => getAccount(uuid),
        enabled: !!uuid,
    });
};

