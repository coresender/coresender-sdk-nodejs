export enum BodyType {
    HTML = 'html',
    TEXT = 'text',
}

export enum EmailItemStatus {
    ACCEPTED = 'accepted',
    REJECTED = 'rejected',
}

export enum ErrorCode {
    REQUIRED = 'REQUIRED',
    MAX = 'MAX',
    MIN = 'MIN',
    INVALID_EMAIL = 'INVALID_EMAIL',
    INVALID_LIST_UNSUBSCRIBE = 'INVALID_LIST_UNSUBSCRIBE',
    BOOL = 'BOOL',
    VALUE_TO_LOW = 'VALUE_TO_LOW',
    URL = 'URL',
    MULTIPLE_RECIPIENTS_NOT_SUPPORTED = 'MULTIPLE_RECIPIENTS_NOT_SUPPORTED',
}
