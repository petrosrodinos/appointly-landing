import { useQuery, } from "@tanstack/react-query";
import { getServices, getService } from "../services/services.services";
import type { ServiceQuery, ServicesPagination } from "../interfaces/services.interfaces";

export const useServices = (query?: ServiceQuery & { enabled?: boolean }) => {
    return useQuery<ServicesPagination>({
        queryKey: ["services", query],
        queryFn: () => getServices(query),
        enabled: query?.enabled ?? true,
    });
};


export const useGetService = (uuid: string) => {
    return useQuery({
        queryKey: ["service", uuid],
        queryFn: () => getService(uuid),
        enabled: !!uuid,
    });
};