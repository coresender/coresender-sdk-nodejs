import {EmailItem} from "../../src/coresender/dto";

const minParams: EmailItem[] = [{
    fromEmail: 'from@example.com',
    toEmail: 'to@example.com',
    subject: 'test subject',
    bodyText: 'hello',
    customId: '123e4567-e89b-12d3-a456-426652340000',
}];

export {minParams};
