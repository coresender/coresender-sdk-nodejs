export interface RequestOptions {
    readonly url: string;
    readonly method?: string|any;
    headers?: { [key: string]: string };
    body?: any;
}
