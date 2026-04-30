# 翻译同步指南

本仓库使用 `.skills/translate-skill/SKILL.md` 同步上游 `mattpocock/skills` 的内容。同步时把上游当作英文内容来源，而不是 Git 历史来源；不要 merge、rebase 或导入上游 issue、PR、label、release、Actions、branch 等仓库管理状态。

推荐流程：

1. 获取或更新一份上游内容副本，例如放在相邻目录 `../skills`。
2. 对比上游和本仓库的 `README.md`、`CLAUDE.md`、`CONTEXT.md`、`skills/**`、`docs/**`、`.out-of-scope/**`。
3. 使用 `.skills/translate-skill/SKILL.md` 的规则翻译新增或变更的自然语言内容。
4. 保留目录名、skill name、frontmatter keys、命令、代码块、路径、URL、package/tool/API identifiers。
5. 用户可见的安装命令必须指向 `vinvcn/mattpocock-skills-zh-CN`，不要指向 `mattpocock/skills`。
6. 更新顶层 `README.md`、bucket `README.md` 和 `.claude-plugin/plugin.json`，确保 `engineering/`、`productivity/`、`misc/` 中的公开 skills 都可发现。
7. 运行 `node scripts/check-translation.mjs`，并用 `git diff` 人工复核 Markdown 结构、frontmatter、命令和 install paths。

如果内容是否 behavior-critical 不确定，保留原文并标记给维护者复核。

# Agent Skills For Real Engineers 中文版

