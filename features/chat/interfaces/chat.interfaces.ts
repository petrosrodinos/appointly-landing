export interface CreateMessageLandingDto {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    content: string;
    provider_uuid: string;
}