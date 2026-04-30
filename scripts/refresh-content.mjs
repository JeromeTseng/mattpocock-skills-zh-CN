#!/usr/bin/env node
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";

const LOCAL_REPO = "vinvcn/mattpocock-skills-zh-CN";
const UPSTREAM_REPO = "mattpocock/skills";
const DEFAULT_UPSTREAM_GIT_URL = "https://github.com/mattpocock/skills.git";
const DEFAULT_REF = "main";
const DEFAULT_BASELINE = ".translation-refresh/upstream-manifest.json";
const DEFAULT_SUMMARY = "TRANSLATION_REFRESH_SUMMARY.md";

const TRANSLATABLE_EXTENSIONS = new Set([".md", ".mdx", ".txt"]);
const COPY_EXTENSIONS = new Set([".json", ".yml", ".yaml", ".toml"]);
const SCOPE_PREFIXES = [
  "skills/",
  "docs/",
  ".out-of-scope/",
  ".claude-plugin/",
];
const SCOPE_FILES = new Set(["README.md", "CLAUDE.md", "CONTEXT.md"]);
const OUT_OF_SCOPE_PREFIXES = [".git/", ".github/", "scripts/", "node_modules/"];

function usage() {
  console.log(`Usage:
  node scripts/refresh-content.mjs --upstream-dir <path> [--apply] [--translator-command <cmd>] [--remove-stale]
  node scripts/refresh-content.mjs [--upstream-git-url ${DEFAULT_UPSTREAM_GIT_URL}] [--ref ${DEFAULT_REF}] [--apply] [--translator-command <cmd>]

Options:
  --upstream-dir <path>       Read upstream source material from a local checkout or extracted archive.
  --upstream-git-url <url>    Fetch upstream source material into a temporary directory.
  --ref <name>                Upstream ref to fetch when --upstream-dir is not provided.
  --apply                     Write candidate updates into this repo and update the manifest.
  --translator-command <cmd>  Command that reads JSON on stdin and writes {"text":"..."} JSON on stdout.
  --remove-stale              Remove tracked localized files whose upstream source disappeared.
  --baseline <path>           Baseline manifest path. Default: ${DEFAULT_BASELINE}
  --summary <path>            Review summary path. Default: ${DEFAULT_SUMMARY}
  --help                      Show this help.
`);
}

function parseArgs(argv) {
  const args = {
    apply: false,
    removeStale: false,
    ref: DEFAULT_REF,
    upstreamGitUrl: DEFAULT_UPSTREAM_GIT_URL,
    baseline: DEFAULT_BASELINE,
    summary: DEFAULT_SUMMARY,
  };

  for (let index = 0; index < argv.length; index++) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--apply") {
      args.apply = true;
    } else if (arg === "--remove-stale") {
      args.removeStale = true;
    } else if (arg === "--upstream-dir") {
      args.upstreamDir = requiredValue(argv, ++index, arg);
    } else if (arg === "--upstream-git-url") {
      args.upstreamGitUrl = requiredValue(argv, ++index, arg);
    } else if (arg === "--ref") {
      args.ref = requiredValue(argv, ++index, arg);
    } else if (arg === "--translator-command") {
      args.translatorCommand = requiredValue(argv, ++index, arg);
    } else if (arg === "--baseline") {
      args.baseline = requiredValue(argv, ++index, arg);
    } else if (arg === "--summary") {
      args.summary = requiredValue(argv, ++index, arg);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function requiredValue(argv, index, flag) {
  const value = argv[index];
  if (!value || value.startsWith("--")) {
    throw new Error(`${flag} requires a value`);
  }
  return value;
}

function execGit(args, options = {}) {
  return execFileSync("git", args, {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  });
}

function makeTempUpstream(url, ref) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "skills-upstream-"));
  execGit([
    "clone",
    "--depth=1",
    "--filter=blob:none",
    "--branch",
    ref,
    url,
    tmp,
  ]);
  return tmp;
}

function repoFiles() {
  return execGit(["ls-files"])
    .trim()
    .split("\n")
    .filter(Boolean)
    .map(normalizePath);
}

