---
name: decision-mapping
description: 把松散想法转成一张有顺序的 investigation tickets map，然后逐个推进到解决。
disable-model-invocation: true
---

当一个松散想法需要超过一个 agent session 才能变成 plan 时，调用这个 skill。它会在 markdown file 中创建 stateful decision map，并带用户按 ticket 顺序解决 open questions；这些问题可能需要 prototyping、research 或 discussion。

## The Decision Map

Decision map 是一个紧凑 Markdown file，每个 planning effort 一个，并随项目被 git-tracked。它是 canonical artifact：**每个 session 都会把整张 map 加载为 context**，所以它必须保持紧凑。

Tickets 期间创建的 assets 应从 map 链接过去，不要复制进 map。

### Structure

编号 entries（"tickets"），每个独立 section，以编号为 key：

```markdown
## #1: Relational Or Non-Relational Database?

Blocked by: #<ticket-number>, #<ticket-number>
Type: Research | Prototype | Grilling

### Question

<question-here>

### Answer

<answer-here>
```

每个 ticket 的大小必须适合一个 100K token agent session。

## Ticket Types

三类 tickets：

- **Research**：阅读 documentation、third-party APIs，或 knowledge bases 等 local resources。创建 markdown summary 作为 asset。当需要当前工作目录外的知识时使用。
- **Prototype**：编写 UI 或 logic code 来测试 hypothesis，或探索 design space。使用 `/prototype` skill。创建 prototype 作为 asset。当核心问题是 "how should it look" 或 "how should it behave" 时使用。
- **Grilling**：与 agent 对话。使用 `/grilling` 和 `/domain-modeling` skills。一次问一个问题。默认类型。

## Fog of war

Map 在 frontier 之外是 _有意_ 不完整的。你的工作是调查 frontier，并按顺序解决 tickets 来推动 frontier 前进。一次推进一个 node，推开 fog of war。

到某个时刻，fog of war 会被推得足够远，通往 finish line 的路径会变清楚。那时不再需要更多 tickets，decision map 可视为 done。

## Invocation

两种调用方式：**bootstrap** 和 **resume**。

### Bootstrap

用户带着松散想法调用。

1. 运行 `/grilling` + `/domain-modeling` session，浮现 open decisions。一次问一个问题。
2. 写一张新的 decision map：大部分是 fog，frontier 已识别，显然可决定的 entries 内联解决。
3. 停止。建 map 是一个 session 的工作；不要同时解决 tickets。

### Resume

用户提供 existing map path 和 ticket number。

1. 把 **whole map** 作为 context 加载。
2. 运行一个 session 解决该 ticket，按需调用 skills。不确定时使用 `/grilling` 和 `/domain-modeling`。
3. 在 ticket body 中记录本 session 解决了什么。
4. 添加新发现的 tickets（带正确 `blocked_by` edges）。
5. 停止。

如果新 decisions 使 map 其他部分失效，更新或删除那些 nodes。

## Parallelism

用户可能选择并行运行 tickets，所以要预期其他 agents 会修改 map。

## Skipping The Decision Map

很多时候，初始 grilling 不会产生 fog of war：没有未解决 tickets，也就没有别的要做，只剩 implement。

这种情况下，应让用户选择跳过 decision map，因为只有 multi-session decisions 才需要它。

如果用户跳过，建议直接 implement，或使用 `/to-prd` 安排 multi-session implementation。
