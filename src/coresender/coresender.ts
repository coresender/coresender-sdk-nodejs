import {debuglog} from 'util'
import {Options, SimpleEmail} from './dto';
import {Http} from '../http';
import {Auth} from '../auth';
import {Api, SendEmailItem} from '../api';
import {BodyType} from '../dict'
import {SendEmailRequest} from './send_email_request'

const debugLog = debuglog('coresender');

export class Coresender {
    private readonly api: Api;

    constructor(accountId: string, accountSecret: string, options: Options = {}) {
        this.api = new Api(new Http(options), new Auth(accountId, accountSecret), options);

        debugLog(`initialized client for accountId = ${accountId}`);
    }

    sendEmailRequest(): SendEmailRequest {
        return new SendEmailRequest(this.api);
    }

    async simpleEmail(params: SimpleEmail): Promise<any> {
        const item: SendEmailItem = {
            from: {email: params.fromEmail},
            to: [{email: params.toEmail}],
            subject: params.subject,
            body: params.bodyType === BodyType.HTML ? {html: params.body} : {text: params.body},
        };

        return this.api.sendEmail([item]);
    }
}