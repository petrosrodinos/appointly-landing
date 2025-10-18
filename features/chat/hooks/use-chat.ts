import { useMutation } from "@tanstack/react-query";
import { createMessageLanding } from "../services/chat.services";
import { toast } from "@/hooks/use-toast";

export const useCreateMessageLanding = () => {
    return useMutation({
        mutationFn: createMessageLanding,
        onError: (error) => {
            toast({
                title: "Could not send message",
                description: error.message,
            });
        },
    });
}