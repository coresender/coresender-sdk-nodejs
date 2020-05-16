import {Api, SendEmailItem} from '../api';
import {EmailItem, SendEmailResponse} from './dto';

export class SendEmailRequest {
    private api: Api;
    private readonly items: SendEmailItem[];

    constructor(api: Api) {
        this.api = api;
        this.items = [];
    }

    push(item: EmailItem) {
        const _item: SendEmailItem = {
            subject: item.subject,
            from: {email: item.fromEmail, name: item.fromName},
            to: [{email: item.toEmail, name: item.toName}],
            body: {text: item.bodyText, html: item.bodyHTML},
            custom_id: item.customId,
            custom_id_unique: item.customIdUnique,
            list_unsubscribe: item.listUnsubscribe,
            track_clicks: item.trackClicks,
            track_opens: item.trackOpens,
        };

        this.items.push(_item);
    }

    async send(): Promise<SendEmailResponse[] | Error> {
        if (this.items.length === 0) {
            // @todo: throw Coresender.ERROR
            return new Error('NO_EMAILS');
        }

        const rows = await this.api.sendEmail(this.items);

        // todo: errors map ? +validation errors

        return rows.map(row => ({
            messageId: row.message_id,
            customId: row.custom_id,
            status: row.status,
            errors: row.errors
        }));
    }
}
