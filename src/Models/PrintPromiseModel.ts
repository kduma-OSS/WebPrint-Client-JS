import PrinterModel from "./PrinterModel";

export default class PrintPromiseModel {
    public readonly ulid: string;
    public toString = (): string => this.ulid;
    public readonly status: string;
    public readonly name: string;
    public readonly type: string;
    public readonly ppd_options?: object;
    public readonly content_available: boolean;
    public readonly file_name?: string;
    public readonly size?: number;
    public readonly meta?: object;
    public readonly selected_printer?: PrinterModel;
    public readonly created_at: string;
    public readonly updated_at: string;

    constructor(values: {
        ulid: string,
        status: string,
        name: string,
        type: string,
        ppd_options?: object,
        content_available: boolean,
        file_name?: string,
        size?: number,
        meta?: object,
        selected_printer?: PrinterModel,
        created_at: string,
        updated_at: string
    }) {
        this.ulid = values.ulid;
        this.status = values.status;
        this.name = values.name;
        this.type = values.type;
        this.ppd_options = values.ppd_options;
        this.content_available = values.content_available;
        this.file_name = values.file_name;
        this.size = values.size;
        this.meta = values.meta;
        this.selected_printer = values.selected_printer;
        this.created_at = values.created_at;
        this.updated_at = values.updated_at;
    }
}