interface Opts {
    inline?: boolean;
    output?: string;
}
export declare class Str {
    #private;
    private opts;
    private internalOutput;
    private initialString?;
    constructor(start?: string, opts?: Opts);
    append(strings: TemplateStringsArray, ...values: any): this;
    prepend(strings: TemplateStringsArray, ...values: any): this;
    get output(): string;
    get(): string;
}
export {};
