import {SendEmailResponseItem} from "../coresender/dto";

export class SendEmailResponse {
    private readonly items: SendEmailResponseItem[] = [];
    private readonly meta = {};
    private readonly httpStatus: number = 0;

    constructor(items: SendEmailResponseItem[], httpStatus = 0, meta = {}) {
        this.items = items;
        this.meta = meta;
        this.httpStatus = httpStatus;
    }

    getItems() {
        return this.items;
    }

    getMeta() {
        return this.meta;
    }

    allAccepted() {
        return this.httpStatus === 200;
    }
}
