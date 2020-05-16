export interface SimpleEmail {
    readonly fromEmail: string;
    readonly toEmail: string;
    readonly subject: string;
    readonly body: string;
    readonly bodyType: string;
}

export interface Options {
    readonly baseURL?: string;
    readonly userAgent?: string;
    readonly timeout?: number;
    readonly version?: string;
}
