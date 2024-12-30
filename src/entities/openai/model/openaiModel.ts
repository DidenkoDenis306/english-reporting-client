import { openaiClient } from '../api/openaiClient';
import {
  DEFAULT_OPENAI_MODEL,
  OpenAIRequest,
  OpenAIResponse,
} from 'entities/openai/lib';

export class OpenAIModel {
  static async createRequest({
    prompt,
    model = DEFAULT_OPENAI_MODEL,
  }: OpenAIRequest): Promise<OpenAIResponse> {
    try {
      const response = await openaiClient.chat.completions.create({
        model,
        messages: [
          {
            role: 'system',
            content: prompt,
          },
        ],
      });

      return {
        message: response.choices[0]?.message?.content || '',
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to process OpenAI request');
    }
  }
}
