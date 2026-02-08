#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CYAN = '\x1b[36m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';

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

// --- Helpers ---

function run(cmd) {
  try {
    execSync(cmd, { stdio: 'inherit', shell: true });
    return true;
  } catch (e) {
    return false;
  }
}

function runSilent(cmd) {
  try {
    execSync(cmd, { stdio: 'pipe', shell: true });
    return true;
  } catch (e) {
    return false;
  }
}

function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// --- Paths ---

const homeDir = process.env.HOME || process.env.USERPROFILE;
const claudeDir = path.join(homeDir, '.claude');
const skillsDir = path.join(claudeDir, 'skills');
const packageDir = path.join(__dirname, '..');
const packageSkillsDir = path.join(packageDir, 'skills');

// --- Step 1: Check Claude CLI ---

console.log(`${CYAN}[1/4] Checking Claude CLI...${RESET}`);
try {
  execSync('claude --version', { stdio: 'pipe', shell: true });
  console.log(`  ${GREEN}✓${RESET} Claude CLI found\n`);
} catch (e) {
  console.log(`  ${RED}✗ Claude CLI not found.${RESET}`);
  console.log(`  Install it first: ${DIM}https://claude.ai/code${RESET}`);
  process.exit(1);
}

// --- Step 2: Install Skills ---

console.log(`${CYAN}[2/4] Installing 12 skills...${RESET}`);
fs.mkdirSync(skillsDir, { recursive: true });

const skills = fs.readdirSync(packageSkillsDir).filter(name => {
  return fs.statSync(path.join(packageSkillsDir, name)).isDirectory();
});

let skillCount = 0;
for (const skill of skills) {
  const src = path.join(packageSkillsDir, skill);
  const dest = path.join(skillsDir, skill);
  try {
    copyDirSync(src, dest);
    console.log(`  ${GREEN}✓${RESET} ${skill}`);
    skillCount++;
  } catch (e) {
    console.log(`  ${RED}✗${RESET} ${skill} - ${e.message}`);
  }
}
console.log(`  ${DIM}${skillCount} skills installed to ${skillsDir}${RESET}\n`);

// --- Step 3: Add Scallywag Marketplace ---

console.log(`${CYAN}[3/4] Adding scallywag marketplace...${RESET}`);
if (run('claude plugin marketplace add Kizsler/scallywag')) {
  console.log(`  ${GREEN}✓${RESET} Marketplace added\n`);
} else {
  console.log(`  ${YELLOW}⚠${RESET} Could not add marketplace (may already exist)\n`);
}

// --- Step 4: Install Plugins ---

console.log(`${CYAN}[4/4] Installing plugins...${RESET}`);

const officialPlugins = [
  'frontend-design',
  'github',
  'playwright',
  'code-review',
  'commit-commands',
  'supabase',
  'superpowers',
];

let pluginCount = 0;

// Install from official marketplace
for (const plugin of officialPlugins) {
  process.stdout.write(`  Installing ${plugin}...`);
  if (runSilent(`claude plugin install ${plugin}@claude-plugins-official`)) {
    console.log(` ${GREEN}✓${RESET}`);
    pluginCount++;
  } else {
    console.log(` ${YELLOW}skipped${RESET}`);
  }
}

// Install scallywag plugin from kizsl marketplace
process.stdout.write(`  Installing scallywag...`);
if (runSilent('claude plugin install scallywag@kizsl-marketplace')) {
  console.log(` ${GREEN}✓${RESET}`);
  pluginCount++;
} else {
  console.log(` ${YELLOW}skipped${RESET}`);
}

console.log(`  ${DIM}${pluginCount} plugins installed${RESET}`);

// --- Done ---

console.log(`
${GREEN}${BOLD}
  ╔═══════════════════════════════════════════════╗
  ║         SCALLYWAG INSTALLED SUCCESSFULLY      ║
  ╠═══════════════════════════════════════════════╣
  ║                                               ║
  ║  ${RESET}${GREEN}${skillCount} skills${BOLD}  installed to ~/.claude/skills/   ║
  ║  ${RESET}${GREEN}${pluginCount} plugins${BOLD} enabled from marketplace        ║
  ║                                               ║
  ║  Skills: 3d-games, algorithmic-art,           ║
  ║    brand-guidelines, canvas-design,           ║
  ║    frontend-design, game-art, game-developer, ║
  ║    godot-gdscript-patterns, remotion,         ║
  ║    scallywag, theme-factory, web-artifacts    ║
  ║                                               ║
  ╚═══════════════════════════════════════════════╝
${RESET}
  Restart Claude Code to activate.

  ${CYAN}Happy coding, ye scallywag! 🏴‍☠️${RESET}
`);
