// NODE_DEBUG=coresender node_modules/.bin/ts-node examples/send_email_request

import * as dotenv from 'dotenv';
import {join} from 'path';
import {Coresender} from '../src';
import {inspect} from "util";

dotenv.config({path: join(__dirname, '../.env')});

const main = async () => {
    const client = new Coresender(process.env.ACCOUNT_ID, process.env.ACCOUNT_SECRET, {baseURL: process.env.BASE_URL});
    const request = client.sendEmailRequest();

    request.addToBatch({
        fromEmail: process.env.DEFAULT_FROM,
        toEmail: process.env.DEFAULT_TO,
        subject: 'send_email_request test 1',
        bodyText: 'Hello from send_email_request 1',
    });

    request.addToBatch({
        fromEmail: process.env.DEFAULT_FROM,
        toEmail: process.env.DEFAULT_TO,
        subject: 'send_email_request test 2',
        bodyText: 'Hello from send_email_request 2',
    });

    const result = await request.execute();

    console.log('result=', inspect(result, null, 5));
};

main().catch(err => console.error('main err=', inspect(err, null, 5)));
