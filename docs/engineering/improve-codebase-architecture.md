Quickstart:

```bash
npx skills add vinvcn/mattpocock-skills-zh-CN --skill=improve-codebase-architecture
```

```bash
npx skills update improve-codebase-architecture
```

[Source](https://github.com/vinvcn/mattpocock-skills-zh-CN/tree/main/skills/engineering/improve-codebase-architecture)

## What it does

`improve-codebase-architecture` 扫描 codebase，寻找可以 deepen 的机会，并把候选项呈现成可视化 HTML report。

它不是随手 refactor。它先发现 high-leverage candidates，再围绕你选中的候选项继续 grilling，让改进有明确理由和边界。

除非你指定区域，否则它会先读取最近的 commits，把扫描重点放在开发仍然频繁落地的 code 上。Deepening 的收益是让未来修改更容易，因此最近仍在变化的 repo 区域权重更高。

## When to reach for it

你通过输入 `/improve-codebase-architecture` 调用它；agent 不会自行触发。

当 codebase 变得难改、agents 难以导航，或你想定期做 architecture upkeep 时使用它。具体 module shape 的词汇来自 [codebase-design](https://aihero.dev/skills-codebase-design)。

## Deepening opportunities

核心词是 **deepening**：让 module 通过更小 interface 暴露更多稳定行为，提高 locality 和 leverage。它寻找的是值得进入 main flow 的 idea，而不是直接改代码。

## Where it fits

它是 codebase health lane。选中一个 opportunity 后，[grilling](https://aihero.dev/skills-grilling) 会沿 decision tree 继续打磨，通常再把它带入 [grill-with-docs](https://aihero.dev/skills-grill-with-docs) 和 main chain。完整地图见 [ask-matt](https://aihero.dev/skills-ask-matt)。
