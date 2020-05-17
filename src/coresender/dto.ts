import {BodyType as EBodyType} from '../dict'
import {ErrorItem, ValidationError} from "../errors/dto";

export interface SimpleEmail {
    readonly fromEmail: string;
    readonly toEmail: string;
    readonly subject: string;
    readonly body: string;
    readonly bodyType: BodyType;
}

export type BodyType = EBodyType.HTML | EBodyType.TEXT;

export interface EmailItem {
    readonly fromEmail: string;
    readonly fromName?: string;
    readonly toEmail: string;
    readonly toName?: string;
    readonly subject: string;
    readonly bodyText?: string;
    readonly bodyHTML?: string;
    readonly customId?: string;
    readonly customIdUnique?: boolean;
    readonly trackOpens?: boolean;
    readonly trackClicks?: boolean;
    readonly listUnsubscribe?: string;
}

export type SendEmailStatus = 'accepted' | 'rejected';

export interface SendEmailResponse {
    readonly messageId: string;
    readonly customId: string;
    readonly status: SendEmailStatus;
    readonly errors: ErrorItem[]|ValidationError[];
}

export interface Options {
    readonly baseURL?: string;
    readonly userAgent?: string;
    readonly timeout?: number;
    readonly version?: string;
}
