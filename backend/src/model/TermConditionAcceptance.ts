import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import TermCondition from "./TermCondition";
import TermAcceptance from "./TermAcceptance";

@Table({ tableName: "TermConditionAcceptance", timestamps: true })
export default class TermConditionAcceptance extends Model {
    @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
    id!: number;

    @ForeignKey(() => TermCondition)
    @Column({ type: DataType.INTEGER, allowNull: false })
    termConditionId!: number;

    @ForeignKey(() => TermAcceptance)
    @Column({ type: DataType.INTEGER, allowNull: false })
    termAcceptanceId!: number;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    accepted!: boolean;

    @BelongsTo(() => TermCondition, { constraints: false, onDelete: 'cascade' })
    termCondition!: TermCondition;

    @BelongsTo(() => TermAcceptance)
    termAcceptance!: TermAcceptance;
}
