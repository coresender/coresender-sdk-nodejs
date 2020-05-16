import {Auth, Http, Options, SendEmailItem} from './dto';
import {RequestOptions} from '../dto/http';
import {resolve} from 'url';
import {debuglog} from 'util';

const debugLog = debuglog('coresender');

export class Api {
    private readonly baseURL: string = 'https://api.coresender.com';
    private readonly version: string = '1.0';
    private readonly http: Http;
    private readonly auth: Auth;

    constructor(http: Http, auth: Auth, options: Options = {}) {
        this.baseURL = options.baseURL ? options.baseURL : this.baseURL;
        this.version = options.version ? options.version : this.version;

        debugLog(`initialized api with baseURL = ${this.baseURL}`);

        this.http = http;
        this.auth = auth;
    }

    async sendEmail(items: SendEmailItem[]): Promise<any> {
        const options: RequestOptions = {
            method: 'POST',
            url: resolve(this.baseURL, '/v1/send_email'),
            body: items,
        };

        await this.auth.apply(options);

        debugLog('request options=', options);

        // todo: params
        // todo: response formatter
        // todo: error handler

        return this.http.request(options);
    }
}
