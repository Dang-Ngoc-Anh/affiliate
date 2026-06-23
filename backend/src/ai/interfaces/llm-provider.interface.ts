export interface LLMProvider {
  /**
   * Generates a raw string response from the AI.
   * @param prompt User's prompt
   * @param systemPrompt Optional system instruction
   */
  generateText(prompt: string, systemPrompt?: string): Promise<string>;

  /**
   * Generates a JSON response from the AI.
   * @param prompt User's prompt
   * @param systemPrompt Optional system instruction
   */
  generateJson<T>(prompt: string, systemPrompt?: string): Promise<T>;

  /**
   * Summarizes the provided text.
   * @param text Text to summarize
   */
  summarize(text: string): Promise<string>;
}
