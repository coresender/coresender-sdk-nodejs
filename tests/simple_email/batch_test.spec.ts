import * as nock from 'nock';
import {Coresender} from '../../src';
import {testCases} from "./test_cases";

const client = new Coresender('account-id', 'account-secret');
const uri = '/v1/send_email';

describe(`client.simpleEmail() - batch tests`, () => {
    for (const t of testCases) {
        it(t.name, async () => {
            let scope;
            if (t.mock) {
                scope = nock(client.getBaseURL())
                    .post(uri)
                    .reply(t.mock.statusCode, t.mock.reply);
            }

            let err, result;
            try {
                result = await client.simpleEmail(t.params);
            } catch (_err) {
                err = _err;
            }

            // console.log('DEBUG=>', {result, err});

            if (t.expectToThrow) {
                expect(err.code).toStrictEqual(t.expectToThrow.code);
            } else {
                t.expect(result);
            }

            if (t.mock) {
                scope.done();
            }
        });
    }
});

