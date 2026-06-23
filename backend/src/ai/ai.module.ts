import { Module } from '@nestjs/common';
import { QwenProvider } from './providers/qwen.provider';

@Module({
  providers: [
    {
      provide: 'LLMProvider',
      useClass: QwenProvider,
    },
    QwenProvider,
  ],
  exports: ['LLMProvider'],
})
export class AiModule {}
