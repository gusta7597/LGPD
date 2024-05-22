import { Model, Table, Column, DataType, HasMany, ForeignKey } from "sequelize-typescript";
import User from "./User";

@Table({ tableName: "Profile", timestamps: false })
export default class Profile extends Model {
    @Column({ type: DataType.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true })
    id!: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name!: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    type!: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId!: number;
}