这是 [`mattpocock/skills`](https://github.com/mattpocock/skills) 的简体中文本地化 fork。原项目版权归 Matt Pocock 所有，并按 MIT License 授权。本 fork 保留原始许可证，并额外提供中文翻译，方便中文用户使用。

> 说明：本项目翻译了文档和技能说明，但保留了目录名、技能名、命令、代码块和工具相关标识，以避免破坏安装和运行行为。

我每天用于真实工程工作的 agent skills，不是 vibe coding。

如果你想跟进这些 skills 的更新，以及我后续创建的新 skill，可以加入大约 60,000 名开发者订阅的 newsletter：

[订阅 Newsletter](https://www.aihero.dev/s/skills-newsletter)

## Engineering

我每天用于代码工作的 skills。

- **[diagnose](./skills/engineering/diagnose/SKILL.md)** — 面向棘手 bug 和性能回退的纪律化诊断循环：reproduce → minimise → hypothesise → instrument → fix → regression-test。

  ```
  npx skills@latest add vinvcn/mattpocock-skills-zh-CN/diagnose
  ```

- **[domain-model](./skills/engineering/domain-model/SKILL.md)** — 针对现有 domain model 盘问你的计划，收紧术语，并在决策成形时内联更新 `CONTEXT.md` 和 ADR。

  ```
  npx skills@latest add vinvcn/mattpocock-skills-zh-CN/domain-model
  ```

- **[grill-with-docs](./skills/engineering/grill-with-docs/SKILL.md)** — 对照现有 domain model 和已记录决策持续追问你的计划，收紧术语，并在决策成形时内联更新 `CONTEXT.md` 和 ADR。

  ```
  npx skills@latest add vinvcn/mattpocock-skills-zh-CN/grill-with-docs
  ```

- **[github-triage](./skills/engineering/github-triage/SKILL.md)** — 通过基于 label 的 state machine 分诊 GitHub issues。

  ```
  npx skills@latest add vinvcn/mattpocock-skills-zh-CN/github-triage
  ```

- **[improve-codebase-architecture](./skills/engineering/improve-codebase-architecture/SKILL.md)** — 根据 `CONTEXT.md` 中的 domain language 和 `docs/adr/` 中的决策，发现 codebase 中可以 deepen 的机会。

  ```
  npx skills@latest add vinvcn/mattpocock-skills-zh-CN/improve-codebase-architecture
  ```

- **[setup-matt-pocock-skills](./skills/engineering/setup-matt-pocock-skills/SKILL.md)** — 搭建 `AGENTS.md`/`CLAUDE.md` 和 `docs/agents/` 配置，让 engineering skills 知道 repo 的 issue tracker、triage labels 和 domain docs 布局。

  ```
  npx skills@latest add vinvcn/mattpocock-skills-zh-CN/setup-matt-pocock-skills
  ```

- **[tdd](./skills/engineering/tdd/SKILL.md)** — 使用 red-green-refactor 循环做 test-driven development。一次一个 vertical slice 地构建功能或修 bug。

  ```
  npx skills@latest add vinvcn/mattpocock-skills-zh-CN/tdd
  ```

- **[to-issues](./skills/engineering/to-issues/SKILL.md)** — 使用 vertical slices，把任意计划、spec 或 PRD 拆成可独立领取的 GitHub issues。

  ```
  npx skills@latest add vinvcn/mattpocock-skills-zh-CN/to-issues
  ```

- **[to-prd](./skills/engineering/to-prd/SKILL.md)** — 将当前对话上下文整理成 PRD，并作为 GitHub issue 提交。不做访谈，只综合已经讨论过的内容。

  ```
  npx skills@latest add vinvcn/mattpocock-skills-zh-CN/to-prd
  ```

- **[triage](./skills/engineering/triage/SKILL.md)** — 通过 triage roles state machine 分诊 issues，审查 incoming bugs 或 feature requests，并把工作准备给 AFK agent 或人工处理。

  ```
  npx skills@latest add vinvcn/mattpocock-skills-zh-CN/triage
  ```

- **[zoom-out](./skills/engineering/zoom-out/SKILL.md)** — 让 agent zoom out，对不熟悉的代码区域给出更广的上下文或更高层视角。

  ```
  npx skills@latest add vinvcn/mattpocock-skills-zh-CN/zoom-out
  ```

## Productivity

通用工作流工具，不限于代码。

- **[caveman](./skills/productivity/caveman/SKILL.md)** — 超压缩沟通模式。去掉废话但保留完整技术准确性，token 使用量约减少 75%。

  ```
  npx skills@latest add vinvcn/mattpocock-skills-zh-CN/caveman
  ```

- **[grill-me](./skills/productivity/grill-me/SKILL.md)** — 围绕计划或设计持续追问，直到决策树的每个分支都被解决。

  ```
  npx skills@latest add vinvcn/mattpocock-skills-zh-CN/grill-me
  ```

- **[write-a-skill](./skills/productivity/write-a-skill/SKILL.md)** — 用正确结构、progressive disclosure 和 bundled resources 创建新的 skills。

  ```
  npx skills@latest add vinvcn/mattpocock-skills-zh-CN/write-a-skill
  ```

## Misc

我保留但很少使用的工具。

- **[git-guardrails-claude-code](./skills/misc/git-guardrails-claude-code/SKILL.md)** — 设置 Claude Code hooks，在危险 git 命令（push、reset --hard、clean 等）执行前阻止它们。

  ```
  npx skills@latest add vinvcn/mattpocock-skills-zh-CN/git-guardrails-claude-code
  ```

- **[migrate-to-shoehorn](./skills/misc/migrate-to-shoehorn/SKILL.md)** — 将测试文件中的 `as` 类型断言迁移到 @total-typescript/shoehorn。

  ```
  npx skills@latest add vinvcn/mattpocock-skills-zh-CN/migrate-to-shoehorn
  ```

- **[scaffold-exercises](./skills/misc/scaffold-exercises/SKILL.md)** — 创建包含 sections、problems、solutions 和 explainers 的练习目录结构。

  ```
  npx skills@latest add vinvcn/mattpocock-skills-zh-CN/scaffold-exercises
  ```

- **[setup-pre-commit](./skills/misc/setup-pre-commit/SKILL.md)** — 设置 Husky pre-commit hooks，集成 lint-staged、Prettier、type checking 和 tests。

  ```
  npx skills@latest add vinvcn/mattpocock-skills-zh-CN/setup-pre-commit
  ```
