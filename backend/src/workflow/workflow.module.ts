import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { WorkflowService } from './workflow.service';
import { WorkflowProcessor } from './workflow.processor';
import { WorkflowController } from './workflow.controller';
import { ScriptModule } from '../script/script.module';
import { VoiceModule } from '../voice/voice.module';
import { ImageModule } from '../image/image.module';
import { VideoModule } from '../video/video.module';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'ai-workflow' }),
    ScriptModule,
    VoiceModule,
    ImageModule,
    VideoModule,
  ],
  controllers: [WorkflowController],
  providers: [WorkflowService, WorkflowProcessor],
})
export class WorkflowModule {}
