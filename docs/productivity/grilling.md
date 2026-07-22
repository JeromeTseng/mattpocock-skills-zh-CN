Quickstart:

```bash
npx skills add vinvcn/mattpocock-skills-zh-CN --skill=grilling
```

```bash
npx skills update grilling
```

[Source](https://github.com/vinvcn/mattpocock-skills-zh-CN/tree/main/skills/productivity/grilling)

## What it does

`grilling` 是持续访谈 loop：围绕计划、decision 或 idea，一次问一个问题，直到依赖关系和 decision tree 被走完。

它不会直接执行计划。只有当用户确认已经达成共同理解后，后续实现才应该开始。

## The decision tree

它把讨论建模为一棵 **decision tree**：每个 decision 都可能分支出依赖它的 decisions。问题会按依赖顺序逐个出现，让前面的答案能够重塑后续问题。

## When to reach for it

输入 `/grilling`，或当用户想 stress-test plan、要求被 grill，或其他 skills 需要底层访谈 primitive 时由 agent 自动触发。

当你需要 reusable interview loop 时使用它；想要 user-facing 命令入口，用 [grill-me](https://aihero.dev/skills-grill-me) 或 [grill-with-docs](https://aihero.dev/skills-grill-with-docs)。

## Where it fits

它是 model-invoked primitive，支撑 grill-me、grill-with-docs、wayfinder 等上层 workflows。完整地图见 [ask-matt](https://aihero.dev/skills-ask-matt)。
