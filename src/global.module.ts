import { Module } from '@nestjs/common';
import { sinistro_module } from './sinistro/sinistro.module';
import { processo_module } from './processo/processo.module'

@Module({
  imports: [sinistro_module, processo_module],
  controllers: [],
  providers: [],
})
export class Global_Module {}