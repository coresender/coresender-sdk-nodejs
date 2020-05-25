import {t as body_text} from './body_text';
import {t as body_html} from './body_html';
import {t as from_email} from './from_email';
import {t as from_name} from './from_name';
import {t as to_email} from './to_email';
import {t as subject} from './subject';
import {t as custom_id} from './custom_id';
import {t as custom_id_unique} from './custom_id_unique';
import {t as track_opens} from './track_opens';
import {t as track_clicks} from './track_clicks';
import {t as list_unsubscribe} from './list_unsubscribe';
import {t as list_id} from './list_id';

const validation_errors = [].concat(
    body_text, from_email, from_name, to_email, subject, body_html, custom_id, custom_id_unique, track_opens,
    track_clicks, list_unsubscribe, list_id,
);

export {validation_errors};
