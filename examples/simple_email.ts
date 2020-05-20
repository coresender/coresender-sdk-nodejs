// NODE_DEBUG=coresender node_modules/.bin/ts-node examples/send_email_request.ts

import * as dotenv from 'dotenv';
import {join} from 'path';
import {BodyType, Coresender} from '../src';
import {inspect} from 'util';

dotenv.config({path: join(__dirname, '../.env')});

const main = async () => {
    const client = new Coresender(process.env.ACCOUNT_ID, process.env.ACCOUNT_SECRET, {baseURL: process.env.BASE_URL});
    const params = {
        fromEmail: process.env.DEFAULT_FROM,
        toEmail: process.env.DEFAULT_TO,
        subject: 'simple_email test',
        body: '<div>Hello from simple_email</div>',
        bodyType: BodyType.HTML,
    };

    const result = await client.simpleEmail(params);

    console.log('result=', inspect(result, null, 5));
};

main().catch(err => console.error('main err=', inspect(err, null, 5)));
