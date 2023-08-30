import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Admin } from '../admin/models/admin.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  // async sendCustomerConfirmation(customer: Customer): Promise<void> {
  //   const url = `${process.env.API_HOST}/api/customer/activate/${customer.activation_link}`;
  //   console.log(url);
  //   await this.mailerService.sendMail({
  //     to: customer.email,
  //     subject: 'Welcome to CleaningService App! Confirm your Email.',
  //     template: './confirmation',
  //     context: {
  //       name: customer.first_name,
  //       url,
  //     },
  //   });
  // }

  async sendAdminConfirmation(admin: Admin): Promise<void> {
    const url = `${process.env.API_HOST}/api/admin/activate/${admin.activation_link}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: admin.email,
      subject: 'Welcome to E-LIBRARY App! Confirm your Email.',
      template: './confirmation',
      context: {
        name: admin.first_name,
        url,
      },
    });
  }

}
