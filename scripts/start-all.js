// start-all.js
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const isDev = process.argv[2] === 'dev';

console.log('🚀 Starting all Lendify services...\n');

const commands = [
  {
    name: 'membera Backend',
    command: 'npm',
    args: isDev ? ['run', 'dev'] : ['start'],
    cwd: path.join(__dirname, '..', 'membera', 'backend'),
    color: '\x1b[36m',
  },
  {
    name: 'memberb Backend',
    command: 'npm',
    args: isDev ? ['run', 'dev'] : ['start'],
    cwd: path.join(__dirname, '..', 'memberb', 'backend'),
    color: '\x1b[32m',
  },
  {
    name: 'memberc Backend',
    command: 'npm',
    args: isDev ? ['run', 'dev'] : ['start'],
    cwd: path.join(__dirname, '..', 'memberc', 'backend'),
    color: '\x1b[33m',
  },
  {
    name: 'Frontend',
    command: 'npm',
    args: ['start'],
    cwd: path.join(__dirname, '..', 'frontend'),
    color: '\x1b[35m',
  },
];

const processes = [];

commands.forEach((cmd) => {
  console.log(`→ Preparing to start ${cmd.name}`);
  console.log(`   cwd: ${cmd.cwd}`);

  if (!fs.existsSync(cmd.cwd)) {
    console.error(`${cmd.color}[${cmd.name}]\x1b[0m ERROR: cwd does not exist: ${cmd.cwd}`);
    process.exit(1);
  }

  const nm = path.join(cmd.cwd, 'node_modules');
  if (!fs.existsSync(nm)) {
    console.error(`${cmd.color}[${cmd.name}]\x1b[0m ERROR: node_modules not found in ${cmd.cwd}. Did you run npm install?`);
    process.exit(1);
  }

  console.log(`   Spawning: ${cmd.command} ${cmd.args.join(' ')} (in ${cmd.cwd})`);
  const proc = spawn(cmd.command, cmd.args, {
    cwd: cmd.cwd,
    shell: true,
    stdio: 'inherit',
  });

  processes.push(proc);

  proc.on('error', (error) => {
    console.error(`${cmd.color}[${cmd.name}]\x1b[0m Error:`, error.message);
  });

  proc.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`${cmd.color}[${cmd.name}]\x1b[0m Process exited with code ${code}`);
    }
  });
});

process.on('SIGINT', () => {
  console.log('\n\n🛑 Shutting down all services...');
  processes.forEach((proc) => proc.kill('SIGINT'));
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n🛑 Shutting down all services...');
  processes.forEach((proc) => proc.kill('SIGTERM'));
  process.exit(0);
});

console.log('✅ All services are starting...');
console.log('📝 Press Ctrl+C to stop all services\n');
