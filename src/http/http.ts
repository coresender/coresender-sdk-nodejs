import {Options} from './dto';
import {RequestOptions} from '../dto/http';
import {map} from './map'
import axios from 'axios';
import {debuglog, inspect} from "util";

const debugLog = debuglog('coresender');
const {version} = require('../../package.json');

export class Http {
    private readonly userAgent: string = `Coresender/lib-node-coresender/${version}`;
    private readonly timeout: number = 60 * 1000;

    constructor(options: Options = {}) {
        this.userAgent = options.userAgent ? options.userAgent : this.userAgent;
        this.timeout = options.timeout ? options.timeout : this.timeout;
    }

    async request(options: RequestOptions): Promise<{ response: any, httpStatus: number, meta?: any }> {
        const _options = {
            method: options.method ? options.method : 'GET',
            url: options.url,
            headers: {
                ...options.headers || {},
                'User-Agent': this.userAgent,
            },
            data: options.body,
            timeout: this.timeout,
        };

        debugLog('request options=', inspect(_options, null, 5));

        let response;
        try {
            response = await axios(_options);
        } catch (err) {
            if (err.response) {
                debugLog('raw response error', inspect(err.response.data, null, 5));
                throw map(err.response.data || {});
            }
            throw map(err);
        }
        return {response: response.data, httpStatus: response.status, meta: response.meta};
    }
}
