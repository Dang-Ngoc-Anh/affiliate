const fs = require('fs');
const path = require('path');

const OLLAMA_URL = 'http://localhost:11434/api/generate';
const MODEL = 'qwen3:8b';

async function askLocalAI(prompt, systemPrompt, isCode = false) {
  try {
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        prompt: prompt,
        system: systemPrompt,
        stream: false
      })
    });

    if (!response.ok) {
      throw new Error(`Ollama Error: ${response.statusText}`);
    }
    const data = await response.json();
    let result = data.response.trim();

    // Xóa block markdown nếu yêu cầu code thuần
    if (isCode && result.startsWith('```')) {
      result = result.replace(/^```[a-z]*\n/, '').replace(/```$/, '');
    }
    return result;
  } catch (error) {
    console.error('❌ Lỗi kết nối đến Local AI:', error.message);
    process.exit(1);
  }
}

async function startAutonomousAgent() {
  console.log('🤖 KHỞI ĐỘNG AUTONOMOUS SOFTWARE ENGINEER (LOCAL AI QWEN)');
  console.log('----------------------------------------------------');

  // Đọc luật Staff+ Engineer mà bạn vừa update
  console.log('📚 Đang nạp hệ thống luật AGENTS.md vào não AI...');
  const agentsRules = fs.readFileSync(path.join(__dirname, 'AGENTS.md'), 'utf-8');
  const architecture = fs.readFileSync(path.join(__dirname, 'ARCHITECTURE.md'), 'utf-8');

  const systemInstruction = `You are a Staff+ Software Engineer operating autonomously inside a local workspace. 
Follow these rules strictly:
${agentsRules}`;

  // Tạo các nhiệm vụ dựa trên chuẩn "Project Discovery" mà bạn vừa thêm
  const tasks = [
    {
      name: 'Step 1: Generate PROJECT_MAP.md',
      prompt: `Based on the following architecture:\n${architecture}\n\nExecute Step 1: Analyze repository structure and generate PROJECT_MAP.md containing modules, services, entities, DTOs, and external integrations. Output the raw markdown content without enclosing it in markdown code blocks.`,
      filePath: 'PROJECT_MAP.md',
      isCode: false
    },
    {
      name: 'Step 2: Generate DEPENDENCY_MAP.md',
      prompt: `Execute Step 2: Analyze the dependencies for the NestJS and React project based on the architecture. Generate DEPENDENCY_MAP.md. Output raw markdown.`,
      filePath: 'DEPENDENCY_MAP.md',
      isCode: false
    },
    {
      name: 'Step 3: Generate ARCHITECTURE_ANALYSIS.md',
      prompt: `Execute Step 3: Analyze the architecture and create ARCHITECTURE_ANALYSIS.md assessing correctness, maintainability, scalability, and type safety. Output raw markdown.`,
      filePath: 'ARCHITECTURE_ANALYSIS.md',
      isCode: false
    },
    {
      name: 'Memory Init: AI_MEMORY.md',
      prompt: `Initialize the AI_MEMORY.md file to store architectural decisions, naming conventions, completed tasks, and known issues. Output raw markdown.`,
      filePath: 'AI_MEMORY.md',
      isCode: false
    }
  ];

  for (const task of tasks) {
    console.log(`\n🧠 AI đang tự động phân tích và viết: [${task.name}] ...`);

    // Truyền lệnh cho Qwen
    const content = await askLocalAI(task.prompt, systemInstruction, task.isCode);

    // Tự động lưu file
    const fullPath = path.join(__dirname, task.filePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content);

    console.log(`✅ AI đã hoàn tất và lưu vào: ${task.filePath}`);
    console.log(`------------------------ PREVIEW ------------------------`);
    console.log(content.substring(0, 200) + '\n... (đã rút gọn)');
    console.log(`---------------------------------------------------------`);
  }

  console.log('\n🎉 Quá trình Project Discovery hoàn tất! Local AI đã làm đúng yêu cầu trong AGENTS.md.');
}

startAutonomousAgent();
