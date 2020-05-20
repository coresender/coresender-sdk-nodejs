import {TestCase} from '../test_case';
import * as dotenv from 'dotenv';
import {join} from 'path';
import {Coresender, EmailItemStatus, Errors} from '../../src';
import {v4 as uuidv4} from 'uuid';
import {SendEmailResponse} from '../../src/coresender/dto';
import {InvalidCredentials} from '../../src/errors';
import {validation_errors} from './validation_errors';

dotenv.config({path: join(__dirname, '../../.env')});

const defaultClient = new Coresender(process.env.ACCOUNT_ID, process.env.ACCOUNT_SECRET, {baseURL: process.env.BASE_URL})
const customId = uuidv4();

const testCases: TestCase[] = [
    {
        name: `Invalid credentials response`,
        skip: true,
        client: new Coresender(process.env.ACCOUNT_ID, 'invalid-secret', {baseURL: process.env.BASE_URL}),
        params: [{
            bodyText: 'test',
            fromEmail: 'alice@example.com',
            toEmail: 'bob@example.com',
            subject: 'Invalid credentials'
        }],
        expectToThrow: new InvalidCredentials(),
    },
    {
        name: `CustomID Unique verification in one request`,
        skip: true,
        client: defaultClient,
        params: [
            {
                bodyText: 'test',
                fromEmail: process.env.DEFAULT_FROM,
                toEmail: process.env.DEFAULT_TO,
                subject: `Custom ID ${customId} - should be accepted`,
                customId,
                customIdUnique: true,
            },
            {
                bodyText: 'test',
                fromEmail: process.env.DEFAULT_FROM,
                toEmail: process.env.DEFAULT_TO,
                subject: `Custom ID ${customId} - should NOT be accepted`,
                customId,
                customIdUnique: true,
            },
        ],
        expect: (res: SendEmailResponse[]) => {
            const r1 = res[0];
            expect(r1.status).toStrictEqual(EmailItemStatus.ACCEPTED);
            expect(r1.messageId).toBeDefined();
            expect(r1.errors.length).toBe(0);
            expect(r1.customId).toBe(customId);
            const r2 = res[1];
            expect(r2.status).toStrictEqual(EmailItemStatus.REJECTED);
            expect(r2.messageId).toStrictEqual('');
            expect(r2.customId).toBe(customId);
            expect(r2.code).toStrictEqual(Errors.CustomIdNotUnique.CODE);
        },
    },
    {
        name: `Sending domain not verified`,
        skip: true,
        client: defaultClient,
        params: [
            {
                bodyText: 'test',
                fromEmail: 'alice@sendingdomain.com',
                toEmail: process.env.DEFAULT_TO,
                subject: `Unassigned sending domain`,
            },
        ],
        expect: (res: SendEmailResponse[]) => {
            const r1 = res[0];
            expect(r1.status).toStrictEqual(EmailItemStatus.REJECTED);
            expect(r1.messageId).toBe('');
            expect(r1.errors.length).toBe(1);
            expect(r1.code).toStrictEqual(Errors.SendingDomainNotVerified.CODE);
        }
    },
];


for (const v of validation_errors) {
    testCases.push({
        name: v.n,
        client: defaultClient,
        params: v.p,
        expect: (res: SendEmailResponse[]) => {
            const r = res[0];
            expect(r).toMatchObject(v.r);
        }
    });
}

export {testCases};
