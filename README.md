# Matt Pocock Agent Skills 中文版

这是 [`mattpocock/skills`](https://github.com/mattpocock/skills) 的简体中文本地化版本。文档和 skill instructions 已本地化；目录名、skill names、命令、代码块、路径、URLs、package/tool/API identifiers 和行为关键 labels 保持不变，以免破坏安装和运行行为。

本仓库按内容刷新方式同步上游，不同步上游 Git 历史或仓库管理状态。维护规则见 [`.skills/translate-skill/SKILL.md`](./.skills/translate-skill/SKILL.md)。

## 30 秒安装

```bash
npx skills@latest add vinvcn/mattpocock-skills-zh-CN
```

选择你想安装的 skills，以及要安装到哪些 coding agents。首次安装时，请确保选择 [`/setup-matt-pocock-skills`](./skills/engineering/setup-matt-pocock-skills/SKILL.md)，然后在 agent 中运行它来配置 issue tracker、triage labels 和 docs 目录。

[![skills.sh](https://skills.sh/b/vinvcn/mattpocock-skills-zh-CN)](https://skills.sh/vinvcn/mattpocock-skills-zh-CN)

<p>
  <a href="https://www.aihero.dev/s/skills-newsletter">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/total-typescript/image/upload/v1777382277/skills-repo-dark_2x.png">
      <source media="(prefers-color-scheme: light)" srcset="https://res.cloudinary.com/total-typescript/image/upload/v1777382277/skill-repo-light_2x.png">
      <img alt="Skills" src="https://res.cloudinary.com/total-typescript/image/upload/v1777382277/skill-repo-light_2x.png" width="369">
    </picture>
  </a>
</p>

## 为什么这些 Skills 存在

这些是 Matt Pocock 日常用于真实工程工作的 agent skills，不是 vibe coding。

开发真实应用很难。GSD、BMAD、Spec-Kit 这类方法试图通过接管流程来帮你，但它们也会拿走你的控制权，并让流程里的 bug 更难解决。

这些 skills 被设计得小、易改、可组合，适用于任何模型，并建立在多年工程经验之上。你可以修改它们，让它们变成自己的东西。

核心失败模式：

- **Agent 没做你真正想要的东西。** 用 `/grill-me` 或 `/grill-with-docs` 在开始前对齐。
- **Agent 太啰嗦。** 用 `/domain-modeling` 建立 shared language，让术语和代码表达一致。
- **代码跑不起来。** 用 `/tdd` 和 `/diagnosing-bugs` 建立真实 feedback loops。
- **Codebase 变成 ball of mud。** 用 `/codebase-design` 和 `/improve-codebase-architecture` 持续关注 module depth、interface、seam、leverage 和 locality。

## Invocation 分类

这些 skills 按 **谁能调用它们** 分组：

- **User-invoked** skills 只有在你显式输入名称时才会运行，主要用于编排。
- **Model-invoked** skills 既可以由你输入名称，也可以由 agent 在任务匹配时自动触达，主要承载可复用纪律。

一个 user-invoked skill 可以调用 model-invoked skills，但不能调用另一个 user-invoked skill。完整定义见 [docs/invocation.md](./docs/invocation.md)。

## Reference

### Engineering

我每天用于代码工作的 skills。

**User-invoked**

- **[ask-matt](./skills/engineering/ask-matt/SKILL.md)** - 询问当前情境适合哪个 skill 或 flow；它是本仓库 user-invoked skills 的 router。
- **[grill-with-docs](./skills/engineering/grill-with-docs/SKILL.md)** - 追问式访谈，同时构建项目的 domain model、打磨术语，并内联更新 `CONTEXT.md` 与 ADRs。
- **[triage](./skills/engineering/triage/SKILL.md)** - 通过 triage roles state machine 推进 issues。
- **[improve-codebase-architecture](./skills/engineering/improve-codebase-architecture/SKILL.md)** - 扫描 codebase 中的 deepening opportunities，生成可视化 HTML report，然后围绕你选中的候选项继续 grilling。
- **[setup-matt-pocock-skills](./skills/engineering/setup-matt-pocock-skills/SKILL.md)** - 配置 issue tracker、triage labels 和 domain docs 布局。每个 repo 运行一次。
- **[to-issues](./skills/engineering/to-issues/SKILL.md)** - 用 vertical slices 把计划、spec 或 PRD 拆成可独立领取的 issues。
- **[to-prd](./skills/engineering/to-prd/SKILL.md)** - 把当前对话整理成 PRD 并发布到 issue tracker。
- **[prototype](./skills/engineering/prototype/SKILL.md)** - 构建 throwaway prototype，回答 state/business-logic 问题或探索 UI 变体。
- **[implement](./skills/engineering/implement/SKILL.md)** - 基于 PRD 或 issue 集合实现一段工作。

**Model-invoked**

- **[diagnosing-bugs](./skills/engineering/diagnosing-bugs/SKILL.md)** - 面向棘手 bug 和性能回退的纪律化诊断循环：reproduce -> minimise -> hypothesise -> instrument -> fix -> regression-test。
- **[tdd](./skills/engineering/tdd/SKILL.md)** - 使用 red-green-refactor 循环做 test-driven development。
- **[domain-modeling](./skills/engineering/domain-modeling/SKILL.md)** - 主动构建和打磨项目 domain model：挑战术语、构造场景、更新 `CONTEXT.md` 和 ADRs。
- **[codebase-design](./skills/engineering/codebase-design/SKILL.md)** - 设计 deep modules 的共享纪律和词汇：small interface、clean seam、通过 interface 测试。
- **[resolving-merge-conflicts](./skills/engineering/resolving-merge-conflicts/SKILL.md)** - 解决正在进行的 git merge/rebase conflicts。

### Productivity

通用工作流工具，不限于代码。

**User-invoked**

- **[grill-me](./skills/productivity/grill-me/SKILL.md)** - 围绕计划或设计进行持续追问，直到 decision tree 的每个分支都被解决。
- **[handoff](./skills/productivity/handoff/SKILL.md)** - 把当前对话压缩成 handoff document，让另一个 agent 可以继续。
- **[teach](./skills/productivity/teach/SKILL.md)** - 使用当前目录作为 stateful teaching workspace，在多个 sessions 中教用户一个新 skill 或概念。
- **[writing-great-skills](./skills/productivity/writing-great-skills/SKILL.md)** - 编写和编辑优秀 skills 的 reference：让 skill 可预测的词汇和原则。

**Model-invoked**

- **[grilling](./skills/productivity/grilling/SKILL.md)** - 围绕计划或设计持续访谈用户，直到 decision tree 的每个分支都被解决。

### Misc

保留但很少使用的工具。

- **[git-guardrails-claude-code](./skills/misc/git-guardrails-claude-code/SKILL.md)** - 设置 Claude Code hooks，在危险 git 命令执行前阻止它们。
- **[migrate-to-shoehorn](./skills/misc/migrate-to-shoehorn/SKILL.md)** - 将测试文件中的 `as` 类型断言迁移到 @total-typescript/shoehorn。
- **[scaffold-exercises](./skills/misc/scaffold-exercises/SKILL.md)** - 创建包含 sections、problems、solutions 和 explainers 的练习目录结构。
- **[setup-pre-commit](./skills/misc/setup-pre-commit/SKILL.md)** - 设置 Husky pre-commit hooks，集成 lint-staged、Prettier、type checking 和 tests。

## 发布记录与验证

### 发布记录

- 2026-06-29：同步上游 `mattpocock/skills@5d78bd0`，本地提交待维护者创建。新增 `ask-matt`、`codebase-design`、`domain-modeling`、`diagnosing-bugs`、`grilling`、`writing-great-skills` 等内容，移除公开的 `caveman`、`zoom-out`、`write-a-skill`，并按 User-invoked / Model-invoked 刷新索引。
- 2026-06-16：同步上游 `mattpocock/skills@694fa30`，本地提交 `6b594d2`。将 `teach` 从 in-progress 提升到 productivity，并更新 teaching workspace 指南。
- 2026-06-05：同步上游 `mattpocock/skills@aaf2453`，本地提交 `0f36f6d`。更新 `to-prd` 的 seam-based 测试决策指导，并强化 in-progress `teach` explainers。
- 2026-05-29：同步上游 `mattpocock/skills@e3b90b5`，本地提交 `fb2000f`。新增 in-progress `teach` skill 中文翻译，并更新 `CONTEXT.md` template 规则。
- 2026-05-22：同步上游 `mattpocock/skills@b8be62f`，本地提交 `f0b4bd3`。新增 architecture HTML report 指南，更新 handoff 临时文件与 redaction 规则，并收紧 `CONTEXT.md` template。
- 2026-05-15：同步上游 `mattpocock/skills@e74f006`，本地提交 `c323a74`。收紧 `CONTEXT.md` glossary 边界，并更新 `prototype` 设计细化表述。
- 2026-05-11：同步上游 `mattpocock/skills@9f2e0bd`，本地提交 `210cbac`。将 `handoff` 提升到 productivity，新增 `review` 草稿，并更新 writing skills。
- 2026-05-09：同步上游 `mattpocock/skills@733d312`，本地提交 `c9fe120`。新增 `prototype` 与 `in-progress` 内容的中文翻译，并更新公开 skill 索引。

### 最新 main 验证

针对 `mattpocock/skills@5d78bd0` 的同步结果：

- [x] 安装命令保持指向 `vinvcn/mattpocock-skills-zh-CN`。
- [x] 公开 skill 索引一致：`engineering/`、`productivity/`、`misc/` 已同步到顶层 README 和 `.claude-plugin/plugin.json`；`personal/`、`in-progress/`、`deprecated/` 未进入 plugin 或顶层公开索引。
- [x] 顶层 README skill 条目均链接到对应 `SKILL.md`。
- [x] 新增和变更的 prose-bearing files 已按 skill-guided content localization 翻译；代码块、命令、路径、URLs 和 identifiers 保持行为关键内容不变。
- [!] 当前环境没有可用 `git` 命令，无法运行依赖 `git ls-files` / `git diff` 的仓库脚本；已改用文件列表和索引规则做本轮人工一致性检查。
