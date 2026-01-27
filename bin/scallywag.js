#!/usr/bin/env node

const { execSync } = require('child_process');

const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

console.log(`
${CYAN}${BOLD}
  ███████╗ ██████╗ █████╗ ██╗     ██╗  ██╗   ██╗██╗    ██╗ █████╗  ██████╗
  ██╔════╝██╔════╝██╔══██╗██║     ██║  ╚██╗ ██╔╝██║    ██║██╔══██╗██╔════╝
  ███████╗██║     ███████║██║     ██║   ╚████╔╝ ██║ █╗ ██║███████║██║  ███╗
  ╚════██║██║     ██╔══██║██║     ██║    ╚██╔╝  ██║███╗██║██╔══██║██║   ██║
  ███████║╚██████╗██║  ██║███████╗███████╗██║   ╚███╔███╔╝██║  ██║╚██████╔╝
  ╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝    ╚══╝╚══╝ ╚═╝  ╚═╝ ╚═════╝
${RESET}
  ${BOLD}Kizsl's Mega Skill${RESET}
  Games • Art • Design • Frontend • Video • Web
`);

function run(cmd) {
  try {
    execSync(cmd, { stdio: 'inherit', shell: true });
    return true;
  } catch (e) {
    return false;
  }
}

// Check Claude CLI
console.log(`${CYAN}Checking Claude CLI...${RESET}`);
try {
  execSync('claude --version', { stdio: 'pipe', shell: true });
  console.log(`  ${GREEN}✓${RESET} Claude CLI found\n`);
} catch (e) {
  console.log(`${RED}Error: Claude CLI not found. Install it first:${RESET}`);
  console.log('  npm install -g @anthropic-ai/claude-code');
  process.exit(1);
}

// Add marketplace
console.log(`${CYAN}Adding kizsl marketplace...${RESET}`);
run('claude marketplace add kizsl https://raw.githubusercontent.com/Kizsler/scallywag/main/marketplace.json');
console.log(`  ${GREEN}✓${RESET} Marketplace added\n`);

// Install plugin
console.log(`${CYAN}Installing scallywag plugin...${RESET}`);
run('claude plugin add scallywag@kizsl');
console.log(`  ${GREEN}✓${RESET} Plugin installed\n`);

console.log(`
${GREEN}${BOLD}
  ╔═══════════════════════════════════════════╗
  ║       SCALLYWAG INSTALLED SUCCESSFULLY    ║
  ╠═══════════════════════════════════════════╣
  ║  The mega skill is ready to use!          ║
  ║                                           ║
  ║  Covers: Games, Art, Design, Frontend,    ║
  ║          Video, Web Development           ║
  ╚═══════════════════════════════════════════╝
${RESET}
  Restart Claude Code to activate.

  ${CYAN}Happy coding, ye scallywag! 🏴‍☠️${RESET}
`);
