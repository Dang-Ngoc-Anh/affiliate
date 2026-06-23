#!/bin/bash

# Dừng nếu có lỗi
set -e

echo "🚀 [1/3] Bắt đầu khởi chạy Infrastructure (Postgres, Redis, Qdrant, Ollama)..."
docker-compose up -d

echo "⏳ Đợi 5 giây để Ollama khởi động hoàn tất..."
sleep 5

echo "🧠 [2/3] Đang tải model Qwen (qwen3:8b) cho Agent Reasoning..."
echo "Lưu ý: Quá trình này có thể mất 10-20 phút tùy vào tốc độ mạng của bạn"
docker exec factory_ollama ollama pull qwen3:8b

echo "🧠 [3/3] Đang tải model embedding (bge-m3) để lưu trữ Vector/RAG..."
docker exec factory_ollama ollama pull bge-m3

echo "✅ [Hoàn tất] Local AI Stack đã sẵn sàng!"
echo "--------------------------------------------------------"
echo "👉 LLM API: http://localhost:11434"
echo "👉 Qdrant Vector DB: http://localhost:6333"
echo "👉 Postgres: localhost:5432 (admin/password)"
echo "👉 Redis: localhost:6379"
echo "--------------------------------------------------------"
