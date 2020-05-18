import {EmailItemStatus} from "../../src/dict";
import {responseAcceptAll, responseWithData} from '../response/send_email';
import {minParams} from "./params";
import {TestCase} from "../test_case";
import {SendEmailResponse} from "../../src/coresender/dto";
import {BodyEmptyArray} from "../../src/errors";
import {empty_body} from '../errors_mapping';

const testCases: TestCase[] = [
    {
        name: `Great success response - message accepted - with min required parameters`,
        params: minParams,
        mock: {
            statusCode: 200,
            reply: responseAcceptAll,
        },
        expect: (res: SendEmailResponse[]) => {
            let i = 0;
            for (const r of res) {
                expect(r.status).toStrictEqual(EmailItemStatus.ACCEPTED);
                expect(r.customId).toStrictEqual(minParams[i].customId);
                expect(r.messageId).toBeDefined();
                expect(r.errors.length).toStrictEqual(0);
                i++;
            }
        }
    },
    {
        name: `No emails in batch`,
        params: [],
        expectToThrow: new BodyEmptyArray(),
    },
    {
        name: `Validation error - empty body`,
        params: minParams,
        mock: {
            statusCode: 200,
            reply: responseWithData([empty_body[0]]),
        },
        expect: (res: SendEmailResponse[]) => expect(res[0]).toMatchObject(empty_body[1]),
    }
];

export {testCases};
