import {BodyType} from "../../src/dict";
import {SimpleEmail} from "../../src/coresender/dto";

const baseParams: SimpleEmail = {
    fromEmail: 'from@example.com',
    toEmail: 'to@example.com',
    subject: 'test subject',
    body: 'hello',
    bodyType: BodyType.TEXT,
};

export {baseParams};