import IUserRepository from "../../../repositories/IUserRepository";
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


export default class SendSecurityEmailUC {
    constructor(
        private userRepository:IUserRepository,
    ) {}

    async execute() : Promise<number> {
        const users = await this.userRepository.findAll();
        const emails = []

        users.forEach(element => {
            let email = this.sendEmail(element.email)
            if (email !== null) {
               emails.push(email) 
            }
        });

        if (emails.length == 0) throw new Error('Falha ao enviar emails')
        
        return emails.length;
    }

    sendEmail = async (email: String) => {
    try {
      const serviceId = 'service_kqomqwj';
      const templateId = 'template_qarf2lg';
      const userId = 'l5AVz2asaABljn9nL';
      const templateParams = {
        message: 'Nosso sistema foi atacado',
        to_email: `${email}`,
      };

      const result: EmailJSResponseStatus = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        userId
      );
      console.log(result);
      return email;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}