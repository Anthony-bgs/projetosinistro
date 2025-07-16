import { Module } from '@nestjs/common';
import { sinistro_controller} from './sinistro.controller';
import { sinistro_service} from './sinistro.service';
import { DatabaseModule } from 'src/database/db.module';
import { sinistroprovider } from './sinistro.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [sinistro_controller],
  providers: [sinistro_service,...sinistroprovider,],
})
export class sinistro_module {}
