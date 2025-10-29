import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMessageLanding, getMessagesLanding } from "../services/chat.services";
import { GetMessagesLandingDto } from "../interfaces/chat.interfaces";

export const useCreateMessageLanding = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createMessageLanding,
        onError: () => {
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ["messages_landing"] });
            }, 5000);
        },
    });
}

export const useGetMessagesLanding = (payload: GetMessagesLandingDto & { enabled?: boolean }) => {
    return useQuery({
        queryKey: ["messages_landing"],
        queryFn: () => getMessagesLanding(payload),
        enabled: !!payload.provider_uuid && !!payload.client_uuid && !!payload.include_messages && !!payload.enabled,
        retry: false,
    });
}