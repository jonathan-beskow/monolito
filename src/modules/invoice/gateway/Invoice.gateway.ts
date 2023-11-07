import Invoice from "../entity/invoice";

export default interface InvoiceGateway {

    find(id: string): Promise<Invoice>;
    generate(input: Invoice): Promise<Invoice>;
    
}