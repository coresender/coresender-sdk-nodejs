export function responseFromErrorCode(code) {
    return () => ({
        meta: {},
        data: {code: code, errors: [{code: code, description: code}]}
    });
}

export function responseHTMLError() {
    return `<html lang="pl-PL"><head><title>Error</title></head><body><h1>Server Error</h1></body></html>`;
}
