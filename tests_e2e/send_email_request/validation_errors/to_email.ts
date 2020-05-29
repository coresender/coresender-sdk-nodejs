import {EmailItemStatus, ErrorCode} from "../../../src/dict";
import {ValidationError} from "../../../src/error";

const t = [
    {
        n: 'Invalid to email',
        p: [{
            bodyText: 'test',
            fromEmail: 'alice@example.com',
            toEmail: 'bob@example',
            subject: 'invalid to email'
        }],
        r: {
            messageId: '',
            customId: '',
            status: EmailItemStatus.REJECTED,
            code: ValidationError.CODE,
            errors: [
                {
                    field: 'toEmail',
                    value: 'bob@example',
                    errors: [
                        {
                            code: ErrorCode.INVALID_EMAIL,
                            description: `The 'toEmail' must be a valid email address.`
                        }
                    ]
                }
            ]
        }
    },
    {
        n: 'Empty to email',
        p: [{
            bodyText: 'test',
            fromEmail: 'alice@example.com',
            toEmail: '',
            subject: 'empty to email'
        }],
        r: {
            messageId: '',
            customId: '',
            status: EmailItemStatus.REJECTED,
            code: ValidationError.CODE,
            errors: [
                {
                    field: 'toEmail',
                    value: '',
                    errors: [
                        {
                            code: ErrorCode.REQUIRED,
                            description: `The 'toEmail' field is required.`
                        }
                    ]
                }
            ]
        }
    }
];

export {t};