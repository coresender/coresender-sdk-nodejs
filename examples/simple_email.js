'use strict';

const {inspect} = require('util');
const {join} = require('path');
const dotenv = require('dotenv');
const {Coresender, BodyType} = require('../dist');

dotenv.config({path: join(__dirname, '../.env')});

const client = new Coresender(process.env.ACCOUNT_ID, process.env.ACCOUNT_SECRET, {baseURL: process.env.BASE_URL});

const main = async () => {
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
