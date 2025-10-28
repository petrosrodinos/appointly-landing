import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import { ChatMessagesResponse, CreateMessageLandingDto, CreateMessageLandingResponse, GetMessagesLandingDto } from "../interfaces/chat.interfaces";

export const createMessageLanding = async (payload: CreateMessageLandingDto): Promise<CreateMessageLandingResponse> => {
    try {
        const response = await axiosInstance.post(ApiRoutes.chats.landing, payload);
        return response.data;
    } catch (error) {
        throw new Error("Failed to create message landing. Please try again.");
    }
}

export const getMessagesLanding = async (payload: GetMessagesLandingDto): Promise<ChatMessagesResponse> => {
    try {
        const response = await axiosInstance.get(ApiRoutes.chats.messages(payload.provider_uuid, payload.client_uuid, payload.include_messages));
        return response.data;
    } catch (error) {
        throw new Error("Failed to get messages landing. Please try again.");
    }
}