import ServerModel from "./ServerModel";

export default class PrinterModel {
    public readonly ulid: string;
    public toString = (): string => this.ulid;
    public readonly server?: ServerModel;
    public readonly name: string;
    public readonly ppd_support: boolean;
    public readonly raw_languages_supported: string[];
    public readonly ppd_options?: object;
    public readonly ppd_options_layout?: object;

    constructor(values: {
        ulid: string,
        server: ServerModel,
        name: string,
        ppd_support: boolean,
        raw_languages_supported: string[],
        ppd_options: object,
        ppd_options_layout: object
    }) {
        this.ulid = values.ulid;
        this.server = values.server;
        this.name = values.name;
        this.ppd_support = values.ppd_support;
        this.raw_languages_supported = values.raw_languages_supported;
        this.ppd_options = values.ppd_options;
        this.ppd_options_layout = values.ppd_options_layout;
    }
}