import {testCases} from "./test_cases";

describe(`client.simpleEmail() - batch tests`, () => {
    for (const t of testCases) {
        it(t.name, async () => {
            if (t.skip) {
                return;
            }

            let err, result;
            try {
                const request = t.client.sendEmailRequest();

                for (const email of t.params) {
                    request.addToBatch(email);
                }

                result = await request.execute();
            } catch (_err) {
                err = _err;
            }

            // console.log('DEBUG=>', inspect({result, err}, null, 10));

            if (t.expectToThrow) {
                expect(err.code).toStrictEqual(t.expectToThrow.code);
            } else {
                t.expect(result);
            }
        });
    }
});

