export interface Document {
    id: string;
    uuid: string;
    service_uuid?: string;
    account_uuid: string;
    url: string;
    path: string;
    filename: string;
    mimetype: string;
    size: number;
    created_at: string;
}