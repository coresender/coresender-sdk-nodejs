import {debuglog} from 'util'

const debugLog = debuglog('coresender');

export class Coresender {
    private accountId;
    private accountSecret;

    constructor(accountId, accountSecret) {
        this.accountId = accountId;
        this.accountSecret = accountSecret;

        debugLog(`initialized client for accountId = ${accountId}`);
    }

    async simpleMail(): Promise<any> {

    }
}