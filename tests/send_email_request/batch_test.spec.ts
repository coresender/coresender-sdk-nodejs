import * as nock from 'nock';
import {Coresender} from '../../src';
import {testCases} from "./test_cases";

const client = new Coresender('account-id', 'account-secret');
const uri = '/v1/send_email';

describe(`sendEmailRequest.execute() - batch tests`, () => {
    for (const t of testCases) {
        it(t.name, async () => {
            let scope;
            if (t.mock) {
                scope = nock(client.getBaseURL())
                    .post(uri)
                    .reply(t.mock.statusCode, t.mock.reply);
            }

            const req = client.sendEmailRequest();
            for (const p of t.params) {
                req.addToBatch(p);
            }

            let err, result;
            try {
                result = await req.execute();
            } catch (_err) {
                err = _err;
            }

            // console.log('DEBUG=>', {result, err});

            if (t.expectToThrow) {
                expect(err.code).toStrictEqual(t.expectToThrow.code);
            } else {
                t.expect(result.getItems());
            }

            if (t.mock) {
                scope.done();
            }
        });
    }
});

