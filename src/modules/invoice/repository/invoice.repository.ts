import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../entity/invoice";
import InvoiceItems from "../entity/invoice-items";
import InvoiceGateway from "../gateway/Invoice.gateway";
import Address from "../value-object/address";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {

    async find(id: string): Promise<Invoice> {
        
        const invoice = await InvoiceModel.findOne({
            where: {
                id,
            },
            rejectOnEmpty: true,
        });

        const address = new Address({
            street: invoice.street,
            number: invoice.number,
            complement: invoice.complement,
            city: invoice.city,
            state: invoice.state,
            zipCode: invoice.zipCode
        });

        return new Invoice({
            id: new Id(invoice.id), 
            name: invoice.name,
            document: invoice.document,
            address: address,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
            items: invoice.items.map((item) => {
                return new InvoiceItems({
                    id: new Id(item.id),
                    name: item.name,
                    price: item.price,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                })
            })
        })
    }


    async generate(input: Invoice): Promise<Invoice> {

        const address = new Address({
            street: input.address.street,
            number: input.address.number,
            complement: input.address.complement,
            city: input.address.city,
            state: input.address.state,
            zipCode: input.address.zipCode
        });

        const invoice = await InvoiceModel.create({
            id: input.id.id,
            name: input.name,
            document: input.document,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
            items: input.items.map((item) =>
                new InvoiceItems({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                })
            ),
            street: input.address.street,
            number: input.address.number,
            complement: input.address.complement,
            city: input.address.city,
            state: input.address.state,
            zipCode: input.address.zipCode,
        });

        return new Invoice({
            id: new Id(invoice.id), 
            name: invoice.name,
            document: invoice.document,
            address: address,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
            items: input.items.map((item) => {
                return new InvoiceItems({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    createdAt: item.createdAt,
                    updatedAt: item.updatedAt,
                })
            })
        })
    }
}





