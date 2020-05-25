import {EmailItemStatus, ErrorCode} from "../../../src/dict";
import {ValidationError} from "../../../src/errors";

const t = [
    {
        n: 'Custom id unique invalid',
        p: [{
            bodyText: 'customID unique testing',
            fromEmail: 'alice@example.com',
            toEmail: 'bob@example.com',
            subject: 'customID',
            customId: '',
            customIdUnique: '42'
        }],
        r: {
            messageId: '',
            customId: '',
            status: EmailItemStatus.REJECTED,
            code: ValidationError.CODE,
            errors: [
                {
                    field: 'customIdUnique',
                    value: '42',
                    errors: [
                        {
                            code: ErrorCode.BOOL,
                            description: `The 'customIdUnique' must be a valid bool value.`
                        }
                    ]
                }
            ]
        }
    },
];

export {t};