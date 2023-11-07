import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import { date } from "yup";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
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

    it("should create a product", async() => {

        const props = {
            id: new Id("1"),
            name: "Product 1",
            description: "Product description",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
        const product = new Product(props);
        const productRepository = new ProductRepository();
        await productRepository.add(product);

        const productDb = await ProductModel.findOne({where: {id: props.id.id}});

        expect(props.id.id).toEqual(productDb.id);
    })

    it("should find a product", async() => {

        const productRepository = new ProductRepository();

        ProductModel.create({
            id: "1",
            name: "Product 1",
            description: "Product description",
            purchasePrice: 100,
            stock: 10,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const product = await productRepository.find("1");

        expect(product.id.id).toEqual("1");

    })
})