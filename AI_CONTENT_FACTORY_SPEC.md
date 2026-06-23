# AI Content Factory - Technical Specification

## Goal

Build a fully local AI-powered content production system capable of generating at least 5 TikTok affiliate videos per day.

The system must run on local infrastructure and minimize dependency on paid APIs.

---

# Functional Requirements

## Content Generation

Input:

- Product URL
- Product Information
- Topic
- Campaign

Output:

- Title
- Hook
- Script
- Description
- Hashtags

The generated script should be optimized for TikTok short-form content.

---

## Voice Generation

Input:

- Script
- Voice Profile

Output:

- MP3 voiceover

Requirements:

- Support local voice cloning
- No cloud dependency

Preferred technologies:

- GPT-SoVITS
- XTTS-v2

---

## Image Generation

Input:

- Script
- Product Information

Output:

- AI-generated images

Requirements:

- Local generation
- Support prompt templates
- Reusable style presets

Preferred technologies:

- ComfyUI
- Flux

---

## Subtitle Generation

Input:

- Voiceover

Output:

- SRT subtitles

Preferred technologies:

- Whisper

---

## Video Generation

Input:

- Images
- Voice
- Subtitle

Output:

- MP4 video

Requirements:

- 1080x1920
- TikTok format
- Auto subtitle animation

Preferred technologies:

- FFmpeg
- Remotion

---

# Architecture

Frontend:

React
Ant Design

Backend:

NestJS

Database:

PostgreSQL

Queue:

BullMQ

Cache:

Redis

AI Workflow:

LangGraph

Vector Database:

Qdrant

Local LLM:

Qwen3

Inference Engine:

vLLM

---

# AI Workflow

Workflow:

ResearchAgent
->
ScriptAgent
->
VoiceAgent
->
ImageAgent
->
SubtitleAgent
->
VideoAgent
->
PublishingAgent

Each agent must be independently executable.

---

# Database Design

## projects

id
name
status

## topics

id
projectId
title
description

## scripts

id
topicId
content

## voices

id
name
modelPath

## generated_images

id
scriptId
filePath

## videos

id
scriptId
filePath
status

---

# API Design

POST /topics

POST /scripts/generate

POST /voice/generate

POST /images/generate

POST /subtitle/generate

POST /video/generate

GET /videos

---

# AI Model Requirements

Default model:

Qwen3

Fallback models:

DeepSeek
Llama

All models must be replaceable via configuration.

---

# Infrastructure

Docker Compose

Services:

postgres
redis
nestjs
qdrant
vllm
comfyui
gpt-sovits
whisper

All services must be containerized.

---

# Development Roadmap

Phase 1

- NestJS setup
- PostgreSQL
- Redis
- BullMQ

Phase 2

- Ollama integration
- Qwen integration
- Script generation

Phase 3

- GPT-SoVITS integration
- Voice generation

Phase 4

- ComfyUI integration
- Image generation

Phase 5

- Whisper integration
- Subtitle generation

Phase 6

- FFmpeg integration
- Video generation

Phase 7

- TikTok publishing workflow

---

# Success Criteria

The system is considered complete when:

- Generate 5 videos/day automatically
- Run completely on local infrastructure
- No dependency on OpenAI API
- Average video generation time under 10 minutes
- Support horizontal scaling for future workloads
