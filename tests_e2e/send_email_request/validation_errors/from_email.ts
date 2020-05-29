import {EmailItemStatus, ErrorCode} from "../../../src/dict";
import {ValidationError} from "../../../src/error";

const t = [
    {
        n: 'Invalid from email',
        p: [{
            bodyText: 'test',
            fromEmail: 'alice@com',
            toEmail: 'bob@example.com',
            subject: 'invalid from email'
        }],
        r: {
            messageId: '',
            customId: '',
            status: EmailItemStatus.REJECTED,
            code: ValidationError.CODE,
            errors: [
                {
                    field: 'fromEmail',
                    value: 'alice@com',
                    errors: [
                        {
                            code: ErrorCode.INVALID_EMAIL,
                            description: `The 'fromEmail' must be a valid email address.`
                        }
                    ]
                }
            ]
        }
    },
    {
        n: 'Empty from email',
        p: [{
            bodyText: 'test',
            fromEmail: '',
            toEmail: 'bob@example.com',
            subject: 'empty from email'
        }],
        r: {
            messageId: '',
            customId: '',
            status: EmailItemStatus.REJECTED,
            code: ValidationError.CODE,
            errors: [
                {
                    field: 'fromEmail',
                    value: '',
                    errors: [
                        {
                            code: ErrorCode.REQUIRED,
                            description: `The 'fromEmail' field is required.`
                        }
                    ]
                }
            ]
        }
    }
];

export {t};