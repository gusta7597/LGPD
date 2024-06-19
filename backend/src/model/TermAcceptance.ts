import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import Term from "./Terms";
import User from "./User";
import TermCondition from "./TermCondition";

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

    @ForeignKey(() => TermCondition)
    @Column({ type: DataType.INTEGER, allowNull: false })
    conditionId!: number;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    accepted!: boolean;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    active!: boolean;

    @BelongsTo(() => User)
    user!: User;

    @BelongsTo(() => Term)
    term!: Term;

    @BelongsTo(() => TermCondition)
    condition!: TermCondition;
}
