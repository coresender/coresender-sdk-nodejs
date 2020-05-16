// NODE_DEBUG=coresender node_modules/.bin/ts-node examples/send_email_request

import * as dotenv from 'dotenv';
import {join} from 'path';
import {Coresender} from '../src';

dotenv.config({path: join(__dirname, '../.env')});

const main = async () => {
    const client = new Coresender(process.env.ACCOUNT_ID, process.env.ACCOUNT_SECRET);
    const request = client.sendEmailRequest();

    request.push({
        fromEmail: 'kornel@demon.fm',
        toEmail: 'pl.kornel@gmail.com',
        subject: 'send_email_request test 1',
        bodyText: 'Hello from send_email_request 1',
    });

    request.push({
        fromEmail: 'kornel@demon.fm',
        toEmail: 'pl.kornel@gmail.com',
        subject: 'send_email_request test 2',
        bodyText: 'Hello from send_email_request 2',
    });

    const result = await request.send();

    console.log('result=', result);
};

main().catch(err => {
    console.error('main err=', err.stack);
});
