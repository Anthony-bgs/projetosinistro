import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ZapService } from './zap.service';

@Module({
  providers: [EmailService, ZapService],
  exports: [EmailService, ZapService],
})
export class ComunicacaoModule {}
