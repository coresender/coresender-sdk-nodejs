import {EmailItemStatus} from "../../src/dict";
import {responseAcceptAll} from '../response/send_email';
import {responseFromErrorCode, responseHTMLError,} from "../response/common";
import {baseParams} from "./params";
import {BodyNotArray, HTTPError, InvalidCredentials, UnknownError} from "../../src/errors";

const testCases = [
    {
        name: `Great success response - message accepted`,
        params: baseParams,
        mock: {
            statusCode: 200,
            reply: responseAcceptAll,
        },
        expect: (res) => {
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
    }
];

export {testCases};
