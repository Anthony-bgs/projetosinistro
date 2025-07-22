import { Injectable } from '@nestjs/common';
import axios from 'axios';






@Injectable()
export class ZapService {
    constructor() { }

    async sendWhatsappMessage(numero: string, mensagem: string) {
        const token = '';
        const url = `https://graph.facebook.com/v19.0/${phoneNumberId}/messages`;
        await axios.post(
            url,
            {
                messaging_product: 'whatsapp',
                to: numero, // Ex: '5511999999999'
                type: 'text',
                text: { body: mensagem },
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
    }
}