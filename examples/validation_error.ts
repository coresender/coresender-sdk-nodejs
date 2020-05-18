// NODE_DEBUG=coresender node_modules/.bin/ts-node examples/simple_email.ts

import * as dotenv from 'dotenv';
import {join} from 'path';
import {Coresender, EmailItemStatus, ErrorCode, ErrorTypes} from '../src';
import {inspect} from 'util';
import {randomBytes} from 'crypto';
import {strictEqual} from 'assert';

dotenv.config({path: join(__dirname, '../.env')});

const main = async () => {
    const client = new Coresender(process.env.ACCOUNT_ID, process.env.ACCOUNT_SECRET, {baseURL: process.env.BASE_URL});
    const request = client.sendEmailRequest();

    request.addToBatch({
        fromEmail: null,
        fromName: '',
        toEmail: null,
        toName: '',
        subject: null,
        bodyText: null,
        trackOpens: null,
        trackClicks: null,
        listUnsubscribe: null,
        customId: null,
        customIdUnique: null,
        bodyHTML: null,
    });

    const toLongString = randomBytes(512).toString('base64');

    request.addToBatch({
        fromEmail: 'aaa',
        fromName: toLongString,
        toEmail: 'bbb',
        toName: toLongString,
        subject: toLongString,
        bodyText: null,
        listUnsubscribe: null,
        customId: toLongString,
        bodyHTML: null,
    });

    const result = await request.execute();

    const res1 = result[0];
    strictEqual(res1.status, EmailItemStatus.REJECTED);
    let err = <ErrorTypes.ValidationError>res1.errors[0];
    strictEqual(err.field, 'subject');
    strictEqual(err.errors[0].code, ErrorCode.REQUIRED);

    console.log('result=', inspect(result, null, 5));
};

main().catch(err => console.error('main err=', inspect(err, null, 5)));
