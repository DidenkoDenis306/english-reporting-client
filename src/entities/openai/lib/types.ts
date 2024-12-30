export interface OpenAIRequest {
  prompt: string;
  model?: string;
}

export interface OpenAIResponse {
  message: string;
}

// Тип для ошибок (опционально)
export interface OpenAIError {
  message: string;
  statusCode?: number;
}
