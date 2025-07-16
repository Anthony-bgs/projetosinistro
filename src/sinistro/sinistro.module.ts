import { Module } from '@nestjs/common';
import { sinistro_controller} from './sinistro.controller';
import { sinistro_service} from './sinistro.service';
import { DatabaseModule } from 'src/database/db.module';
import { sinistroprovider } from './sinistro.provider';
import { processo_service } from 'src/processo/processo.service';
import { processo_module } from 'src/processo/processo.module';
import { processoprovider } from 'src/processo/processo.provider';


@Module({
  imports: [DatabaseModule],
  controllers: [sinistro_controller],
  providers: [sinistro_service,processo_service,...sinistroprovider,...processoprovider],
})
export class sinistro_module {}
