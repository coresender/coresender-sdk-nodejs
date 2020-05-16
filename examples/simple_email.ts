// NODE_DEBUG=coresender node_modules/.bin/ts-node examples/simple_email.ts

import * as dotenv from 'dotenv';
import {join} from 'path';
import {BodyType, Coresender} from '../src';

dotenv.config({path: join(__dirname, '../.env')});

const main = async () => {
    const client = new Coresender(process.env.ACCOUNT_ID, process.env.ACCOUNT_SECRET);
    const params = {
        fromEmail: 'kornel@demon.fm',
        toEmail: 'pl.kornel@gmail.com',
        subject: 'simple_email test',
        body: '<div>Hello from simple_email</div>',
        bodyType: BodyType.HTML,
    };

    const result = await client.simpleEmail(params);

    console.log('result=', result);
};

main().catch(err => {
    console.error('main err=', err.stack);
});
