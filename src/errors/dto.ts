export interface ValidationError {
    field: string;
    value: any;
    readonly errors: ErrorItem[];
}

export interface ErrorItem {
    code: string
    description: string;
}

export interface ErrorData {
    readonly code: string;
    readonly errors: ErrorItem[] | ValidationError[];
}

export interface ErrorResponse {
    readonly data: ErrorData;
    readonly meta: { [key: string]: any };
}
