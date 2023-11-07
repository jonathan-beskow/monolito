import { Model } from "sequelize-typescript";
import { Column, DataType, PrimaryKey, Table } from "sequelize-typescript";

interface InvoiceItem {
    id: string;
    name: string;
    price: number;
    createdAt: Date;
    updatedAt: Date;
};

@Table({tableName: "invoices", timestamps: false})
export default class InvoiceModel extends Model {

    @PrimaryKey
    @Column({allowNull: false})
    id: string;
    @Column({allowNull: false})
    name: string;
    @Column({allowNull: false})
    document: string;
    @Column({allowNull: false})
    createdAt: Date;
    @Column({allowNull: false})
    updatedAt: Date;
    @Column({allowNull: false, type: DataType.JSON})
    items: InvoiceItem[]; 
    @Column({allowNull: false})  
    street: string;
    @Column({allowNull: false})
    number: string;
    @Column({allowNull: false})
    complement: string;
    @Column({allowNull: false})
    city: string;
    @Column({allowNull: false})
    state: string;
    @Column({allowNull: false})
    zipCode: string;
}