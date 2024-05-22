import { Model, Table, Column, DataType, HasOne } from "sequelize-typescript";
import Profile from "./Profile";

@Table({ tableName: "User", timestamps: true })
export default class User extends Model {
    @Column({ type: DataType.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true })
    id!: number;

    @Column({ type: DataType.STRING(16), allowNull: true })
    userName?: string;

    @Column({ type: DataType.STRING(50), allowNull: false })
    fullName!: string;

    @Column({ type: DataType.STRING(18), allowNull: false })
    cpf!: string;

    @Column({ type: DataType.STRING(150), allowNull: false })
    email!: string;

    @Column({ type: DataType.STRING(64), allowNull: false })
    password!: string;

    @Column({ type: DataType.BOOLEAN, allowNull: false })
    active!: boolean;

    @HasOne(() => Profile, { constraints: false, onDelete: 'cascade' })
    profile!: Profile;
}