import {EmailItemStatus, ErrorCode} from "../../../src/dict";
import {ValidationError} from "../../../src/errors";
import {randomBytes} from "crypto";

const longString = randomBytes(256).toString('hex');

const t = [
    {
        n: 'Custom id to long',
        p: [{
            bodyText: 'customID testing',
            fromEmail: 'alice@example.com',
            toEmail: 'bob@example.com',
            subject: 'customID',
            customId: longString
        }],
        r: {
            messageId: '',
            customId: longString,
            status: EmailItemStatus.REJECTED,
            code: ValidationError.CODE,
            errors: [
                {
                    field: 'customId',
                    value: longString,
                    errors: [
                        {
                            code: ErrorCode.MAX,
                            description: `The 'customId' may not be greater than 255  characters.`
                        }
                    ]
                }
            ]
        }
    },
];

export {t};