import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../entity/invoice"
import InvoiceItems from "../../entity/invoice-items"
import Address from "../../value-object/address"
import FindInvoiceUseCase from "./find-invoice.usecase"

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
},

)
const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    }
}

describe("find a invoice use case unit test", () => {

    it("should find a invoice", async () => {

        const repository = MockRepository();
        const usecase = new FindInvoiceUseCase(repository);

        const input = {
            id: "1"
        }

        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.name).toEqual("Invoice1");
        expect(result.total).toEqual(190);
        
    })
})