import Id from "../../../@shared/domain/value-object/id.value-object"
import Client from "../../domain/client.entity"
import FindClientUseCase from "./find-client.usecase"

const client = new Client({
    id: new Id("1"),
    name: "client1",
    email: "x@x.com",
    address: "Address1"
    
})

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client)),
    }
}

describe("Find Client Usecase unit test", () => {

    it("should find a client", async () => {

        const repository = MockRepository();
        const usecase = new FindClientUseCase(repository);

        const input = {
           id: "1",
        }

        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toEqual(input.id);
    })
})