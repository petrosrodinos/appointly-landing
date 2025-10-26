export interface CreateMessageLandingDto {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    content: string;
    provider_uuid: string;
    confirmation_message_channel: ConfirmationMessageChannel;
}

export const ConfirmationMessageChannels = {
    EMAIL: "EMAIL",
    SMS: "SMS",
} as const;

export type ConfirmationMessageChannel = (typeof ConfirmationMessageChannels)[keyof typeof ConfirmationMessageChannels];