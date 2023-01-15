import PrintDialogModel from "./Models/PrintDialogModel";
import PrinterModel from "./Models/PrinterModel";
import PrintPromiseModel from "./Models/PrintPromiseModel";

export interface IWebPrintClient {
    GetPrinters(type_filter?: string, with_ppd_options?: boolean): Promise<PrinterModel[]>;
    GetPrinter(ulid: string | PrinterModel): Promise<PrinterModel>;
    GetPromises(page?: number): Promise<{ promises: PrintPromiseModel[]; total_pages: number }>;
    GetPromise(ulid: string | PrintPromiseModel): Promise<PrintPromiseModel>;
    DeletePromise(ulid: string | PrintPromiseModel): Promise<void>;
    UpdatePromise(ulid: string | PrintPromiseModel, options: { name?: string; printer?: string | PrinterModel; meta?: object; ppd_options?: object; status?: string }): Promise<void>;
    CreatePromise(options: { name: string; type: string; meta?: object; printer?: string | PrinterModel; available_printers?: (string | PrinterModel)[]; ppd_options?: object; content?: string; file_name?: string; headless?: boolean }): Promise<PrintPromiseModel>;
    CreateDialog(ulid: string | PrintPromiseModel, options?: { auto_print?: boolean; redirect_url?: string; restricted_ip?: string }): Promise<PrintDialogModel>;
    GetDialog(ulid: string | PrintPromiseModel): Promise<PrintDialogModel>;
    GetPromiseContent(ulid: string | PrintPromiseModel): Promise<string>;
    SetPromiseContent(ulid: string | PrintPromiseModel, content: string, file_name?: string): Promise<void>;
}