# AI Autonomous Setup & Deployment Workflow

This workflow acts as the "brain map" for an autonomous AI agent to deploy the Content Factory project from scratch, including setup, auto-fixing, and continuous execution.

## Phase 1: Environment & Infrastructure Bootstrapping
**Objective**: Set up the base containers and dependencies.
1. **Initialize Docker**: 
   - The AI generates `docker-compose.yml` incorporating PostgreSQL, Redis, Qdrant, vLLM/Ollama, ComfyUI, GPT-SoVITS, and Whisper.
   - Run `docker-compose up -d`.
   - **Auto-Fix**: If a port is bound, the AI parses the error, updates the port in `.env`, and retries.
2. **Database Init**: 
   - Wait for Postgres to be healthy.

## Phase 2: Backend Scaffolding (NestJS)
**Objective**: Create the core API and queue workers.
1. **Scaffold**: `npx @nestjs/cli new backend --strict --package-manager npm --skip-git`
2. **Dependencies**: `npm install @nestjs/typeorm typeorm pg @nestjs/bullmq bullmq class-validator class-transformer`
3. **Module Generation**:
   - The AI sequentially generates: `Project`, `Topic`, `Script`, `Voice`, `Image`, `Video`, `Workflow`.
   - Implement `DATABASE_DESIGN.md` using TypeORM entities.
4. **Validation/Auto-Fix Loop**:
   - After writing each module, the AI runs `npx tsc --noEmit`.
   - If TypeErrors occur, the AI reads the exact file and line, fixes the typings, and reruns until clean.

## Phase 3: AI Abstraction Layer
**Objective**: Implement swappable LLM Providers.
1. Create `LLMProvider` interface (methods: `generateText`, `generateJson`, `summarize`).
2. Implement `QwenProvider` (local via Ollama/vLLM) and `DeepSeekProvider`.
3. Set up BullMQ processors to handle AI tasks asynchronously.

## Phase 4: Frontend Scaffolding (React)
**Objective**: Build the user interface.
1. **Scaffold**: `npm create vite@latest frontend -- --template react-ts`
2. **Dependencies**: `npm install antd @ant-design/icons @tanstack/react-query zustand axios`
3. **Integration**: Connect to NestJS API.
4. **Validation**: Run `npm run build` to ensure strict typing holds up.

## The Auto-Fixing Protocol (Self-Healing)
For every command executed, the agent MUST follow this loop:
1. **Run Command**: Execute script or compiler.
2. **Check Exit Code**: If `0`, proceed. If `>0`, enter Auto-Fix mode.
3. **Parse Error**: Extract line numbers and error types.
4. **Apply Fix**: Refactor the code adhering strictly to `SENIOR_CODING_GUIDELINES.md`. Never use `// @ts-ignore` or `any` to bypass errors.
5. **Retry**: Run the command again until successful.
