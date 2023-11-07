import ValueObject from "../../@shared/domain/value-object/value-object.interface";

type AddressProps = {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
}

export default class Address implements ValueObject {

    private _street: string;
    private _number: string;
    private _complement: string;
    private _city: string;
    private _state: string;
    private _zipCode: string;

    constructor(addressProps: AddressProps) {
        this._street = addressProps.street;
        this._number = addressProps.number;
        this._complement = addressProps.complement;
        this._city = addressProps.city;
        this._state = addressProps.state;
        this._zipCode = addressProps.zipCode;
    }

    get street(): string {
        return this._street;
    }

    get number(): string {
        return this._number;
    }

    get complement(): string {
        return this._complement;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state
    }

    get zipCode(): string {
        return this._zipCode
    }

    

}