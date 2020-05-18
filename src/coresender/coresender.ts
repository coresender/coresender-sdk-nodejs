import {debuglog} from 'util'
import {Options, SendEmailResponse, SimpleEmail} from './dto';
import {Http} from '../http';
import {Auth} from '../auth';
import {Api, SendEmailItem} from '../api';
import {BodyType} from '../dict'
import {SendEmailRequest} from './send_email_request'
import {Mapper} from './mapper';
import {InvalidParameter} from "../errors";

const debugLog = debuglog('coresender');

export class Coresender {
    private readonly api: Api;
    private readonly mapper: Mapper;

    constructor(accountId: string, accountSecret: string, options: Options = {}) {
        this.api = new Api(new Http(options), new Auth(accountId, accountSecret), options);
        this.mapper = new Mapper();

        debugLog(`initialized client for accountId = ${accountId}`);
    }

    getBaseURL() {
        return this.api.getBaseURL();
    }

    sendEmailRequest(): SendEmailRequest {
        return new SendEmailRequest(this.api, this.mapper);
    }

    async simpleEmail(params: SimpleEmail): Promise<SendEmailResponse> {
        if (!params) {
            throw new InvalidParameter(`This method accepts parameters of SimpleMail interface only.`);
        }

        const item: SendEmailItem = {
            from: {email: params.fromEmail},
            to: [{email: params.toEmail}],
            subject: params.subject,
            body: params.bodyType === BodyType.HTML ? {html: params.body} : {text: params.body},
        };

        const result = await this.api.sendEmail([item]);
        const row = result[0];

        return this.mapper.emailItem(row);
    }
}