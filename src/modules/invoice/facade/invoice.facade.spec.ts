import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceFactory from "../factory/invoice.factory";

describe("InvoiceFacade test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([InvoiceModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a invoice", async () => {

        const facade = InvoiceFactory.create();

        const invoice = {
            name: "Invoice1",
            document: "10471823945",
            street: "Street1",
            number: "123",
            complement: "complement",
            city: "City",
            state: "PR",
            zipCode: "zip",
            items: [{
                id: "2",
                name: "item2",
                price: 100,
            },
            {
                id: "1",
                name: "item1",
                price: 90,
            }],
        }

        const result = await facade.generate(invoice);

        expect(result.id).toBeDefined();
        expect(result.document).toEqual("10471823945");
        expect(result.items[0].id).toEqual("2");
        expect(result.street).toEqual("Street1")
        expect(result.total).toEqual(190);

    })

    it("should find a invoice", async() => {

        const facade = InvoiceFactory.create();

        const generateInvoice = await InvoiceModel.create({
            id: "1",
            name: "Invoice1",
            document: "10471823945",
            street: "Street1",
            number: "123",
            complement: "complement",
            city: "City",
            state: "PR",
            zipCode: "zip",
            items: [{
                id: "2",
                name: "item2",
                price: 100,
            },
            {
                id: "1",
                name: "item1",
                price: 90,
            }],
            createdAt: new Date(),
            updatedAt: new Date(),
        })


        const invoiceFind = await facade.find({id: "1"});

        expect(invoiceFind.id).toEqual(generateInvoice.id);
        expect(invoiceFind.total).toEqual(190);
        expect(invoiceFind.items.length).toBe(2);

    })

})