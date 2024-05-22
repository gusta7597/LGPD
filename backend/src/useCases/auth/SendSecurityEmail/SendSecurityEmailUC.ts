import IUserRepository from "../../../repositories/IUserRepository";
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv'

dotenv.config();

export default class SendSecurityEmailUC {
  constructor(
    private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<number> {
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
        console.error(`Falha ao enviar email pra: ${user.email}`, error);
      }
    }

    if (emails.length === 0) throw new Error('Falha ao enviar emails');

    return emails.length;
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
        text: 'Nosso sistema foi atacado',
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
