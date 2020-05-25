import {EmailItemStatus, ErrorCode} from "../../../src/dict";
import {ValidationError} from "../../../src/errors";

const t = [
    {
        n: 'Empty subject',
        p: [{
            bodyText: 'test',
            fromEmail: 'alice@example.com',
            toEmail: 'bob@example.com',
            subject: ''
        }],
        r: {
            messageId: '',
            customId: '',
            status: EmailItemStatus.REJECTED,
            code: ValidationError.CODE,
            errors: [
                {
                    field: 'subject',
                    value: '',
                    errors: [
                        {
                            code: ErrorCode.REQUIRED,
                            description: `The 'subject' field is required.`
                        }
                    ]
                }
            ]
        }
    },
];

export {t};