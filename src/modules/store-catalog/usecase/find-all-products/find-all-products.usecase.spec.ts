import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import FindAllProductsUseCase from "./find-all-products.usecase";

const product = new Product({
    id: new Id("1"),
    name: "Product1",
    description: "descrption1",
    salesPrice: 100,
});

const product2 = new Product({
    id: new Id("2"),
    name: "Product2",
    description: "descrption2",
    salesPrice: 100,
});

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product, product2])),
    }
}

describe("find all products usecase unit test", () => {

    it("should find all products", async () => {
        const productRepository = MockRepository();
        const usecase = new FindAllProductsUseCase(productRepository);

        const result = await usecase.execute();

        expect(productRepository.findAll).toHaveBeenCalled();
        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe("1");
        expect(result.products[1].id).toBe("2");
    })

})
