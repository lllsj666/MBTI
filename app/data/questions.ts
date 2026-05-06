export interface Question {
  id: number;
  question: string;
  options: { text: string; value: string }[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: "参加一场热闹聚会后，你通常会？",
    options: [
      { text: "感觉被点燃，还想继续聊天认识新人", value: "E" },
      { text: "觉得需要独处一会儿恢复能量", value: "I" },
    ],
  },
  {
    id: 2,
    question: "面对一个新机会时，你更容易？",
    options: [
      { text: "先和别人聊聊，在交流中找到方向", value: "E" },
      { text: "先自己想清楚，再决定要不要行动", value: "I" },
    ],
  },
  {
    id: 3,
    question: "你更喜欢哪种工作方式？",
    options: [
      { text: "与团队协作、边讨论边推进", value: "E" },
      { text: "独立完成，有安静的思考空间", value: "I" },
    ],
  },
  {
    id: 4,
    question: "当你遇到压力时，你更倾向于？",
    options: [
      { text: "找朋友倾诉，说出来就轻松很多", value: "E" },
      { text: "自己消化，等想清楚后再表达", value: "I" },
    ],
  },
  {
    id: 5,
    question: "在社交关系中，你通常是？",
    options: [
      { text: "主动开启话题，让气氛活跃起来", value: "E" },
      { text: "慢热观察，熟悉后才真正打开", value: "I" },
    ],
  },
  {
    id: 6,
    question: "你更相信哪类信息？",
    options: [
      { text: "具体事实、经验和已经验证过的方法", value: "S" },
      { text: "直觉判断、趋势和未来可能性", value: "N" },
    ],
  },
  {
    id: 7,
    question: "学习新东西时，你更喜欢？",
    options: [
      { text: "一步一步学，有清楚的案例和操作方法", value: "S" },
      { text: "先理解整体框架，再自由探索", value: "N" },
    ],
  },
  {
    id: 8,
    question: "做计划时，你更关注？",
    options: [
      { text: "现实条件、资源和当下能执行的步骤", value: "S" },
      { text: "未来空间、潜在机会和长期可能性", value: "N" },
    ],
  },
  {
    id: 9,
    question: "你看待一个人时，更容易注意到？",
    options: [
      { text: "他的行为、细节和实际表现", value: "S" },
      { text: "他的潜力、动机和隐藏特质", value: "N" },
    ],
  },
  {
    id: 10,
    question: "面对未知的事情，你通常会？",
    options: [
      { text: "先收集资料，确认可行性再行动", value: "S" },
      { text: "被可能性吸引，愿意边做边探索", value: "N" },
    ],
  },
  {
    id: 11,
    question: "做重要决定时，你更看重？",
    options: [
      { text: "逻辑是否成立，结果是否高效", value: "T" },
      { text: "感受是否舒服，关系是否被照顾", value: "F" },
    ],
  },
  {
    id: 12,
    question: "当朋友向你倾诉问题时，你通常会？",
    options: [
      { text: "帮他分析原因，提出解决方案", value: "T" },
      { text: "先理解他的情绪，陪他把感受说完", value: "F" },
    ],
  },
  {
    id: 13,
    question: "在冲突中，你更希望？",
    options: [
      { text: "把问题讲清楚，找到最合理的处理方式", value: "T" },
      { text: "先缓和情绪，避免关系受到伤害", value: "F" },
    ],
  },
  {
    id: 14,
    question: "评价一件事时，你更倾向于？",
    options: [
      { text: "看标准、原则和客观结果", value: "T" },
      { text: "看处境、情感和人的感受", value: "F" },
    ],
  },
  {
    id: 15,
    question: "如果必须拒绝别人，你会？",
    options: [
      { text: "直接说明理由，尽量清楚明确", value: "T" },
      { text: "尽量委婉表达，避免让对方难受", value: "F" },
    ],
  },
  {
    id: 16,
    question: "你更喜欢怎样安排生活？",
    options: [
      { text: "提前规划，知道接下来要做什么", value: "J" },
      { text: "保持弹性，随时根据状态调整", value: "P" },
    ],
  },
  {
    id: 17,
    question: "面对截止日期，你通常会？",
    options: [
      { text: "提前完成，避免最后一刻赶工", value: "J" },
      { text: "临近截止时效率最高", value: "P" },
    ],
  },
  {
    id: 18,
    question: "旅行时，你更喜欢？",
    options: [
      { text: "提前订好行程、住宿和路线", value: "J" },
      { text: "大概确定方向，其他随心安排", value: "P" },
    ],
  },
  {
    id: 19,
    question: "你的桌面或生活空间通常？",
    options: [
      { text: "比较有秩序，东西最好放在固定位置", value: "J" },
      { text: "不一定整齐，但自己知道东西在哪里", value: "P" },
    ],
  },
  {
    id: 20,
    question: "当计划被打乱时，你通常会？",
    options: [
      { text: "有点不舒服，希望尽快重新确定安排", value: "J" },
      { text: "觉得没关系，也许会出现新的可能", value: "P" },
    ],
  },
];

export const STORAGE_KEYS = {
  answers: "typemind_answers",
  scores: "typemind_scores",
  result: "typemind_result",
} as const;

export function calculateMBTI(scores: Record<string, number>): string {
  const e = scores["E"] ?? 0;
  const i = scores["I"] ?? 0;
  const s = scores["S"] ?? 0;
  const n = scores["N"] ?? 0;
  const t = scores["T"] ?? 0;
  const f = scores["F"] ?? 0;
  const j = scores["J"] ?? 0;
  const p = scores["P"] ?? 0;

  const type =
    (e >= i ? "E" : "I") +
    (s >= n ? "S" : "N") +
    (t >= f ? "T" : "F") +
    (j >= p ? "J" : "P");

  return type;
}
