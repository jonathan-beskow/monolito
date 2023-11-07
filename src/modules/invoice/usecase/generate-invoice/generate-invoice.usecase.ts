import { number } from "yup";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceItems from "../../entity/invoice-items";
import InvoiceGateway from "../../gateway/Invoice.gateway";
import Address from "../../value-object/address";
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.dto";
import Invoice from "../../entity/invoice";
import Id from "../../../@shared/domain/value-object/id.value-object";

export default class GenerateInvoiceUseCase implements UseCaseInterface {

    constructor(private invoiceRepository: InvoiceGateway) { };

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {

        const address = new Address({
            street: input.street,
            number: input.number,
            complement: input.complement,
            city: input.city,
            state: input.state,
            zipCode: input.zipCode
        });

        const items = input.items.map((item) => {
            return new InvoiceItems({
                id: new Id(item.id),
                name: item.name,
                price: item.price,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
        })

        const invoice = new Invoice({
            name: input.name,
            document: input.document,
            address: address,
            items: items,
        });

        await this.invoiceRepository.generate(invoice);

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: address.street,
            number: address.number,
            complement: address.complement,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            items: invoice.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price
            })),
            total: invoice.total,
        }
    }
}
