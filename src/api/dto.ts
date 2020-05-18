import {RequestOptions} from '../dto/http';
import {ErrorItem, ValidationError} from '../errors/dto';

export interface Http {
    request(options: RequestOptions): Promise<any>
}

export interface Auth {
    apply(request: RequestOptions): Promise<void>
}

export interface Options {
    readonly baseURL?: string;
    readonly version?: string;
}

interface SendEmailBody {
    readonly html?: string;
    readonly text?: string;
}

interface SendEmailTo {
    readonly email: string;
    readonly name?: string;
}

interface SendEmailFrom {
    readonly email: string;
    readonly name?: string;
}

export interface SendEmailItem {
    readonly body: SendEmailBody;
    readonly to: SendEmailTo[];
    readonly from: SendEmailFrom;
    readonly custom_id?: string;
    readonly custom_id_unique?: boolean;
    readonly subject: string;
    readonly track_opens?: boolean;
    readonly track_clicks?: boolean;
    readonly list_unsubscribe?: string;
}

export type SendEmailStatus = 'accepted' | 'rejected';

export interface SendEmailResponseItem {
    readonly message_id: string;
    readonly custom_id: string;
    readonly status: SendEmailStatus;
    readonly code?: string;
    readonly errors: ErrorItem[]|ValidationError[];
}

export interface SendEmailResponse {
    readonly data: SendEmailResponseItem[];
    readonly meta: { [key: string]: any };
}

