import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import StoreCatalogFacadeFactory from "../factory/facade.factory";

describe ("StoreCatalogFacade test", () => {

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

    it("should find a product", async () => {

        const facade = StoreCatalogFacadeFactory.create();

        await ProductModel.create({
            id: "1",
            name: "Product1",
            description: "desc1",
            salesPrice: 100,
        });

        const result = await facade.find({id: "1"});

        expect(result.id).toBe("1");
    })

    it("should find all products", async() => {

        const facade = StoreCatalogFacadeFactory.create();

        await ProductModel.create({
            id: "1",
            name: "Product1",
            description: "desc1",
            salesPrice: 100,
        });

        await ProductModel.create({
            id: "2",
            name: "Product2",
            description: "desc2",
            salesPrice: 200,
        });

        const result = await facade.findAll();

        expect(result.products.length).toBe(2);
        expect(result.products[0].id).toBe("1");
        expect(result.products[1].id).toBe("2");

    })

})