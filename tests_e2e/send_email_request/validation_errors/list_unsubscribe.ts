import {EmailItemStatus, ErrorCode} from "../../../src/dict";
import {ValidationError} from "../../../src/errors";

const t = [
    {
        n: 'List unsubscribe invalid',
        p: [{
            bodyText: 'List unsubscribe testing',
            fromEmail: 'alice@example.com',
            toEmail: 'bob@example.com',
            subject: 'List unsubscribe',
            listUnsubscribe: 'foo'
        }],
        r: {
            messageId: '',
            customId: '',
            status: EmailItemStatus.REJECTED,
            code: ValidationError.CODE,
            errors: [
                {
                    field: 'listUnsubscribe',
                    value: 'foo',
                    errors: [
                        {
                            code: ErrorCode.INVALID_LIST_UNSUBSCRIBE,
                            description: `The 'listUnsubscribe' must be an valid url or email address.`
                        }
                    ]
                }
            ]
        }
    },
];

export {t};