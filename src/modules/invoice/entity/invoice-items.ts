import { implementHookDecorator } from "sequelize-typescript";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import Address from "../value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";

type InvoiceItemsProps = {
    id: Id;
    name: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}

export default class InvoiceItems extends BaseEntity implements AggregateRoot {

    private _name: string;
    private _price: number;

    constructor(invoiceItemProps: InvoiceItemsProps) {
        super(invoiceItemProps.id);
        this._name = invoiceItemProps.name;
        this._price = invoiceItemProps.price;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price
    }
}

