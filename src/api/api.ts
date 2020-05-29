import {Auth, Http, Options, SendEmailItem, SendEmailResponseItem} from './dto';
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

    getBaseURL(): string {
        return this.baseURL;
    }

    async sendEmail(items: SendEmailItem[]): Promise<{ items: SendEmailResponseItem[], httpStatus: number, meta: any }> {
        const options: RequestOptions = {
            method: 'POST',
            url: resolve(this.baseURL, '/v1/send_email'),
            body: items,
        };

        await this.auth.apply(options);

        const {response, httpStatus} = await this.http.request(options);
        return {items: response.data, httpStatus, meta: response.meta};
    }
}
