import {EmailItemStatus, ErrorCode} from "../../../src/dict";
import {ValidationError} from "../../../src/error";
import {randomBytes} from 'crypto';

const str256 = randomBytes(128).toString('hex');

const t = [
    {
        n: 'Invalid from name',
        p: [{
            bodyText: 'test',
            fromEmail: 'alice@example.com',
            fromName: str256,
            toEmail: 'bob@example.com',
            subject: 'invalid from name'
        }],
        r: {
            messageId: '',
            customId: '',
            status: EmailItemStatus.REJECTED,
            code: ValidationError.CODE,
            errors: [
                {
                    field: 'fromName',
                    value: str256,
                    errors: [
                        {
                            code: ErrorCode.MAX,
                            description: `The 'fromName' may not be greater than 255  characters.`
                        }
                    ]
                }
            ]
        }
    }
];

export {t};