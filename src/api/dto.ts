import {RequestOptions} from '../dto/http';

interface Http {
    request(options: RequestOptions): Promise<any>
}

interface Auth {
   apply(request: RequestOptions): Promise<void>
}

interface Options {
    readonly baseURL?: string;
    readonly version?: string;
}

interface SendEmailBody {
    readonly html?: string;
    readonly text?: string;
}
interface SendEmailTo {
    readonly email: string;
    readonly name?: string;
}
interface SendEmailFrom {
    readonly email: string;
    readonly name?: string;
}

interface SendEmailItem {
    readonly body: SendEmailBody;
    readonly to: SendEmailTo[];
    readonly from: SendEmailFrom;
    readonly custom_id?: string;
    readonly custom_id_unique?: boolean;
    readonly subject: string;
    readonly track_opens?: boolean;
    readonly track_clicks?: boolean;
    readonly list_unsubscribe?: string;
}

export {Http, Auth, Options, SendEmailItem};
