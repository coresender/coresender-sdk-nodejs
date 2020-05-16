import {Options} from './dto';
import {RequestOptions} from '../dto/http';
import axios from 'axios';

export class Http {
    private readonly userAgent: string = `Coresender/lib-node-coresender/1.0`;
    private readonly timeout: number = 60 * 1000;

    constructor(options: Options = {}) {
        this.userAgent = options.userAgent ? options.userAgent : this.userAgent;
        this.timeout = options.timeout ? options.timeout : this.timeout;
    }

    async request(options: RequestOptions): Promise<any> {
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

        // data: T;
        // status: number;
        // statusText: string;
        // headers: any;
        // config: AxiosRequestConfig;
        // request?: any;

        // todo: check errors etc.

        return axios(_options);
    }
}
