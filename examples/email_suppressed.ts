// NODE_DEBUG=coresender node_modules/.bin/ts-node examples/simple_email.ts

import * as dotenv from 'dotenv';
import {join} from 'path';
import {BodyType, Coresender, EmailItemStatus, Errors, ErrorTypes} from '../src';
import {inspect} from 'util';
import {strictEqual} from 'assert';

dotenv.config({path: join(__dirname, '../.env')});

const main = async () => {
    const client = new Coresender(process.env.ACCOUNT_ID, process.env.ACCOUNT_SECRET, {baseURL: process.env.BASE_URL});
    const params = {
        fromEmail: process.env.DEFAULT_FROM,
        toEmail: 'suppressed@email.com',
        subject: 'simple_email test',
        body: '<div>Hello from simple_email</div>',
        bodyType: BodyType.HTML,
    };

    const result = await client.simpleEmail(params);

    strictEqual(result.status, EmailItemStatus.REJECTED);

    const errItem = <ErrorTypes.ErrorItem>result.errors[0];

    strictEqual(errItem.code, Errors.EmailSuppressed.CODE);

    console.log('result=', inspect(result, null, 5));
};

main().catch(err => console.error('main err=', inspect(err, null, 5)));
