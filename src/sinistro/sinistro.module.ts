import { Module } from '@nestjs/common';
import { Sinistro_Controller} from './sinistro.controller';
import { Sinistro_Service} from './sinistro.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sinistro_Schema } from './sinistro.schema';
import { EmailService } from 'src/comunicacao/email.service';
import { ZapService } from 'src/comunicacao/zap.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Sinistro', schema: Sinistro_Schema }]),
  ],
  controllers: [Sinistro_Controller],
  providers: [Sinistro_Service, EmailService,ZapService],
  exports: [Sinistro_Service, MongooseModule],
})
export class Sinistro_Module {}