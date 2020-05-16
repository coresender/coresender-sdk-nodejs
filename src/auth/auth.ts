import {RequestOptions} from '../dto/http';

export class Auth {
    private readonly authHeader: string;

    constructor(accountId: string, accountSecret: string) {
        this.authHeader = `Basic ${Buffer.from(`${accountId}:${accountSecret}`, 'utf-8').toString('base64')}`;
    }

    async apply(request: RequestOptions): Promise<void> {
        const auth = {'Authorization': this.authHeader};
        request.headers = {...request.headers, ...auth};
    }
}
