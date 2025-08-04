import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuditoriaSchema } from './auditoria.schema';
import { AuditoriaService } from './auditoria.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Auditoria', schema: AuditoriaSchema }]),
  ],
  providers: [AuditoriaService],
  exports: [AuditoriaService, MongooseModule],
})
export class AuditoriaModule {}
