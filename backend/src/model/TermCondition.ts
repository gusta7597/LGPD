import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import Term from "./Terms";

@Table({ tableName: "TermCondition", timestamps: true })
export default class TermCondition extends Model {
    @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    conditionText!: string;

    @ForeignKey(() => Term)
    @Column({ type: DataType.INTEGER, allowNull: false })
    termId!: number;

    @BelongsTo(() => Term)
    term!: Term;
}
