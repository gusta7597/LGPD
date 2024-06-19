import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import Term from "./Terms";
import User from "./User";
import TermConditionAcceptance from "./TermConditionAcceptance";

@Table({ tableName: "TermAcceptance", timestamps: true })
export default class TermAcceptance extends Model {
    @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
    id!: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId!: number;

    @ForeignKey(() => Term)
    @Column({ type: DataType.INTEGER, allowNull: false })
    termId!: number;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    accepted!: boolean;

    @BelongsTo(() => User)
    user!: User;

    @BelongsTo(() => Term)
    term!: Term;

    @HasMany(() => TermConditionAcceptance)
    conditionAcceptances!: TermConditionAcceptance[];
}
