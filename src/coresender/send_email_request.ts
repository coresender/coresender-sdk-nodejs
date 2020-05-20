import {Api, SendEmailItem} from '../api';
import {EmailItem, SendEmailResponse} from './dto';
import {BodyEmptyArray} from '../errors';
import {Mapper} from "./mapper";

export class SendEmailRequest {
    private api: Api;
    private readonly mapper: Mapper;
    private readonly items: SendEmailItem[];

    constructor(api: Api, mapper: Mapper) {
        this.api = api;
        this.mapper = mapper;
        this.items = [];
    }

    addToBatch(item: EmailItem) {
        const _item: SendEmailItem = {
            subject: item.subject,
            from: {email: item.fromEmail, name: item.fromName},
            to: [{email: item.toEmail, name: item.toName}],
            body: {text: item.bodyText, html: item.bodyHTML},
            custom_id: item.customId,
            custom_id_unique: item.customIdUnique,
            list_id: item.listId,
            list_unsubscribe: item.listUnsubscribe,
            track_clicks: item.trackClicks,
            track_opens: item.trackOpens,
        };

        this.items.push(_item);
    }

    async execute(): Promise<SendEmailResponse[]> {
        if (this.items.length === 0) {
            throw new BodyEmptyArray(`Add at least one email item to send email request`);
        }

        const rows = await this.api.sendEmail(this.items);
        return rows.map(row => this.mapper.emailItem(row));
    }
}
