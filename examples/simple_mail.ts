// NODE_DEBUG=coresender node_modules/.bin/ts-node examples/simple_mail.ts

import * as dotenv from 'dotenv';
import {join} from 'path';
import {Coresender} from '../src';

dotenv.config({path: join(__dirname, '../.env')});

const main = async () => {
    const client = new Coresender(process.env.ACCOUNT_ID, process.env.ACCOUNT_SECRET);
    const result = await client.simpleMail();

    console.log('result=', result);
};

main().catch(err => {
    console.error('main err=', err.trace());
});
