import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import Invoice from "../entity/invoice";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../value-object/address";
import InvoiceItems from "../entity/invoice-items";

describe("InvoiceRepository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([InvoiceModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a invoice", async () => {

        const invoiceItem1 = new InvoiceItems({
            id: new Id("1"),
            name: "item1",
            price: 90,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        
        const invoiceItem2 = new InvoiceItems({
            id: new Id("2"),
            name: "item2",
            price: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        
        const address = new Address({
            street: "Street1",
            number: "123",
            complement: "complement",
            city: "City",
            state: "PR",
            zipCode: "zip"
        });
        
        const invoice = new Invoice({
            id: new Id("1"),
            name: "Invoice1",
            document: "10471823945",
            address: address,
            items: [invoiceItem1, invoiceItem2],
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const repository = new InvoiceRepository();
        const generateInvoice = await repository.generate(invoice);

        expect(generateInvoice.id.id).toEqual("1"),
        expect(generateInvoice.items.length).toBe(2),
        expect(generateInvoice.name).toEqual("Invoice1");
    })

    it("should find a invoice", async () => {

        const invoiceItem1 = new InvoiceItems({
            id: new Id("1"),
            name: "item1",
            price: 90,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        
        const invoiceItem2 = new InvoiceItems({
            id: new Id("2"),
            name: "item2",
            price: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        
        const address = new Address({
            street: "Street1",
            number: "123",
            complement: "complement",
            city: "City",
            state: "PR",
            zipCode: "zip"
        });
        
        const invoice = new Invoice({
            id: new Id("1"),
            name: "Invoice1",
            document: "10471823945",
            address: address,
            items: [invoiceItem1, invoiceItem2],
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const repository = new InvoiceRepository();
        const generateInvoice = await repository.generate(invoice);

        const findInvoice = await repository.find(generateInvoice.id.id);

        expect(findInvoice.id.id).toEqual("1");
        expect(findInvoice.createdAt).toEqual(findInvoice.createdAt);
        expect(findInvoice.items.length).toBe(2);
    })
})