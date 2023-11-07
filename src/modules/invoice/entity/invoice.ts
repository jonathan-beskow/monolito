import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../value-object/address";
import InvoiceItems from "./invoice-items";

type InvoiceProps = {
    id?: Id;
    name: string;
    document: string;
    createdAt?: Date;
    updatedAt?: Date;
    address: Address;
    items: InvoiceItems[];
}



export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _document: string;
    private _address: Address;
    private _items: InvoiceItems[];

    constructor(invoiceProps: InvoiceProps) {
        super(invoiceProps.id);
        this._name = invoiceProps.name;
        this._document = invoiceProps.document;
        this._address = invoiceProps.address;
        this._items = invoiceProps.items;
    }

    get name(): string {
        return this._name;
    }

    get document(): string {
        return this._document;
    }

    get address(): Address {
        return this._address;
    }

    get items(): InvoiceItems[] {
        return this._items;
    }

    get total() {
        let total = 0;
        this._items.forEach((item) => {
          total = total + item.price;
        });
    
        return total;
      }
}
