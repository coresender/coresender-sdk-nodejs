import {Api, SendEmailItem} from '../api';
import {EmailItem} from './dto';
import {BodyEmptyArray} from '../error';
import {Mapper} from "./mapper";
import {SendEmailResponse} from "../response/send_email";

export class SendEmailRequest {
    private readonly api: Api;
    private readonly mapper: Mapper;
    private items: SendEmailItem[];

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

    async execute(): Promise<SendEmailResponse> {
        if (this.items.length === 0) {
            throw new BodyEmptyArray(`Add at least one email item to send email request`);
        }

        const {items, httpStatus, meta} = await this.api.sendEmail(this.items);
        const _items = items.map(row => this.mapper.emailItem(row));
        this.items = [];

        return new SendEmailResponse(_items, httpStatus, meta);
    }
}
