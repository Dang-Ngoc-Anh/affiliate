import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiModule } from './ai/ai.module';
import { ScriptModule } from './script/script.module';
import { WorkflowModule } from './workflow/workflow.module';
import { VoiceModule } from './voice/voice.module';
import { ImageModule } from './image/image.module';
import { VideoModule } from './video/video.module';
import { Project } from './project/entities/project.entity';
import { Topic } from './topic/entities/topic.entity';
import { Script } from './script/entities/script.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password',
      database: 'aifactory',
      entities: [Project, Topic, Script],
      synchronize: true, // Set to true for dev auto-migration
    }),
    BullModule.forRoot({
      connection: { host: 'localhost', port: 6379 },
    }),
    AiModule,
    ScriptModule,
    WorkflowModule,
    VoiceModule,
    ImageModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
