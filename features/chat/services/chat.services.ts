import axiosInstance from "@/config/api/axios";
import { ApiRoutes } from "@/config/api/routes";
import { CreateMessageLandingDto } from "../interfaces/chat.interfaces";

export const createMessageLanding = async (payload: CreateMessageLandingDto) => {
    try {
        const response = await axiosInstance.post(ApiRoutes.chats.landing, payload);
        return response.data;
    } catch (error) {
        throw new Error("Failed to create message landing. Please try again.");
    }
}