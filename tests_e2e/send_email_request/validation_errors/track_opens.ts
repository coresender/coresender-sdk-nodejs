import {EmailItemStatus, ErrorCode} from "../../../src/dict";
import {ValidationError} from "../../../src/error";

const t = [
    {
        n: 'Track opens invalid',
        p: [{
            bodyText: 'Track opens testing',
            fromEmail: 'alice@example.com',
            toEmail: 'bob@example.com',
            subject: 'Track opens',
            trackOpens: '42',
        }],
        r: {
            messageId: '',
            customId: '',
            status: EmailItemStatus.REJECTED,
            code: ValidationError.CODE,
            errors: [
                {
                    field: 'trackOpens',
                    value: '42',
                    errors: [
                        {
                            code: ErrorCode.BOOL,
                            description: `The 'trackOpens' must be a valid bool value.`
                        }
                    ]
                }
            ]
        }
    },
];

export {t};