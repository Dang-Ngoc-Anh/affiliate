# Local AI Stack

## Goal

Build and operate the entire AI Content Factory using local models.

No OpenAI API.

No Gemini API.

No Claude API.

All inference should run on local hardware.

---

# Recommended Models

## Primary LLM

Qwen3

Purpose:

- Script generation
- Topic research
- Planning
- Agent reasoning

Recommended:

qwen3:8b

Minimum RAM:

16GB

Recommended RAM:

32GB

---

## Advanced Reasoning

DeepSeek R1

Purpose:

- Long-form reasoning
- Planning
- Complex workflows

Use only when needed.

---

# Inference Engine

Development:

Ollama

Production:

vLLM

Reason:

- Better throughput
- Better GPU utilization
- Concurrent requests

---

# Embedding Model

bge-m3

Purpose:

- RAG
- Search
- Knowledge retrieval

---

# Vector Database

Qdrant

Purpose:

Store embeddings.

---

# Voice Generation

Primary:

GPT-SoVITS

Purpose:

Voice cloning.

Input:

Reference voice.

Output:

Natural speech.

---

# Alternative Voice

XTTS-v2

Purpose:

Quick voice cloning.

---

# Speech To Text

Whisper

Model:

medium

Purpose:

Subtitle generation.

---

# Image Generation

ComfyUI

Model:

Flux

Purpose:

Generate images.

---

# Video Generation

FFmpeg

Purpose:

Combine:

- Voice
- Images
- Subtitle

Output:

MP4

---

# Workflow Engine

LangGraph

Purpose:

Manage agents.

---

# Agent Structure

Research Agent

Script Agent

Voice Agent

Image Agent

Subtitle Agent

Video Agent

Publishing Agent

---

# Development Rules

Always prefer local models.

Only use cloud APIs if local models cannot perform the task.

All AI services must expose REST APIs.

All services must be containerized.

---

# Docker Services

postgres

redis

nestjs

qdrant

ollama

gpt-sovits

comfyui

whisper

frontend

---

# Local Model Configuration

Qwen3

Temperature:

0.7

Top P:

0.9

Max Tokens:

4096

---

# Future Upgrade Path

Phase 1

Ollama

↓

Phase 2

vLLM

↓

Phase 3

Multi-GPU vLLM

↓

Phase 4

Distributed Inference
