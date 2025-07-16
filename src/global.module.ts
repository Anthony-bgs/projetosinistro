import { Module } from '@nestjs/common';
import { sinistro_module } from './sinistro/sinistro.module';

@Module({
  imports: [sinistro_module,],
  controllers: [],
  providers: [],
})
export class Global_Module {}