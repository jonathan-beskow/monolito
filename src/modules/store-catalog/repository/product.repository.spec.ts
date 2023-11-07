import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("ProductRepository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find all products", async () => {

        await ProductModel.create({
            id: "1",
            name: "Product1",
            description: "desc1",
            salesPrice: 100,
        })

        await ProductModel.create({
            id: "2",
            name: "Product2",
            description: "desc2",
            salesPrice: 200,
        })

        const productRepository = new ProductRepository();
        const products = await productRepository.findAll();

        expect(products.length).toBe(2);
        expect(products[0].id.id).toBe("1");
        expect(products[1].id.id).toBe("2");

    })

    it("should find a product", async() => {

        await ProductModel.create({
            id: "1",
            name: "Product1",
            description: "desc1",
            salesPrice: 100,
        })

        const productRepository = new ProductRepository();
        const products = await productRepository.find("1");

        expect(products.id.id).toBe("1");
    })
})