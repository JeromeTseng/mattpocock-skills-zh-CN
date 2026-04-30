# Agent Skills For Real Engineers 中文版

这是 [`mattpocock/skills`](https://github.com/mattpocock/skills) 的简体中文本地化 fork。原项目版权归 Matt Pocock 所有，并按 MIT License 授权。本 fork 保留原始许可证，并额外提供中文翻译，方便中文用户使用。

> 说明：本项目翻译了文档和技能说明，但保留了目录名、技能名、命令、代码块和工具相关标识，以避免破坏安装和运行行为。

我每天用于真实工程工作的 agent skills，不是 vibe coding。

## 维护翻译

本仓库使用内容刷新工作流跟进上游 `mattpocock/skills`，不会同步上游 Git 历史、issue、PR、label、release 或仓库设置。

维护者可以运行：

```sh
node scripts/refresh-content.mjs --upstream-dir ../skills
```

详见 [翻译内容刷新工作流](./docs/translation-refresh.md) 和 [Translation Refresh Harness](./TRANSLATION_REFRESH_HARNESS.md)。

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

- **[github-triage](./skills/engineering/github-triage/SKILL.md)** — 通过基于 label 的 state machine 分诊 GitHub issues。

  ```
  npx skills@latest add vinvcn/mattpocock-skills-zh-CN/github-triage
  ```

- **[improve-codebase-architecture](./skills/engineering/improve-codebase-architecture/SKILL.md)** — 根据 `CONTEXT.md` 中的 domain language 和 `docs/adr/` 中的决策，发现 codebase 中可以 deepen 的机会。

  ```
  npx skills@latest add vinvcn/mattpocock-skills-zh-CN/improve-codebase-architecture
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
