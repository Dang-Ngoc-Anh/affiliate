import { Controller, Post, Body } from '@nestjs/common';
import { ScriptService } from './script.service';

export class GenerateScriptDto {
  topic: string;
  productInfo: string;
}

@Controller('scripts')
export class ScriptController {
  constructor(private readonly scriptService: ScriptService) {}

  @Post('generate')
  async generate(@Body() body: GenerateScriptDto) {
    return this.scriptService.generateTikTokScript(body.topic, body.productInfo);
  }
}
