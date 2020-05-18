import {SendEmailResponse} from "./dto";
import {SendEmailResponseItem} from "../api/dto";
import {ValidationError} from "../errors/dto";

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

export class Mapper {
    private readonly map = {
        [TO_EMAIL_FROM]: (err) => this.rename(err, TO_EMAIL_FROM, TO_EMAIL_TO),
        [TO_EMAIL_NAME_FROM]: (err) => this.rename(err, TO_EMAIL_NAME_FROM, TO_EMAIL_NAME_TO),
        [CUSTOM_ID_FROM]: (err) => this.rename(err, CUSTOM_ID_FROM, CUSTOM_ID_TO),
        [FROM_FROM]: (err) => this.renameFromEmail(err, FROM_FROM, FROM_EMAIL_TO),
        [FROM_EMAIL_FROM]: (err) => this.renameFromEmail(err, FROM_EMAIL_FROM, FROM_EMAIL_TO),
        [FROM_NAME_FROM]: (err) => this.rename(err, FROM_NAME_FROM, FROM_NAME_TO),
        [BODY_FROM]: (err) => this.renameBody(err, BODY_FROM)
    };

    rename(err: ValidationError, from: string, to: string) {
        err.field = to;
        for (const e of err.errors) {
            e.description = e.description.replace(from, to);
        }
    }

    renameFromEmail(err: ValidationError, from: string, to: string) {
        this.rename(err, from, to);
        err.value = err.value.email || '';
    }

    renameBody(err: ValidationError, from: string) {
        err.value = '';
        const to = err.value.text === '' ? BODY_TO_TEXT : BODY_TO_HTML;
        this.rename(err, from, to);
    }

    emailItem(from: SendEmailResponseItem): SendEmailResponse {
        const to = {
            messageId: from.message_id,
            customId: from.custom_id,
            status: from.status,
            errors: from.errors
        };

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