import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { WorkflowService } from './workflow.service';

@Controller('workflow')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Post('start')
  async start(@Body() body: { topic: string; productInfo: string }) {
    return this.workflowService.startWorkflow(body.topic, body.productInfo);
  }

  @Get('status/:id')
  async getStatus(@Param('id') id: string) {
    return this.workflowService.getJobStatus(id);
  }
}
