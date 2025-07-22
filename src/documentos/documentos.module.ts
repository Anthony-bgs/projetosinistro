import { Module } from '@nestjs/common';
import { DocumentosController } from './documentos.controller';
import { DocumentosService } from './documentos.service';
import { ZapService } from 'src/comunicacao/zap.service';

@Module({
  controllers: [DocumentosController],
  providers: [DocumentosService],
  exports: [DocumentosService]
})
export class DocumentosModule {}
