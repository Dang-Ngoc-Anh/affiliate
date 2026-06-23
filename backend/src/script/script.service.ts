import { Injectable, Inject, Logger } from '@nestjs/common';
import { LLMProvider } from '../ai/interfaces/llm-provider.interface';

@Injectable()
export class ScriptService {
  private readonly logger = new Logger(ScriptService.name);

  constructor(
    @Inject('LLMProvider') private readonly aiProvider: LLMProvider,
  ) {}

  async generateTikTokScript(topic: string, productInfo: string): Promise<any> {
    this.logger.log(`Start generating script for topic: ${topic}`);

    const systemPrompt = `You are an expert TikTok scriptwriter. Write engaging, fast-paced scripts optimized for short-form video. The hook must capture attention in the first 3 seconds.`;
    
    const prompt = `Topic: ${topic}
Product Information: ${productInfo}

Please generate a TikTok script with the following fields:
- title: A catchy title
- hook: The opening line to grab attention (first 3s)
- content: The main spoken script
- description: The caption for the TikTok video including hashtags`;

    // Using the local free AI via our provider to generate JSON
    const scriptJson = await this.aiProvider.generateJson<{
      title: string;
      hook: string;
      content: string;
      description: string;
    }>(prompt, systemPrompt);

    this.logger.log(`Script generated successfully!`);
    return scriptJson;
  }
}
