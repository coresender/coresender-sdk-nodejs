import {EmailItemStatus} from "../../src/dict";
import {responseAcceptAll} from '../response/send_email';
import {responseFromErrorCode, responseHTMLError,} from "../response/common";
import {baseParams} from "./params";
import {BodyNotArray, HTTPError, InvalidCredentials, InvalidParameter, UnknownError} from "../../src/errors";
import {TestCase} from "../test_case";
import {SendEmailResponse} from "../../src/coresender/dto";

const testCases: TestCase[] = [
    {
        name: `Great success response - message accepted`,
        params: baseParams,
        mock: {
            statusCode: 200,
            reply: responseAcceptAll,
        },
        expect: (res: SendEmailResponse) => {
            expect(res.status).toStrictEqual(EmailItemStatus.ACCEPTED);
            expect(res.customId).toStrictEqual('');
            expect(res.messageId).toBeDefined();
            expect(res.errors.length).toStrictEqual(0);
        }
    },
    {
        name: `Invalid credentials response`,
        params: baseParams,
        mock: {
            statusCode: 401,
            reply: responseFromErrorCode(InvalidCredentials.CODE),
        },
        expectToThrow: new InvalidCredentials(),
    },
    {
        name: `Http Error - Bad gateway`,
        params: baseParams,
        mock: {
            statusCode: 502,
            reply: responseFromErrorCode('BAD_GATEWAY'),
        },
        expectToThrow: new HTTPError('', 'BAD_GATEWAY'),
    },
    {
        name: `Malformed response - HTML Error`,
        params: baseParams,
        mock: {
            statusCode: 500,
            reply: responseHTMLError,
        },
        expectToThrow: new UnknownError(),
    },
    {
        name: `Malformed request - body not an array`,
        params: baseParams,
        mock: {
            statusCode: 422,
            reply: responseFromErrorCode(BodyNotArray.CODE),
        },
        expectToThrow: new BodyNotArray(),
    },
    {
        name: `Null as a param`,
        params: null,
        expectToThrow: new InvalidParameter(),
    },
    {
        name: `Undefined as a param`,
        params: undefined,
        expectToThrow: new InvalidParameter(),
    }
];

export {testCases};
