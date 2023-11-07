import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("ClientRepository test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should find a client", async() => {

        const client = await ClientModel.create({
            id: "1",
            name: "Client1",
            email: "x@x.com",
            address: "Address 1",
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        const repository = new ClientRepository();
        const result = await repository.find(client.id);

        expect(result.id.id).toEqual(client.id);
    })

    it("should create a client", async () => {

        const client = new Client({
            id: new Id("1"),
            name: "Client1",
            email: "x@x.com",
            address: "Address 1",
        })

        const repository = new ClientRepository();
        await repository.add(client);

        const clientDb = await ClientModel.findOne({where: {id: "1"}});

        expect(clientDb).toBeDefined();
        expect(clientDb.id).toEqual(client.id.id);
    })


})
