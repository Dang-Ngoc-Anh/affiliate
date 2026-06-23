import { Module } from '@nestjs/common';
import { ScriptController } from './script.controller';
import { ScriptService } from './script.service';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [AiModule],
  controllers: [ScriptController],
  providers: [ScriptService],
})
export class ScriptModule {}
