#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

echo "🚀 Starting Backend (Port 3000)..."
cd backend && npm run start:dev &
BE_PID=$!

echo "🚀 Starting Frontend (Port 5173)..."
cd frontend && npm run dev &
FE_PID=$!

echo "----------------------------------------"
echo "✅ Hệ thống AI Content Factory đang chạy!"
echo "👉 Web Giao Diện (Frontend): http://localhost:5173"
echo "👉 Máy chủ (Backend): http://localhost:3000"
echo "----------------------------------------"
echo "Bấm CTRL+C để dừng toàn bộ hệ thống."

trap "kill $BE_PID $FE_PID; exit" INT
wait
