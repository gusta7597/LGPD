import express from 'express';
import connection from './db/dbconfig';
import dotenv from 'dotenv';
import { json, urlencoded } from 'body-parser';
import UserRoutes from './routes/UserRoutes';
import AuthRoutes from './routes/AuthRoutes';
import cors from 'cors';
import CheckToken from './routes/utils/CheckToken';

export const app = express();

dotenv.config();

app.use(cors({
    origin: '*'
}));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use('/user', CheckToken, UserRoutes);
app.use('/auth', CheckToken, AuthRoutes);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).json({ message: err.message });
});

console.log("Tentando sincronizar com banco de dados... ");
connection.sync({ alter: true }).then(() => {
    console.log("Banco de dados conectado com sucesso!");
}).catch((err) => {
    console.log("[ ERR ]", err);
});