import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { ScriptService } from '../script/script.service';
import { VoiceService } from '../voice/voice.service';
import { ImageService } from '../image/image.service';
import { VideoService } from '../video/video.service';

@Processor('ai-workflow')
export class WorkflowProcessor extends WorkerHost {
  private readonly logger = new Logger(WorkflowProcessor.name);

  constructor(
    private readonly scriptService: ScriptService,
    private readonly voiceService: VoiceService,
    private readonly imageService: ImageService,
    private readonly videoService: VideoService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { topic, productInfo } = job.data;
    const scriptId = job.id || Date.now().toString();

    try {
      this.logger.log(`[Job ${job.id}] 1. Generating Script...`);
      await job.updateProgress(10);
      const script = await this.scriptService.generateTikTokScript(topic, productInfo);
      
      this.logger.log(`[Job ${job.id}] 2. Generating Voice...`);
      await job.updateProgress(40);
      const voicePath = await this.voiceService.generateVoice(script.content, scriptId);
      
      this.logger.log(`[Job ${job.id}] 3. Generating Images...`);
      await job.updateProgress(60);
      const imagePaths = await this.imageService.generateImages(script.description, scriptId);
      
      this.logger.log(`[Job ${job.id}] 4. Assembling Video...`);
      await job.updateProgress(80);
      const videoPath = await this.videoService.generateVideo(voicePath, imagePaths, scriptId);
      
      await job.updateProgress(100);
      this.logger.log(`[Job ${job.id}] Finished! Video path: ${videoPath}`);
      return { videoPath, script };
    } catch (error) {
      this.logger.error(`[Job ${job.id}] Failed: ${error.message}`);
      throw error;
    }
  }
}
