interface Opts {
    inline?: boolean;
}
export declare class Test {
    #private;
    output: string;
    opts?: Opts;
    initialString?: string;
    constructor(string?: string, opts?: Opts);
    append(strings: TemplateStringsArray, ...values: any): this;
    prepend(strings: TemplateStringsArray, ...values: any): this;
    get(): string;
}
export {};
