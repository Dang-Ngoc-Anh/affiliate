# Senior Developer Coding Guidelines

## 1. Core Philosophy
- **Readability is Paramount**: Code is read 10x more than it is written. We do not use "tà đạo" (hacky), overly clever, or cryptic one-liners. Write long, explicit, and easy-to-understand code.
- **No Magic**: Avoid magic strings, magic numbers, and implicit type conversions. Everything must be strongly typed and explicit.
- **Self-Healing Code**: Handle all possible edge cases. The code should not crash the entire server if an API or local AI model goes down; it should log the error, retry, or fail gracefully.

## 2. Strict TypeScript Standards
- **Zero `any` Tolerance**: Do not use `any`. Use `unknown` if the type is truly dynamic, and use Type Guards to narrow it down.
- **Explicit Return Types**: Every single function and method MUST have an explicit return type.
  ```typescript
  // BAD
  async generateScript(topic) { ... }

  // GOOD
  async generateScript(topic: TopicDto): Promise<ScriptEntity> { ... }
  ```
- **Strict Null Checks**: Always check for `null` or `undefined` before accessing nested properties.

## 3. NestJS Backend Architecture
- **Layered Separation**:
  - **Controllers**: Only handle HTTP requests/responses, route parameters, and pass validated DTOs to services. No business logic.
  - **Services**: Handle business logic. Must be injectable.
  - **Entities/Repositories**: Handle database interactions exclusively.
- **Validation**: 
  - Use `class-validator` and `class-transformer` for EVERY incoming request payload (DTO).
- **Dependency Injection**:
  - Never use `new ClassName()` inside a service if it can be injected via the constructor. This is critical for testing.

## 4. Documentation & Comments
- **Line-by-Line / Block Comments**: For complex algorithms (like AI prompting logic, FFMPEG command generation, or BullMQ event processing), provide detailed comments explaining *WHY* this approach was taken.
- **JSDoc/TSDoc**: All shared interfaces, classes, and complex methods must have JSDoc comments detailing inputs and outputs.
  ```typescript
  /**
   * Generates a TikTok script using the specified LLM provider.
   * Runs asynchronously via BullMQ to prevent HTTP timeout.
   * 
   * @param topicId - The UUID of the topic to generate content for
   * @returns A string containing the jobId for tracking
   */
  async queueScriptGeneration(topicId: string): Promise<string> { ... }
  ```

## 5. Frontend React Rules
- **Data Fetching**: NEVER use `useEffect` for data fetching. Use `React Query` (`@tanstack/react-query`) exclusively for caching, retries, and synchronization.
- **State Management**: Use `Zustand` for global state (e.g., UI themes, current active project). Keep component state local where possible.
- **Hooks**: Extract complex logic into custom hooks. A component should ideally just map data to JSX.

## 6. Error Handling & Logging
- **Custom Exceptions**: Throw meaningful HTTP exceptions (`NotFoundException`, `BadRequestException`).
- **Contextual Logging**: Use NestJS `Logger`. Always pass the context (e.g., class name or job ID).
  ```typescript
  this.logger.error(`Failed to generate video for script ${scriptId}`, error.stack, 'VideoService');
  ```
- **Queue Fallbacks**: All BullMQ jobs must have an explicitly defined `attempts` and `backoff` strategy. AI generations can randomly fail, so retry logic is mandatory.
