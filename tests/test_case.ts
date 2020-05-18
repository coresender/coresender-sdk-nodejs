import {SimpleEmail} from "../src/coresender/dto";
import {CoresenderError} from "../src/errors";

export interface Mock {
    readonly statusCode: number;
    readonly reply: Function;
}

export interface TestCase {
    readonly name: string;
    readonly params: SimpleEmail;
    readonly mock?: Mock;
    readonly expect?: Function;
    readonly expectToThrow?: CoresenderError;
}
