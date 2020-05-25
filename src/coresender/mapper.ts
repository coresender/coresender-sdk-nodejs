import {SendEmailResponse} from "./dto";
import {SendEmailResponseItem} from "../api/dto";
import {ValidationError} from "../errors/dto";
import {debuglog, inspect} from "util";

const debugLog = debuglog('coresender');

const TO_EMAIL_FROM = 'to[0].email';
const TO_EMAIL_TO = 'toEmail';
const TO_EMAIL_NAME_FROM = 'to[0].name';
const TO_EMAIL_NAME_TO = 'toName'
const FROM_EMAIL_FROM = 'from.email';
const FROM_FROM = 'from';
const FROM_EMAIL_TO = 'fromEmail';
const FROM_NAME_FROM = 'from.name';
const FROM_NAME_TO = 'fromName';
const BODY_FROM = 'body';
const BODY_TO_HTML = 'bodyHTML';
const BODY_TO_TEXT = 'bodyText';
const CUSTOM_ID_FROM = 'custom_id';
const CUSTOM_ID_TO = 'customId';
const CUSTOM_ID_UNIQUE_FROM = 'custom_id_unique';
const CUSTOM_ID_UNIQUE_TO = 'customIdUnique';
const TRACK_OPENS_FROM = 'track_opens';
const TRACK_OPENS_TO = 'trackOpens';
const TRACK_CLICKS_FROM = 'track_clicks';
const TRACK_CLICKS_TO = 'trackClicks';
const LIST_UNSUBSCRIBE_FROM = 'list_unsubscribe';
const LIST_UNSUBSCRIBE_TO = 'listUnsubscribe';
const LIST_ID_FROM = 'list_id';
const LIST_ID_TO = 'listId';

export class Mapper {
    private readonly map = {
        [TO_EMAIL_FROM]: (err) => this.rename(err, TO_EMAIL_FROM, TO_EMAIL_TO),
        [TO_EMAIL_NAME_FROM]: (err) => this.rename(err, TO_EMAIL_NAME_FROM, TO_EMAIL_NAME_TO),
        [CUSTOM_ID_FROM]: (err) => this.rename(err, CUSTOM_ID_FROM, CUSTOM_ID_TO),
        [CUSTOM_ID_UNIQUE_FROM]: (err) => this.rename(err, CUSTOM_ID_UNIQUE_FROM, CUSTOM_ID_UNIQUE_TO),
        [TRACK_OPENS_FROM]: (err) => this.rename(err, TRACK_OPENS_FROM, TRACK_OPENS_TO),
        [TRACK_CLICKS_FROM]: (err) => this.rename(err, TRACK_CLICKS_FROM, TRACK_CLICKS_TO),
        [LIST_UNSUBSCRIBE_FROM]: (err) => this.rename(err, LIST_UNSUBSCRIBE_FROM, LIST_UNSUBSCRIBE_TO),
        [LIST_ID_FROM]: (err) => this.rename(err, LIST_ID_FROM, LIST_ID_TO),
        [FROM_FROM]: (err) => this.renameFromEmail(err, FROM_FROM, FROM_EMAIL_TO),
        [FROM_EMAIL_FROM]: (err) => this.renameFromEmail(err, FROM_EMAIL_FROM, FROM_EMAIL_TO),
        [FROM_NAME_FROM]: (err) => this.rename(err, FROM_NAME_FROM, FROM_NAME_TO),
        [BODY_FROM]: (err) => this.renameBody(err, BODY_FROM),
    };

    rename(err: ValidationError, from: string, to: string) {
        err.field = to;
        for (const e of err.errors) {
            e.description = e.description.replace(from, to);
        }
    }

    renameFromEmail(err: ValidationError, from: string, to: string) {
        this.rename(err, from, to);
        err.value = typeof err.value === 'object' ? err.value.email : err.value;
    }

    renameBody(err: ValidationError, from: string) {
        const to = err.value.text === '' ? BODY_TO_TEXT : BODY_TO_HTML;
        err.value = '';
        this.rename(err, from, to);
    }

    emailItem(from: SendEmailResponseItem): SendEmailResponse {
        const to = {
            messageId: from.message_id,
            customId: from.custom_id,
            status: from.status,
            code: from.code,
            errors: from.errors
        };

        debugLog('raw response', inspect(from, null, 5));

        for (const error of to.errors) {
            const vErr = <ValidationError>error;
            if (!vErr.field) {
                continue;
            }

            if (!this.map[vErr.field]) {
                continue;
            }

            this.map[vErr.field](vErr);
        }

        return to;
    }
}