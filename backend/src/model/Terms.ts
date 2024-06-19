import { Model, Table, Column, DataType, HasMany } from "sequelize-typescript";
import TermCondition from "./TermCondition";
import TermAcceptance from "./TermAcceptance";

@Table({ tableName: "Term", timestamps: true })
export default class Term extends Model {
    @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.STRING(255), allowNull: false })
    title!: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    description!: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    active!: boolean;

    @HasMany(() => TermCondition)
    conditions!: TermCondition[];

    @HasMany(() => TermAcceptance, { constraints: false, onDelete: 'cascade' })
    acceptances!: TermAcceptance[];
}
