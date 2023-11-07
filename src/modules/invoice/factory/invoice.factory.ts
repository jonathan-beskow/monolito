
import InvoiceFacade from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";


export default class InvoiceFactory {

    static create(): InvoiceFacade {
        const invoiceRepository = new InvoiceRepository();
        const findInvoice = new FindInvoiceUseCase(invoiceRepository);
        const generateInvoice = new GenerateInvoiceUseCase(invoiceRepository);

        const facade = new InvoiceFacade({
            generateInvoice: generateInvoice, 
            findInvoice: findInvoice});

        return facade;
    }
}