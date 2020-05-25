import {EmailItemStatus, ErrorCode} from "../../../src/dict";
import {ValidationError} from "../../../src/errors";
import {randomBytes} from "crypto";

const longString = randomBytes(256).toString('hex');

const t = [
    {
        n: 'List id invalid',
        p: [{
            bodyText: 'List id testing',
            fromEmail: 'alice@example.com',
            toEmail: 'bob@example.com',
            subject: 'List unsubscribe',
            listId: longString
        }],
        r: {
            messageId: '',
            customId: '',
            status: EmailItemStatus.REJECTED,
            code: ValidationError.CODE,
            errors: [
                {
                    field: 'listId',
                    value: longString,
                    errors: [
                        {
                            code: ErrorCode.MAX,
                            description: `The 'listId' may not be greater than 255  characters.`
                        }
                    ]
                }
            ]
        }
    },
];

export {t};