function walk(root) {
  const out = [];
  function visit(relativeDir) {
    const absoluteDir = path.join(root, relativeDir);
    for (const entry of fs.readdirSync(absoluteDir, { withFileTypes: true })) {
      const relative = normalizePath(path.join(relativeDir, entry.name));
      if (entry.isDirectory()) {
        if (OUT_OF_SCOPE_PREFIXES.some((prefix) => `${relative}/`.startsWith(prefix))) {
          continue;
        }
        visit(relative);
      } else if (entry.isFile()) {
        out.push(relative);
      }
    }
  }
  visit("");
  return out.sort();
}

function normalizePath(file) {
  return file.split(path.sep).join("/").replace(/^\.\//, "");
}

function inScope(file) {
  if (SCOPE_FILES.has(file)) return true;
  return SCOPE_PREFIXES.some((prefix) => file.startsWith(prefix));
}

function kindFor(file) {
  const ext = path.extname(file);
  if (TRANSLATABLE_EXTENSIONS.has(ext)) return "translate";
  if (COPY_EXTENSIONS.has(ext)) return "copy";
  return "skip";
}

function sha(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function readText(file) {
  return fs.readFileSync(file, "utf8");
}

function readJsonIfExists(file, fallback) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(readText(file));
}

function writeFile(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text);
}

