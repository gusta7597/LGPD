import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import User from "./User";
import Terms from "./Terms";

@Table({ tableName: "TermAcceptance", timestamps: true })
export default class TermAcceptance extends Model {
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true })
    id!: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId!: number;

    @ForeignKey(() => Terms)
    @Column({ type: DataType.INTEGER, allowNull: false })
    termsId!: number;

    @Column({ type: DataType.DATE, allowNull: false })
    acceptedAt!: Date;

    @BelongsTo(() => User)
    user!: User;

    @BelongsTo(() => Terms)
    terms!: Terms;
}
