import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import TermAcceptance from "./TermAcceptance";

@Table({ tableName: "Terms", timestamps: true })
export default class Terms extends Model {
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true })
    id!: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    content!: string;

    @Column({ type: DataType.DATE, allowNull: false })
    effectiveDate!: Date;

    @HasMany(() => TermAcceptance)
    termAcceptances!: TermAcceptance[];
}
