# Architecture

## Overview

The system is a local-first AI Content Factory.

Purpose:

Generate TikTok affiliate videos automatically.

Pipeline:

Topic
→ Research
→ Script
→ Voice
→ Images
→ Subtitle
→ Video
→ Publish

---

# Tech Stack

Frontend

- React
- Vite
- Ant Design
- React Query
- Zustand

Backend

- NestJS
- PostgreSQL
- Redis
- BullMQ

AI

- Qwen3
- DeepSeek
- vLLM

Voice

- GPT-SoVITS

Image

- ComfyUI
- Flux

Subtitle

- Whisper

Video

- FFmpeg

Deployment

- Docker Compose

---

# Services

Frontend

Port: 3000

Backend

Port: 8080

PostgreSQL

Port: 5432

Redis

Port: 6379

Qdrant

Port: 6333

vLLM

Port: 8000

ComfyUI

Port: 8188

GPT-SoVITS

Port: 9880

Whisper

Port: 9000

---

# Backend Modules

AuthModule

ProjectModule

TopicModule

ScriptModule

VoiceModule

ImageModule

SubtitleModule

VideoModule

PublishingModule

WorkflowModule

AgentModule

---

# Workflow

Create Topic

↓

Research Agent

↓

Script Agent

↓

Voice Agent

↓

Image Agent

↓

Subtitle Agent

↓

Video Agent

↓

Publishing Agent

---

# Storage

uploads/

├── scripts

├── voice

├── images

├── subtitles

└── videos
