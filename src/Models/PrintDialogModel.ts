export default class PrintDialogModel {
    public readonly ulid: string;
    public toString = (): string => this.ulid;
    public readonly status: string;
    public readonly auto_print: boolean;
    public readonly redirect_url?: string;
    public readonly restricted_ip?: string;
    public readonly link: string;
    public readonly created_at: string;
    public readonly updated_at: string;

    constructor(values: {
        ulid: string,
        status: string,
        auto_print: boolean,
        redirect_url?: string,
        restricted_ip?: string,
        link: string,
        created_at: string,
        updated_at: string
    }) {
        this.ulid = values.ulid;
        this.status = values.status;
        this.auto_print = values.auto_print;
        this.redirect_url = values.redirect_url;
        this.restricted_ip = values.restricted_ip;
        this.link = values.link;
        this.created_at = values.created_at;
        this.updated_at = values.updated_at;
    }
}