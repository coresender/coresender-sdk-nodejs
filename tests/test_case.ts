import {CoresenderError} from "../src/error";

export interface Mock {
    readonly statusCode: number;
    readonly reply: Function;
}

export interface TestCase {
    readonly name: string;
    readonly params: any;
    readonly mock?: Mock;
    readonly expect?: Function;
    readonly expectToThrow?: CoresenderError;
}
