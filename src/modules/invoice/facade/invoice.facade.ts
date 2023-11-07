import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export interface UseCaseProps {
    findInvoice: FindInvoiceUseCase;
    generateInvoice: GenerateInvoiceUseCase;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {

    private _findInvoice: FindInvoiceUseCase;
    private _generateInvoice: GenerateInvoiceUseCase

    constructor(useCaseProps: UseCaseProps) {
        this._findInvoice = useCaseProps.findInvoice;
        this._generateInvoice = useCaseProps.generateInvoice;
    };

    async find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO> {
        return this._findInvoice.execute(input);
    }
    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return this._generateInvoice.execute(input);
    }
}

