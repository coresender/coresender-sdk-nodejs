import {EmailItemStatus, ErrorCode} from "../../../src/dict";
import {ValidationError} from "../../../src/error";

const t = [
    {
        n: 'Empty text body',
        p: [{
            bodyText: '',
            fromEmail: 'alice@example.com',
            toEmail: 'bob@example.com',
            subject: 'Invalid body'
        }],
        r: {
            messageId: '',
            customId: '',
            status: EmailItemStatus.REJECTED,
            code: ValidationError.CODE,
            errors: [
                {
                    field: 'bodyText',
                    value: '',
                    errors: [
                        {
                            code: ErrorCode.REQUIRED,
                            description: `The 'bodyText' field is required.`
                        }
                    ]
                }
            ]
        }
    },
];

export {t};