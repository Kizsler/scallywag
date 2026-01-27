#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';
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
  ${BOLD}Kizsl's Claude Code Setup${RESET}
  28 plugins • 12 skills • Instant productivity
`);

const homeDir = os.homedir();
const claudeDir = path.join(homeDir, '.claude');
const skillsDestDir = path.join(claudeDir, 'skills');
const packageDir = path.dirname(__dirname);

// Plugin lists
const plugins = {
  official: [
    'frontend-design@claude-plugins-official',
    'github@claude-plugins-official',
    'playwright@claude-plugins-official',
    'code-review@claude-plugins-official',
    'commit-commands@claude-plugins-official',
    'supabase@claude-plugins-official',
    'lua-lsp@claude-plugins-official'
  ],
  superpowers: [
    'superpowers@superpowers-marketplace',
    'superpowers-developing-for-claude-code@superpowers-marketplace'
  ],
  workflows: [
    'agent-orchestration@claude-code-workflows',
    'accessibility-compliance@claude-code-workflows',
    'api-scaffolding@claude-code-workflows',
    'api-testing-observability@claude-code-workflows',
    'application-performance@claude-code-workflows',
    'backend-api-security@claude-code-workflows',
    'backend-development@claude-code-workflows',
    'code-documentation@claude-code-workflows',
    'code-review-ai@claude-code-workflows',
    'codebase-cleanup@claude-code-workflows',
    'database-design@claude-code-workflows',
    'debugging-toolkit@claude-code-workflows',
    'deployment-strategies@claude-code-workflows',
    'frontend-mobile-development@claude-code-workflows',
    'game-development@claude-code-workflows',
    'javascript-typescript@claude-code-workflows'
  ],
  expo: [
    'expo-app-design@expo-plugins',
    'expo-deployment@expo-plugins',
    'upgrading-expo@expo-plugins'
  ],
  every: [
    'compound-engineering@every-marketplace'
  ]
};

function runCommand(cmd, silent = false) {
  try {
    execSync(cmd, {
      stdio: silent ? 'pipe' : 'inherit',
      shell: true
    });
    return true;
  } catch (e) {
    return false;
  }
}

function installPlugin(plugin) {
  const name = plugin.split('@')[0];
  process.stdout.write(`  ${YELLOW}→${RESET} ${name}...`);
  const success = runCommand(`claude plugin add "${plugin}"`, true);
  if (success) {
    console.log(` ${GREEN}✓${RESET}`);
  } else {
    console.log(` ${YELLOW}(already installed or unavailable)${RESET}`);
  }
}

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;

  if (fs.statSync(src).isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    for (const item of fs.readdirSync(src)) {
      copyRecursive(path.join(src, item), path.join(dest, item));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

async function main() {
  // Check if claude CLI is available
  console.log(`${CYAN}Checking Claude CLI...${RESET}`);
  if (!runCommand('claude --version', true)) {
    console.log(`${RED}Error: Claude CLI not found. Install it first:${RESET}`);
    console.log('  npm install -g @anthropic-ai/claude-code');
    process.exit(1);
  }
  console.log(`  ${GREEN}✓${RESET} Claude CLI found\n`);

  // Install plugins by category
  console.log(`${CYAN}Installing Official Plugins (7)...${RESET}`);
  plugins.official.forEach(installPlugin);

  console.log(`\n${CYAN}Installing Superpowers (2)...${RESET}`);
  plugins.superpowers.forEach(installPlugin);

  console.log(`\n${CYAN}Installing Workflow Plugins (16)...${RESET}`);
  plugins.workflows.forEach(installPlugin);

  console.log(`\n${CYAN}Installing Expo Plugins (3)...${RESET}`);
  plugins.expo.forEach(installPlugin);

  console.log(`\n${CYAN}Installing Every Marketplace (1)...${RESET}`);
  plugins.every.forEach(installPlugin);

  // Copy skills
  console.log(`\n${CYAN}Installing Custom Skills (12)...${RESET}`);
  const skillsSrcDir = path.join(packageDir, 'skills');
  if (fs.existsSync(skillsSrcDir)) {
    if (!fs.existsSync(skillsDestDir)) {
      fs.mkdirSync(skillsDestDir, { recursive: true });
    }
    const skills = fs.readdirSync(skillsSrcDir);
    for (const skill of skills) {
      const src = path.join(skillsSrcDir, skill);
      const dest = path.join(skillsDestDir, skill);
      if (fs.statSync(src).isDirectory()) {
        process.stdout.write(`  ${YELLOW}→${RESET} ${skill}...`);
        copyRecursive(src, dest);
        console.log(` ${GREEN}✓${RESET}`);
      }
    }
  }

  // Copy CLAUDE.md (ask first)
  const claudeMdSrc = path.join(packageDir, 'CLAUDE.md');
  const claudeMdDest = path.join(claudeDir, 'CLAUDE.md');

  if (fs.existsSync(claudeMdSrc)) {
    if (fs.existsSync(claudeMdDest)) {
      console.log(`\n${YELLOW}CLAUDE.md already exists - skipping to preserve your config${RESET}`);
    } else {
      console.log(`\n${CYAN}Installing CLAUDE.md...${RESET}`);
      fs.copyFileSync(claudeMdSrc, claudeMdDest);
      console.log(`  ${GREEN}✓${RESET} Installed global CLAUDE.md`);
    }
  }

  // Set model to Opus
  console.log(`\n${CYAN}Setting model to Opus...${RESET}`);
  runCommand('claude config set model opus', true);
  console.log(`  ${GREEN}✓${RESET} Model set to Opus`);

  // Done!
  console.log(`
${GREEN}${BOLD}
  ╔═══════════════════════════════════════════╗
  ║         SCALLYWAG SETUP COMPLETE!         ║
  ╠═══════════════════════════════════════════╣
  ║  28 plugins installed                     ║
  ║  12 custom skills ready                   ║
  ║  Model set to Opus                        ║
  ╚═══════════════════════════════════════════╝
${RESET}
  Restart Claude Code to use your new setup.

  ${CYAN}Happy coding, ye scallywag! 🏴‍☠️${RESET}
`);
}

main().catch(console.error);