function protectMarkdown(text) {
  const tokens = [];
  function tokenFor(value, type) {
    const token = `__SKILLS_ZH_CN_${type}_${tokens.length}__`;
    tokens.push({ token, value, type });
    return token;
  }

  let protectedText = text.replace(/```[\s\S]*?```/g, (value) =>
    tokenFor(value, "FENCE"),
  );
  protectedText = protectedText.replace(/`[^`\n]+`/g, (value) =>
    tokenFor(value, "INLINE"),
  );
  protectedText = protectedText.replace(
    /(!?\[[^\]]*\]\()([^)]+)(\))/g,
    (_match, left, target, right) => `${left}${tokenFor(target, "LINK")}${right}`,
  );
  protectedText = protectedText.replace(
    /(https?:\/\/[^\s)]+)/g,
    (value) => tokenFor(value, "URL"),
  );

  return { protectedText, tokens };
}

function restoreProtected(text, tokens) {
  let restored = text;
  for (const { token, value } of tokens) {
    restored = restored.replaceAll(token, value);
  }
  return restored;
}

function callTranslator(command, file, text) {
  const [cmd, ...args] = command.split(/\s+/).filter(Boolean);
  const child = spawnSync(cmd, args, {
    input: JSON.stringify({
      file,
      sourceLanguage: "en",
      targetLanguage: "zh-CN",
      preservePlaceholders: true,
      text,
    }),
    encoding: "utf8",
    maxBuffer: 25 * 1024 * 1024,
  });

  if (child.error) throw child.error;
  if (child.status !== 0) {
    throw new Error(
      `translator command failed for ${file}: ${child.stderr || child.stdout}`,
    );
  }

  const parsed = JSON.parse(child.stdout);
  if (!parsed || typeof parsed.text !== "string") {
    throw new Error(`translator command must output JSON with a string text field`);
  }
  return parsed.text;
}

function localizeInstallPaths(text) {
  return text.replace(
    /npx skills@latest add mattpocock\/skills\//g,
    `npx skills@latest add ${LOCAL_REPO}/`,
  );
}

function translateFile(file, sourceText, translatorCommand, flags) {
  const { protectedText, tokens } = protectMarkdown(sourceText);
  let translated = protectedText;

  if (translatorCommand) {
    translated = callTranslator(translatorCommand, file, protectedText);
  } else if (containsLikelyEnglishProse(protectedText)) {
    flags.push(
      `${file}: translatable prose changed, but no --translator-command was provided; left unchanged and flagged.`,
    );
  }

  translated = restoreProtected(translated, tokens);
  translated = localizeInstallPaths(translated);
  translated = preserveReadmeIdentity(file, translated);
  validateProtectedTokens(file, translated, tokens, flags);
  validateFrontmatter(file, sourceText, translated, flags);
  return translated;
}

function preserveReadmeIdentity(file, text) {
  if (file !== "README.md") return text;
  if (text.includes(LOCAL_REPO) && text.includes(UPSTREAM_REPO) && /简体中文|中文/.test(text)) {
    return text;
  }

  const identity = [
    `这是 [\`${UPSTREAM_REPO}\`](https://github.com/${UPSTREAM_REPO}) 的简体中文本地化版本。原项目版权归 Matt Pocock 所有，并按 MIT License 授权。本仓库保留原始许可证，并提供中文翻译，方便中文用户使用。`,
    "",
    "> 说明：本项目翻译文档和技能说明，但保留目录名、技能名、命令、代码块和工具相关标识，以避免破坏安装和运行行为。",
    "",
  ].join("\n");

  const lines = text.split("\n");
  const firstHeadingIndex = lines.findIndex((line) => /^#\s+/.test(line));
  if (firstHeadingIndex === -1) {
    return `# Agent Skills For Real Engineers 中文版\n\n${identity}${text}`;
  }
  const before = lines.slice(0, firstHeadingIndex + 1).join("\n");
  const after = lines.slice(firstHeadingIndex + 1).join("\n").replace(/^\n+/, "");
  return `${before}\n\n${identity}${after}`;
}

function containsLikelyEnglishProse(text) {
  const withoutStructuralLines = text
    .split("\n")
    .filter((line) => {
      const trimmed = line.trim();
      if (!trimmed) return false;
      if (/^[-*]\s*\[[^\]]+\]\(/.test(trimmed)) return false;
      if (/^(__SKILLS_ZH_CN_|---$|name:|description:)/.test(trimmed)) return false;
      return true;
    })
    .join("\n");
  const words = withoutStructuralLines.match(/[A-Za-z]{4,}/g) || [];
  return words.length >= 8;
}

function validateProtectedTokens(file, text, tokens, flags) {
  for (const { value, type } of tokens) {
    const allowedLocalizedValue = localizeInstallPaths(value);
    if (!text.includes(value) && !text.includes(allowedLocalizedValue)) {
      flags.push(`${file}: protected ${type.toLowerCase()} span changed or disappeared.`);
    }
  }
  if (/__SKILLS_ZH_CN_[A-Z]+_\d+__/.test(text)) {
    flags.push(`${file}: unreplaced protection placeholder remains.`);
  }
}

function frontmatterKeys(text) {
  const match = text.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return null;
  return match[1]
    .split("\n")
    .map((line) => line.match(/^([A-Za-z0-9_-]+):/)?.[1])
    .filter(Boolean);
}

function validateFrontmatter(file, source, target, flags) {
  if (!file.endsWith(".md") && !file.endsWith(".mdx")) return;
  const sourceKeys = frontmatterKeys(source);
  const targetKeys = frontmatterKeys(target);
  if (!sourceKeys && !targetKeys) return;
  if (JSON.stringify(sourceKeys) !== JSON.stringify(targetKeys)) {
    flags.push(`${file}: frontmatter keys changed.`);
  }
}

function validateRepoInvariants(summary, flags) {
  if (fs.existsSync("README.md")) {
    const readme = readText("README.md");
    if (/npx skills@latest add mattpocock\/skills\//.test(readme)) {
      flags.push("README.md: install command still points to mattpocock/skills.");
    }
    if (!readme.includes(LOCAL_REPO)) {
      flags.push(`README.md: localized repo path ${LOCAL_REPO} is missing.`);
    }
    if (!readme.includes(UPSTREAM_REPO)) {
      flags.push(`README.md: upstream attribution ${UPSTREAM_REPO} is missing.`);
    }
  }

  for (const file of summary.changedFiles) {
    if (!file.endsWith(".md")) continue;
    const text = fs.existsSync(file) ? readText(file) : "";
    const fences = text.match(/```/g) || [];
    if (fences.length % 2 !== 0) {
      flags.push(`${file}: unbalanced fenced code blocks.`);
    }
  }
}

function loadManifest(file) {
  const manifest = readJsonIfExists(file, { upstream: UPSTREAM_REPO, files: {} });
  manifest.files ||= {};
  return manifest;
}

function summaryMarkdown(summary) {
  const lines = [
    "# Translation Refresh Summary",
    "",
    `Upstream source: ${summary.upstreamSource}`,
    `Mode: ${summary.apply ? "apply" : "dry-run"}`,
    "",
    section("New files", summary.newFiles),
    section("Changed files", summary.changedFiles),
    section("Removed or stale files", summary.removedFiles),
    section("Translated files", summary.translatedFiles),
    section("Copied files", summary.copiedFiles),
    section("Skipped files", summary.skippedFiles),
    section("Review flags", summary.reviewFlags),
    "## Invariant checks",
    "",
    "- README install commands point to vinvcn/mattpocock-skills-zh-CN",
    "- Code fences, inline code, links, URLs, and frontmatter keys are protected before translation",
    "- Upstream repository-management state is out of scope",
    "- .chatgpt_exec/ remains ignored by .gitignore",
    "",
  ];
  return lines.join("\n");
}

function section(title, items) {
  if (!items.length) return `## ${title}\n\n- None\n`;
  return `## ${title}\n\n${items.map((item) => `- ${item}`).join("\n")}\n`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    usage();
    return;
  }
  if (args.apply && !args.translatorCommand) {
    throw new Error(
      "--apply requires --translator-command so prose-bearing upstream content is not imported untranslated.",
    );
  }

  const upstreamDir = args.upstreamDir
    ? path.resolve(args.upstreamDir)
    : makeTempUpstream(args.upstreamGitUrl, args.ref);
  const upstreamSource = args.upstreamDir
    ? upstreamDir
    : `${args.upstreamGitUrl}#${args.ref}`;
  if (!fs.existsSync(upstreamDir)) {
    throw new Error(`Upstream directory not found: ${upstreamDir}`);
  }

  const manifest = loadManifest(args.baseline);
  const tracked = new Set(repoFiles());
  const upstreamFiles = walk(upstreamDir).filter(inScope);
  const upstreamFileSet = new Set(upstreamFiles);
  const summary = {
    upstreamSource,
    apply: args.apply,
    newFiles: [],
    changedFiles: [],
    removedFiles: [],
    translatedFiles: [],
    copiedFiles: [],
    skippedFiles: [],
    reviewFlags: [],
  };
  const nextManifest = {
    upstream: UPSTREAM_REPO,
    refreshedAt: new Date().toISOString(),
    files: {},
  };

  for (const file of upstreamFiles) {
    const sourcePath = path.join(upstreamDir, file);
    const sourceText = readText(sourcePath);
    const sourceHash = sha(sourceText);
    nextManifest.files[file] = { sha256: sourceHash };

    const previousHash = manifest.files[file]?.sha256;
    const existsLocally = tracked.has(file) || fs.existsSync(file);
    if (!existsLocally) summary.newFiles.push(file);
    if (previousHash && previousHash !== sourceHash) summary.changedFiles.push(file);
    if (!previousHash && existsLocally) summary.changedFiles.push(file);

    const changed = !previousHash || previousHash !== sourceHash || !existsLocally;
    if (!changed) continue;

    const kind = kindFor(file);
    if (kind === "translate") {
      const targetText = translateFile(
        file,
        sourceText,
        args.translatorCommand,
        summary.reviewFlags,
      );
      summary.translatedFiles.push(file);
      if (args.apply && args.translatorCommand) writeFile(file, targetText);
    } else if (kind === "copy") {
      summary.copiedFiles.push(file);
      if (args.apply) writeFile(file, sourceText);
    } else {
      summary.skippedFiles.push(file);
    }
  }

  for (const file of Object.keys(manifest.files)) {
    if (!upstreamFileSet.has(file)) {
      summary.removedFiles.push(file);
      if (args.apply && args.removeStale && fs.existsSync(file)) {
        fs.unlinkSync(file);
      }
    }
  }

  validateRepoInvariants(summary, summary.reviewFlags);
  writeFile(args.summary, summaryMarkdown(summary));
  process.stdout.write(summaryMarkdown(summary));

  if (args.apply && summary.reviewFlags.length) {
    process.exitCode = 1;
    return;
  }

  if (args.apply) {
    writeFile(args.baseline, `${JSON.stringify(nextManifest, null, 2)}\n`);
  }
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
