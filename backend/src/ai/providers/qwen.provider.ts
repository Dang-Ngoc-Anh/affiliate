import { Injectable, Logger } from '@nestjs/common';
import { LLMProvider } from '../interfaces/llm-provider.interface';

@Injectable()
export class QwenProvider implements LLMProvider {
  private readonly logger = new Logger(QwenProvider.name);
  private readonly ollamaUrl = 'http://localhost:11434/api/generate';
  private readonly modelName = 'qwen3:8b';

  async generateText(prompt: string, systemPrompt?: string): Promise<string> {
    this.logger.log(`Generating text with ${this.modelName}...`);
    
    const response = await fetch(this.ollamaUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.modelName,
        prompt: prompt,
        system: systemPrompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(`Ollama Error: ${errorText}`);
      throw new Error(`Failed to generate text from Qwen: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  }

  async generateJson<T>(prompt: string, systemPrompt?: string): Promise<T> {
    this.logger.log(`Generating JSON with ${this.modelName}...`);
    
    // Add instruction to force JSON format
    const enforcedPrompt = prompt + '\n\nPlease return strictly in JSON format. Do not include markdown code blocks or any other text.';
    
    const response = await fetch(this.ollamaUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.modelName,
        prompt: enforcedPrompt,
        system: systemPrompt,
        format: 'json', // Ollama supports native JSON mode
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(`Ollama Error: ${errorText}`);
      throw new Error(`Failed to generate JSON from Qwen`);
    }

    const data = await response.json();
    try {
      return JSON.parse(data.response) as T;
    } catch (e) {
      this.logger.error(`Failed to parse JSON response: ${data.response}`);
      throw new Error('AI did not return valid JSON');
    }
  }

  async summarize(text: string): Promise<string> {
    const systemPrompt = 'You are a precise summarization assistant.';
    const prompt = `Summarize the following text:\n\n${text}`;
    return this.generateText(prompt, systemPrompt);
  }
}
