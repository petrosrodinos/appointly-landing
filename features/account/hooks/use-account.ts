import { useQuery, } from "@tanstack/react-query";
import { getProviders, } from "../services/account.services";
import type { AccountQuery } from "../interfaces/account.interfaces";

export const useGetProviders = (query?: AccountQuery) => {
    return useQuery({
        queryKey: ["accounts", "providers", query],
        queryFn: () => getProviders(query),
    });
};


