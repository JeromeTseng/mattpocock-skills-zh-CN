---
name: ask-matt
description: 询问当前情境适合哪个 skill 或 flow；它是本仓库 user-invoked skills 的 router。
disable-model-invocation: true
---

# Ask Matt

你不需要记住每个 skill，所以直接问。

**Flow** 是穿过 skills 的一条路径。大多数路径沿着一条 **main flow** 前进，两个 **on-ramps** 会并入它。其他内容都是 standalone。

## Main flow: idea -> ship

这是大多数工作的路线：你有一个想法，并希望把它构建出来。

1. **`/grill-with-docs`** - 通过访谈打磨想法。有 codebase 时从这里开始：它是 stateful 的，会把学到的内容保存在 `CONTEXT.md` 和 ADRs 中。（没有 codebase？用 `/grill-me`，见 Standalone。）
2. **分支 - 能否在对话中解决所有问题？** 如果某个问题需要可运行的答案（state、business logic，或必须亲眼看到的 UI），就通过 prototype 绕行，并用 **`/handoff`** 在两个方向桥接（见 Crossing sessions）：
   - **`/handoff`** 导出，然后基于该文件打开新 session；
   - **`/prototype`** 用 throwaway code 回答问题；
   - **`/handoff`** 把学到的内容带回来，并在原始 idea thread 中引用它。
3. **分支 - 这是 multi-session build 吗？**
   - **是** -> **`/to-prd`**（把 thread 变成 PRD）-> **`/to-issues`**（把 PRD 拆成可独立领取的 issues）。因为 issues 彼此独立，**每个 issue 之间都要清空 context**：每个 issue 启动一个 fresh session，把 PRD 和单个 issue 传给 **`/implement`**。
   - **否** -> 在当前 context window 里直接运行 **`/implement`**。

### Context hygiene

步骤 1 到 `/to-issues` 要留在 **同一个未中断的 context window** 中；不要 compact 或 clear，这样 grilling、PRD 和 issues 才能建立在同一组思考之上。之后每个 `/implement` 都从 fresh session 开始，只基于对应 issue 工作。

限制来自 **[smart zone](https://www.aihero.dev/ai-coding-dictionary/smart-zone)**：在该窗口（最新模型大约 120k tokens）内，模型还能保持敏锐推理。如果 session 在 `/to-issues` 前接近这个区间，不要硬撑降级状态；用 `/handoff`，然后在 fresh thread 中继续。

## On-ramps

起点会生成工作，然后并入 main flow。

- **Bugs 和 requests 堆积** -> **`/triage`**。它通过 triage roles 推进 issues，并产出 agent-ready issues，之后由 **`/implement`** 领取。

  Triage 只用于 **不是你创建的** issues：bug reports、incoming feature requests，以及任何原始进入的内容。`/to-issues` 产出的 issues 已经是 agent-ready，不要再 triage。

## Codebase health

这不是 feature work，而是维护。

- **`/improve-codebase-architecture`** - 有空时运行，保持 codebase 适合 agents 操作。它会暴露 deepening opportunities；选择其中一个会生成一个 idea，可以带入 main flow 的 `/grill-with-docs`。

## Crossing sessions

- **`/handoff`** - 当 thread 快满，或需要分支到另一个 session（例如 `/prototype` session）时，把对话压缩成 markdown 文件。你不会在原地继续，而是 **打开新 session 并引用该文件** 来带过 context。它是 context windows 之间的桥，两个方向都能用。想要 **fresh session** 但又要 **保留当前对话** 时使用。
- **`/compact`**（内置）- 留在 **同一个对话** 中，让早先 turns 被总结。只在阶段之间的明确断点使用；不要在阶段中途 compact，否则 agent 可能迷路。`/handoff` 是分叉；`/compact` 是继续。

## Standalone

完全在 main flow 之外。

- **`/grill-me`** - 与 `/grill-with-docs` 一样的持续访谈，但用于 **没有 codebase** 的情境。它是 stateless 的：不在本地保存内容，也不构建 `CONTEXT.md`。用它来打磨任何不属于 repo 的计划或设计。
- **`/teach`** - 使用当前目录作为 stateful workspace，跨多个 sessions 学习一个概念。
- **`/writing-great-skills`** - 编写和编辑 skills 的 reference。

## Precondition

**`/setup-matt-pocock-skills`** - 第一次运行 engineering flow 前先执行，用来配置其他 skills 所依赖的 issue tracker、triage labels 和 docs layout。自定义 issue trackers 也可以。
