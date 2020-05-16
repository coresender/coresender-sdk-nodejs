export interface ErrorItem {
    readonly code: string
    readonly description: string;
}

export interface ErrorData {
    readonly code: string;
    readonly errors: ErrorItem[];
}

export interface ErrorResponse {
    readonly data: ErrorData;
    readonly meta: { [key: string]: any };
}
