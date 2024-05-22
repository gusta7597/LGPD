export default interface ICreateAdminDTO {
    id?: number;
    userName: string;
    fullName: string;
    cpf: string;
    email: string;
    password: string;
    active: boolean;
}