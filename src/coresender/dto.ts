import {BodyType as EBodyType} from '../dict'
import {ErrorItem, ValidationError} from "../error/dto";

export interface SimpleEmail {
    readonly fromEmail: string;
    readonly toEmail: string;
    readonly subject: string;
    readonly body: string;
    readonly bodyType: BodyType;
}

export type BodyType = EBodyType.HTML | EBodyType.TEXT;

export interface ReplyTo {
    email: string;
    name?: string;
}

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
    readonly listId?: string;
    readonly replyTo?: ReplyTo[];
}

export type SendEmailStatus = 'accepted' | 'rejected';

export interface SendEmailResponseItem {
    readonly messageId: string;
    readonly customId: string;
    readonly status: SendEmailStatus;
    readonly code?: string;
    readonly errors: ErrorItem[] | ValidationError[];
}

export interface Options {
    readonly baseURL?: string;
    readonly userAgent?: string;
    readonly timeout?: number;
    readonly version?: string;
}
