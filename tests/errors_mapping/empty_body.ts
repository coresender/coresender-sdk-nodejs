import {EmailItemStatus, ErrorCode} from '../../src/dict';
import {ValidationError} from '../../src/error';

const empty_body = [
    {
        message_id: '',
        custom_id: '',
        status: EmailItemStatus.REJECTED,
        code: ValidationError.CODE,
        errors: [
            {
                field: 'body',
                value: {
                    html: '',
                    text: ''
                },
                errors: [
                    {
                        code: ErrorCode.REQUIRED,
                        description: `The 'body' field is required.`
                    }
                ]
            }
        ]
    },
    {
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
];

export {empty_body};