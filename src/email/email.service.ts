import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // ou 'hotmail', 'outlook', etc.
      auth: {
        user: '',      // coloque seu e-mail real aqui
        pass: '', // use senha de app, não a senha normal do Gmail
      },
    });
  }

  async sendMail(to: string, subject: string, text: string){
    const info = await this.transporter.sendMail({
      from: '"Sistema Sinistro" <>',
      to,
      subject,
      text, 
    });
    return info; // Retorna informações do envio
  }

}