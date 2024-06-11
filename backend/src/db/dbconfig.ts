// import { Sequelize } from "sequelize-typescript";
// import User from "../model/User";
// import Profile from "../model/Profile";

// import * as dotenv from "dotenv";
// import TermAcceptance from "../model/TermAcceptance";
// import Terms from "../model/Terms";

// dotenv.config();

// const connection = new Sequelize(
//     `${process.env.POSTGRES_DATABASE}`,
//     `${process.env.POSTGRES_USER}`,
//     `${process.env.POSTGRES_PASSWORD}`,
//     {
//         dialect: "postgres",
//         host: `${process.env.POSTGRES_HOST}`,
//         port: 5432,
//         models: [ User, Profile, TermAcceptance, Terms ]
//     }
// )

// export default connection;

import { Sequelize } from "sequelize-typescript";
import User from "../model/User";
import Profile from "../model/Profile";
import * as dotenv from "dotenv";
import TermAcceptance from "../model/TermAcceptance";
import Terms from "../model/Terms";

dotenv.config();

// Log para depuração
console.log("Database Config:", {
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
});

const connection = new Sequelize(
  `${process.env.POSTGRES_DATABASE}`,
  `${process.env.POSTGRES_USER}`,
  `${process.env.POSTGRES_PASSWORD}`,
  {
    dialect: "postgres",
    host: `${process.env.POSTGRES_HOST}`,
    port: 5432,
    models: [User, Profile, TermAcceptance, Terms],
  }
);

export default connection;
