export class CoresenderError extends Error {
    public static CODE = 'CORESENDER_ERROR';
    public name = this.constructor.name;
    public code = CoresenderError.CODE;

    constructor(message?: string) {
        super(message || '');
    }
}

export class UnknownError extends CoresenderError {
    public static CODE = 'UNKNOWN_ERROR';
    public code = UnknownError.CODE;
}

export class ConnectionError extends CoresenderError {
    public static CODE = 'CONNECTION_ERROR';
    constructor(message: string, code: string) {
        super(message);
        this.code = code;
    }
}

export class HTTPError extends CoresenderError {
    public static CODE = 'HTTP_ERROR';
    constructor(message: string, code: string) {
        super(message);
        this.code = code;
    }
}

export class BodyNotArray extends CoresenderError {
    public static CODE = 'BODY_NOT_ARRAY';
    public code = BodyNotArray.CODE;
}

export class BodyEmptyArray extends CoresenderError {
    public static CODE = 'BODY_EMPTY_ARRAY';
    public code = BodyEmptyArray.CODE;
}

export class InvalidCredentials extends CoresenderError {
    public static CODE = 'INVALID_CREDENTIALS';
    public code = InvalidCredentials.CODE;
}

export class CustomIdNotUnique extends CoresenderError {
    public static CODE = 'CUSTOM_ID_NOT_UNIQUE';
    public code = CustomIdNotUnique.CODE;
}

export class SendingDomainDisabled extends CoresenderError {
    public static CODE = 'SENDING_DOMAIN_DISABLED';
    public code = SendingDomainDisabled.CODE;
}

export class SendingDomainNotAssigned extends CoresenderError {
    public static CODE = 'SENDING_DOMAIN_NOT_ASSIGNED';
    public code = SendingDomainNotAssigned.CODE;
}

export class SendingDomainNotFound extends CoresenderError {
    public static CODE = 'SENDING_DOMAIN_NOT_FOUND';
    public code = SendingDomainNotFound.CODE;
}

export class SendingDomainNotVerified extends CoresenderError {
    public static CODE = 'SENDING_DOMAIN_NOT_VERIFIED';
    public code = SendingDomainNotVerified.CODE;
}

export class EmailSuppressed extends CoresenderError {
    public static CODE = 'EMAIL_SUPPRESSED';
    public code = EmailSuppressed.CODE;
}

export class InvalidJSON extends CoresenderError {
    public static CODE = 'INVALID_JSON';
    public code = InvalidJSON.CODE;
}

export class MultipleRecipientsNotSupported extends CoresenderError {
    public static CODE = 'MULTIPLE_RECIPIENTS_NOT_SUPPORTED';
    public code = MultipleRecipientsNotSupported.CODE;
}

export class SendingBlocked extends CoresenderError {
    public static CODE = 'SENDING_BLOCKED';
    public code = SendingBlocked.CODE;
}

export class SendingLimitReached extends CoresenderError {
    public static CODE = 'SENDING_LIMIT_REACHED';
    public code = SendingLimitReached.CODE;
}

export class TrialSendingLimitReached extends CoresenderError {
    public static CODE = 'TRIAL_SENDING_LIMIT_REACHED';
    public code = TrialSendingLimitReached.CODE;
}

export class ValidationError extends CoresenderError {
    public static CODE = 'VALIDATION_ERROR';
    public code = ValidationError.CODE;
}

export class InternalServerError extends CoresenderError {
    public static CODE = 'INTERNAL_SERVER_ERROR';
    public code = InternalServerError.CODE;
}

export class InvalidParameter extends CoresenderError {
    public static CODE = 'INVALID_PARAMETER';
    public code = InvalidParameter.CODE;
}