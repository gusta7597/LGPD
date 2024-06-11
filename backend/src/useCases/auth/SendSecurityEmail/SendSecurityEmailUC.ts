// import IUserRepository from "../../../repositories/IUserRepository";
// import nodemailer from 'nodemailer';
// import * as dotenv from 'dotenv'

// dotenv.config();

// export default class SendSecurityEmailUC {
//   constructor(
//     private userRepository: IUserRepository,
//   ) {}

//   async execute(): Promise<number> {
//     const users = await this.userRepository.findAll();
//     const emails = [];

//     for (const user of users) {
//       try {
//         const email = await this.sendEmail(user.email);
//         if (email !== null) {
//           console.log(`Email enviado para: ${email}`);
//           emails.push(email);
//         }
//       } catch (error) {
//         console.error(`Falha ao enviar email pra: ${user.email}`, error);
//       }
//     }

//     if (emails.length === 0) throw new Error('Falha ao enviar emails');

//     return emails.length;
//   }

//   sendEmail = async (email: string) => {
//     try {
//       const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//           user: `${process.env.SEND_EMAIL_USER}`,
//           pass: `${process.env.SEND_EMAIL_PASS}`,
//         },
//       });

//       const mailOptions = {
//         from: `${process.env.SEND_EMAIL_USER}`,
//         to: email,
//         subject: 'Alerta de Segurança',
//         text: `
//         Caro(a) cliente,

//         Esperamos que esta mensagem o encontre bem.

//         Gostaríamos de informá-lo sobre um incidente de segurança que ocorreu recentemente em nosso sistema. Infelizmente, identificamos que nosso sistema foi invadido e, como resultado, seus dados pessoais podem estar expostos.
        
//         Tenha um bom dia.`,
//       };

//       const result = await transporter.sendMail(mailOptions);
//       console.log(`EmailJS Response for ${email}:`, result);
//       return email;
//     } catch (error) {
//       console.error(`Error sending email to ${email}:`, error);
//       return null;
//     }
//   };
// }

import IUserRepository from "../../../repositories/IUserRepository";
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import fs from 'fs';
import util from 'util';
import connection from "../../../db/dbconfig"; // Importando a conexão do Sequelize

dotenv.config();

export default class SendSecurityEmailUC {
  constructor(
    private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<number> {
    try {
      // Converte fs.readFile para retornar uma Promise
      const readFile = util.promisify(fs.readFile);

      // Lê o arquivo de dump
      const dump = await readFile(`${process.env.BACKUP_DIR}/${process.env.FILE_NAME}`, 'utf8');

      // Conecte-se ao banco de dados
      await connection.authenticate();

      // Executa o conteúdo do dump no banco de dados
      await connection.query(dump);

      // Recupera os usuários do banco de dados restaurado
      const users = await this.userRepository.findAll();
      const emails = [];

      for (const user of users) {
        try {
          const email = await this.sendEmail(user.email);
          if (email !== null) {
            console.log(`Email enviado para: ${email}`);
            emails.push(email);
          }
        } catch (error) {
          console.error(`Falha ao enviar email para: ${user.email}`, error);
        }
      }

      if (emails.length === 0) throw new Error('Falha ao enviar emails');

      return emails.length;
    } catch (error) {
      console.error('Erro ao executar a função:', error);
      throw error;
    }
  }

  sendEmail = async (email: string) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: `${process.env.SEND_EMAIL_USER}`,
          pass: `${process.env.SEND_EMAIL_PASS}`,
        },
      });

      const mailOptions = {
        from: `${process.env.SEND_EMAIL_USER}`,
        to: email,
        subject: 'Alerta de Segurança',
        text: `
        Caro(a) cliente,

        Esperamos que esta mensagem o encontre bem.

        Gostaríamos de informá-lo sobre um incidente de segurança que ocorreu recentemente em nosso sistema. Infelizmente, identificamos que nosso sistema foi invadido e, como resultado, seus dados pessoais podem estar expostos.
        
        Tenha um bom dia.`,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log(`EmailJS Response for ${email}:`, result);
      return email;
    } catch (error) {
      console.error(`Error sending email to ${email}:`, error);
      return null;
    }
  };
}
