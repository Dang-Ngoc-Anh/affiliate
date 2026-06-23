import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class WorkflowService {
  constructor(@InjectQueue('ai-workflow') private workflowQueue: Queue) {}

  async startWorkflow(topic: string, productInfo: string) {
    const job = await this.workflowQueue.add('generate-content', { topic, productInfo });
    return { jobId: job.id };
  }

  async getJobStatus(jobId: string) {
    const job = await this.workflowQueue.getJob(jobId);
    if (!job) return { status: 'not_found' };
    
    const state = await job.getState();
    const progress = job.progress;
    const returnvalue = job.returnvalue;
    
    return { jobId: job.id, status: state, progress, result: returnvalue };
  }
}
