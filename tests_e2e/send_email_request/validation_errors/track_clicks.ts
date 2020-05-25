import {EmailItemStatus, ErrorCode} from "../../../src/dict";
import {ValidationError} from "../../../src/errors";

const t = [
    {
        n: 'Track clicks invalid',
        p: [{
            bodyText: 'Track clicks testing',
            fromEmail: 'alice@example.com',
            toEmail: 'bob@example.com',
            subject: 'Track clicks',
            trackClicks: '42',
        }],
        r: {
            messageId: '',
            customId: '',
            status: EmailItemStatus.REJECTED,
            code: ValidationError.CODE,
            errors: [
                {
                    field: 'trackClicks',
                    value: '42',
                    errors: [
                        {
                            code: ErrorCode.BOOL,
                            description: `The 'trackClicks' must be a valid bool value.`
                        }
                    ]
                }
            ]
        }
    },
];

export {t};