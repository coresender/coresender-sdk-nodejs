import {debuglog} from 'util';

import * as errors from '../errors';
import {ErrorResponse} from '../errors/dto';

const debugLog = debuglog('coresender');

const code2Err = {
  [errors.InvalidCredentials.CODE]: (description) => new errors.InvalidCredentials(description),
  [errors.BodyNotArray.CODE]: (description) => new errors.BodyNotArray(description),
  [errors.InvalidJSON.CODE]: (description) => new errors.InvalidJSON(description),
  [errors.InternalServerError.CODE]: (description) => new errors.InternalServerError(description),
};

export function map(err: any) {
    debugLog('err(map)', JSON.stringify(err, null, 2));

    // coresender's error
    if (err.data && err.data.code) {
        const _err = <ErrorResponse>err;
        const data = _err.data;
        const code = data.code;
        const description = Array.isArray(data.errors) && data.errors.length > 0 ? data.errors[0].description: code;

        const errFn = code2Err[code];
        if (!errFn) {
            return new errors.HTTPError(description, code);
        }

        return errFn(description);
    }

    // connection error
    if (err.code && err.message) {
        return new errors.ConnectionError(err.message, err.code);
    }

    return new errors.UnknownError('Invalid response format. Please try again later');
}
