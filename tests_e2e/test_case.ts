import {CoresenderError} from "../src/error";
import {Coresender} from '../src/index'
import {EmailItem} from "../src/coresender/dto";

export interface TestCase {
    readonly client: Coresender;
    readonly name: string;
    readonly params: EmailItem[];
    readonly expect?: Function;
    readonly expectToThrow?: CoresenderError;
    readonly skip?: boolean;
}
