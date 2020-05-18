import {SendEmailItem} from "../../src/api";
import {EmailItemStatus} from "../../src/dict";
import {v4 as uuidv4} from 'uuid';

export function responseAcceptAll(uri, requestBody: SendEmailItem[]) {
    const data = [];
    for (const item of requestBody) {
        data.push({
            message_id: uuidv4(),
            custom_id: item.custom_id || '',
            status: EmailItemStatus.ACCEPTED,
            errors: []
        });
    }
    return {meta: {}, data};
}

export function responseWithData(data) {
    return function () {
        return {meta: {}, data};
    }
}