import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string){
    const info = await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
    });
    return info; // Retorna informações do envio
  }

}