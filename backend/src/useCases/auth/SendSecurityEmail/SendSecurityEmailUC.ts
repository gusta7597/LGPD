import { Client } from 'pg';
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

dotenv.config();

export default class SendSecurityEmailUC {

  public async execute(): Promise<number> {
    let client: Client | null = null;
    
    try {
      client = new Client({
        user: process.env.POSTGRES_BACKUP_USER,
        host: process.env.POSTGRES_BACKUP_HOST,
        database: process.env.POSTGRES_BACKUP_DATABASE,
        password: process.env.POSTGRES_BACKUP_PASSWORD,
        port: Number(process.env.DB_PORT),
      });

      console.log("PostgreSQL client config:", {
        user: process.env.POSTGRES_BACKUP_USER,
        host: process.env.POSTGRES_BACKUP_HOST,
        database: process.env.POSTGRES_BACKUP_DATABASE,
        password: process.env.POSTGRES_BACKUP_PASSWORD,
        port: Number(process.env.DB_PORT),
      });

      await client.connect();
      console.log('Connected to PostgreSQL database');

      await this.restoreDatabaseFromBackup(client);

      const users = await this.findAllEmails(client);
      const emailsSent = await this.sendSecurityEmails(users);

      return emailsSent.length;
    } catch (error) {
      console.error('An error occurred:', error);
      throw new Error('Failed to execute the security email process');
    } finally {
      if (client) {
        await client.end();
        console.log('Disconnected from PostgreSQL database');
      }
    }
  }

  private async findAllEmails(client: Client): Promise<string[]> {
    try {
      const res = await client.query('SELECT email FROM "User"');
      return res.rows.map((row: any) => row.email);
    } catch (error) {
      console.error('Error querying PostgreSQL database:', error);
      throw new Error('Failed to query emails from PostgreSQL database');
    }
  }

  private async sendSecurityEmails(emails: string[]): Promise<string[]> {
    const successfulEmails: string[] = [];

    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SEND_EMAIL_USER,
          pass: process.env.SEND_EMAIL_PASS,
        },
      });

      for (const email of emails) {
        await this.sendEmail(transporter, email);
        successfulEmails.push(email);
      }

      return successfulEmails;
    } catch (error) {
      console.error('Error sending security emails:', error);
      throw new Error('Failed to send security emails');
    }
  }

  private async sendEmail(transporter: nodemailer.Transporter, email: string): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.SEND_EMAIL_USER,
        to: email,
        subject: 'Alerta de Segurança',
        text: `
          Caro(a) cliente,
          Esperamos que esta mensagem o encontre bem.
          Gostaríamos de informá-lo sobre um incidente de segurança que ocorreu recentemente em nosso sistema. Infelizmente, identificamos que nosso sistema foi invadido e, como resultado, seus dados pessoais podem estar expostos.
          Tenha um bom dia.`,
      };

      const result = await transporter.sendMail(mailOptions);
      console.log(`Email sent to ${email}:`, result);
    } catch (error) {
      console.error(`Error sending email to ${email}:`, error);
      throw new Error(`Failed to send email to ${email}`);
    }
  }

  private async restoreDatabaseFromBackup(client: Client): Promise<void> {
    const backupDir = process.env.BACKUP_DIR;

    if (!backupDir) {
      throw new Error('Backup directory not specified in environment variables');
    }

    const files = fs.readdirSync(backupDir)
      .filter(file => file.endsWith('.sql'))
      .sort((a, b) => {
        const aDate = new Date(a.split('-')[1].replace('.sql', ''));
        const bDate = new Date(b.split('-')[1].replace('.sql', ''));
        return bDate.getTime() - aDate.getTime();
      });

    if (files.length < 3) {
      throw new Error('Not enough backup files to restore');
    }

    const fileToRestore = files[2]; // Antepenúltimo arquivo
    const filePath = path.join(backupDir, fileToRestore);

    console.log(`Restoring database from file: ${filePath}`);

    const command = `PGPASSWORD="${process.env.POSTGRES_BACKUP_PASSWORD}" pg_restore --clean --if-exists --no-owner -h ${process.env.POSTGRES_BACKUP_HOST} -p ${process.env.DB_PORT} -U ${process.env.POSTGRES_BACKUP_USER} -d ${process.env.POSTGRES_BACKUP_DATABASE} -v ${filePath}`;

    await new Promise<void>((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error restoring database from file ${filePath}:`, stderr);
          reject(new Error('Failed to restore database'));
        } else {
          console.log(`Database restored successfully from file ${filePath}:`, stdout);
          resolve();
        }
      });
    });
  }
}