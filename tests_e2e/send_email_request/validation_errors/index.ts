import {t as body_text} from './body_text';
import {t as from_email} from './from_email';
import {t as from_name} from './from_name';
import {t as to_email} from './to_email';

const validation_errors = [].concat(body_text, from_email, from_name, to_email);

export {validation_errors};
