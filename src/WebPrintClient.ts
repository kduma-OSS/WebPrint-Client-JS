import {IWebPrintClient} from "./IWebPrintClient";
import PrinterModel from "./Models/PrinterModel";
import axios, {AxiosInstance} from "axios";
import ServerModel from "./Models/ServerModel";
import PrintPromiseModel from "./Models/PrintPromiseModel";
import PrintDialogModel from "./Models/PrintDialogModel";

export default class WebPrintClient implements IWebPrintClient {
    public readonly endpoint: string;
    public readonly apiKey: string;
    private readonly client: AxiosInstance;

    constructor(endpoint: string, apiKey: string) {
        this.endpoint = endpoint;
        this.apiKey = apiKey;

        this.client = axios.create({
            baseURL: this.endpoint,
            headers: {'Authorization': 'Bearer ' + this.apiKey}
        });
    }

    async GetPrinters(type_filter?: string, with_ppd_options?: boolean): Promise<PrinterModel[]> {
        const response = await this.client.get('printers', {
            params: {
                type: type_filter,
                ppd_options: with_ppd_options ? 1 : undefined
            }
        });

        return response.data.data.map((printer: any) => {
            printer.server = new ServerModel(printer.server);
            return new PrinterModel(printer);
        });
    }

    async GetPrinter(ulid: string | PrinterModel): Promise<PrinterModel> {
        if(ulid instanceof PrinterModel) {
            ulid = ulid.toString();
        }

        const response = await this.client.get('printers/'+ulid);

        let printer = response.data.data;
        printer.server = new ServerModel(printer.server);
        return new PrinterModel(printer);
    }

    async CreatePromise(options: { name: string; type: string; meta?: object; printer?: string | PrinterModel; available_printers?: (string | PrinterModel)[]; ppd_options?: object; content?: string; file_name?: string; headless?: boolean }): Promise<PrintPromiseModel> {
        if(options.printer instanceof PrinterModel) {
            options.printer = options.printer.toString();
        }

        options.available_printers = options.available_printers?.map((printer) => printer instanceof PrinterModel ? printer.toString() : printer);

        const response = await this.client.post('promises', {
            name: options.name,
            type: options.type,
            printer: options.printer,
            meta: options.meta,
            available_printers: options.available_printers,
            ppd_options: options.ppd_options,
            content: options.content,
            file_name: options.file_name,
            headless: options.headless,
        });

        let promise = response.data.data;
        promise.selected_printer = promise.selected_printer ? new PrinterModel(promise.selected_printer) : undefined;
        return new PrintPromiseModel(promise);
    }

    async CreatePromiseAndPrint(name: string, type: string, printer: string | PrinterModel, file_name: string, content: string, ppd_options?: object): Promise<PrintPromiseModel> {
        return this.CreatePromise({
            name: name,
            type: type,
            printer: printer,
            file_name: file_name,
            content: content,
            ppd_options: ppd_options,
            headless: true
        });
    }

    async UpdatePromise(ulid: string | PrintPromiseModel, options: { name?: string; printer?: string | PrinterModel; meta?: object; ppd_options?: object; status?: string }): Promise<void> {
        if(options.printer instanceof PrinterModel) {
            options.printer = options.printer.toString();
        }
        if(ulid instanceof PrintPromiseModel) {
            ulid = ulid.toString();
        }

        await this.client.put('promises/'+ulid, {
            name: options.name,
            printer: options.printer,
            meta: options.meta,
            ppd_options: options.ppd_options,
            status: options.status,
        });
    }

    async GetPromise(ulid: string | PrintPromiseModel): Promise<PrintPromiseModel> {
        if(ulid instanceof PrintPromiseModel) {
            ulid = ulid.toString();
        }

        const response = await this.client.get('promises/' + ulid);

        let promise = response.data.data;
        promise.selected_printer = promise.selected_printer ? new PrinterModel(promise.selected_printer) : undefined;
        return new PrintPromiseModel(promise);
    }

    async DeletePromise(ulid: string | PrintPromiseModel): Promise<void> {
        if (ulid instanceof PrintPromiseModel) {
            ulid = ulid.toString();
        }

        await this.client.delete('promises/' + ulid);
    }

    async GetPromises(page?: number): Promise<{ promises: PrintPromiseModel[]; total_pages: number }> {
        const response = await this.client.get('promises', {
            params: {
                page: page
            }
        });

        const promises: PrintPromiseModel[] = response.data.data.map((promise: any) => {
            promise.selected_printer = promise.selected_printer ? new PrinterModel(promise.selected_printer) : undefined;
            return new PrintPromiseModel(promise);
        });

        return {promises, total_pages: response.data.meta.last_page};
    }

    async CreateDialog(ulid: string | PrintPromiseModel, options?: { auto_print?: boolean; redirect_url?: string; restricted_ip?: string }): Promise<PrintDialogModel> {
        if (ulid instanceof PrintPromiseModel) {
            ulid = ulid.toString();
        }

        const response = await this.client.post('promises/' + ulid + '/dialog', {
            restricted_ip: options?.restricted_ip,
            redirect_url: options?.redirect_url,
            auto_print: options?.auto_print,
        });

        let dialog = response.data.data;
        return new PrintDialogModel(dialog);
    }

    async GetDialog(ulid: string | PrintPromiseModel): Promise<PrintDialogModel> {
        if (ulid instanceof PrintPromiseModel) {
            ulid = ulid.toString();
        }

        const response = await this.client.get('promises/' + ulid + '/dialog');

        let dialog = response.data.data;
        return new PrintDialogModel(dialog);
    }

    async GetPromiseContent(ulid: string | PrintPromiseModel): Promise<string> {
        if (ulid instanceof PrintPromiseModel) {
            ulid = ulid.toString();
        }

        const response = await this.client.get('promises/' + ulid + '/content');

        return response.data;
    }

    async SetPromiseContent(ulid: string | PrintPromiseModel, content: string, file_name?: string): Promise<void> {
        await this.client.post('promises/' + ulid + '/content', content, {
            responseType: 'text',
            headers: file_name ? {
                'X-File-Name': file_name
            } : {}
        });
    }
}