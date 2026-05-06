export type Dimension = "EI" | "SN" | "TF" | "JP";

export interface Question {
  id: number;
  dimension: Dimension;
  question: string;
  optionA: string;
  optionB: string;
  optionAType: string;
  optionBType: string;
}

export const questions: Question[] = [
  // ===== EI：社交能量 (9题) =====
  {
    id: 1,
    dimension: "EI",
    question: "周末刚结束一周工作，你更想怎么恢复状态？",
    optionA: "约朋友吃饭聊天，换换脑子",
    optionB: "一个人待会儿，把电量充回来",
    optionAType: "E",
    optionBType: "I",
  },
  {
    id: 2,
    dimension: "EI",
    question: "进入一个不太熟的新环境时，你通常会：",
    optionA: "先和身边的人聊几句，慢慢打开局面",
    optionB: "先观察环境和人，等熟一点再参与",
    optionAType: "E",
    optionBType: "I",
  },
  {
    id: 3,
    dimension: "EI",
    question: "群聊突然热闹起来，你更像：",
    optionA: "很自然地接话、发表看法",
    optionB: "看一会儿，想说的时候再冒泡",
    optionAType: "E",
    optionBType: "I",
  },
  {
    id: 4,
    dimension: "EI",
    question: "有烦心事的时候，你更容易：",
    optionA: "找人说一说，边聊边理清楚",
    optionB: "自己先消化，想明白后再说",
    optionAType: "E",
    optionBType: "I",
  },
  {
    id: 5,
    dimension: "EI",
    question: "一场聚会结束后，你通常更像：",
    optionA: "还有点兴奋，甚至想继续聊",
    optionB: "需要安静一会儿恢复精力",
    optionAType: "E",
    optionBType: "I",
  },
  {
    id: 6,
    dimension: "EI",
    question: "朋友临时约你出门，如果你没有别的安排，你多半会：",
    optionA: "觉得可以，出门也许会有新鲜感",
    optionB: "先犹豫一下，看自己还有没有社交电量",
    optionAType: "E",
    optionBType: "I",
  },
  {
    id: 7,
    dimension: "EI",
    question: "讨论问题时，你更常：",
    optionA: "先说出来，在交流中整理想法",
    optionB: "先在脑子里想清楚，再开口表达",
    optionAType: "E",
    optionBType: "I",
  },
  {
    id: 8,
    dimension: "EI",
    question: "你更喜欢哪种工作或学习氛围？",
    optionA: "可以随时交流、有人一起推进",
    optionB: "相对安静，能独立专注一段时间",
    optionAType: "E",
    optionBType: "I",
  },
  {
    id: 9,
    dimension: "EI",
    question: "认识新朋友这件事，对你来说更像：",
    optionA: "自然发生的事情，聊起来就熟了",
    optionB: "需要一点时间，不会太快放松",
    optionAType: "E",
    optionBType: "I",
  },

  // ===== SN：信息偏好 (9题) =====
  {
    id: 10,
    dimension: "SN",
    question: "接到一个新任务时，你更希望先知道：",
    optionA: "具体要做什么、步骤是什么",
    optionB: "这件事的目标、意义和方向",
    optionAType: "S",
    optionBType: "N",
  },
  {
    id: 11,
    dimension: "SN",
    question: "听别人讲一件事，你更容易注意到：",
    optionA: "事情的细节、顺序和具体信息",
    optionB: "背后的原因、趋势和潜在含义",
    optionAType: "S",
    optionBType: "N",
  },
  {
    id: 12,
    dimension: "SN",
    question: "面对一个没做过的事情，你更倾向：",
    optionA: "参考已有经验或成熟方法",
    optionB: "先想有没有新的可能或更好的方式",
    optionAType: "S",
    optionBType: "N",
  },
  {
    id: 13,
    dimension: "SN",
    question: "看电影或小说时，你更容易被什么吸引？",
    optionA: "人物行为、剧情细节和真实感",
    optionB: "隐喻、主题和故事背后的表达",
    optionAType: "S",
    optionBType: "N",
  },
  {
    id: 14,
    dimension: "SN",
    question: "别人讲得很抽象时，你通常会想：",
    optionA: "能不能说具体一点，到底怎么做",
    optionB: "这个想法挺有意思，还可以继续延伸",
    optionAType: "S",
    optionBType: "N",
  },
  {
    id: 15,
    dimension: "SN",
    question: "做计划时，你更在意：",
    optionA: "眼前资源、时间和可执行步骤",
    optionB: "长期方向、可能变化和整体布局",
    optionAType: "S",
    optionBType: "N",
  },
  {
    id: 16,
    dimension: "SN",
    question: "逛一个新地方时，你更常：",
    optionA: "注意路线、店铺、价格、环境这些细节",
    optionB: "感受这个地方的氛围，联想它适合什么故事",
    optionAType: "S",
    optionBType: "N",
  },
  {
    id: 17,
    dimension: "SN",
    question: "学习新知识时，你更喜欢：",
    optionA: "先看例子和操作方法",
    optionB: "先理解原理和框架",
    optionAType: "S",
    optionBType: "N",
  },
  {
    id: 18,
    dimension: "SN",
    question: "朋友提出一个大胆想法时，你第一反应更像：",
    optionA: "先判断现实条件够不够",
    optionB: "先想这个可能性有没有趣",
    optionAType: "S",
    optionBType: "N",
  },

  // ===== TF：决策方式 (9题) =====
  {
    id: 19,
    dimension: "TF",
    question: "朋友来找你吐槽时，你更自然的反应是：",
    optionA: "帮他分析问题出在哪里",
    optionB: "先接住他的情绪，让他舒服一点",
    optionAType: "T",
    optionBType: "F",
  },
  {
    id: 20,
    dimension: "TF",
    question: "做一个重要决定时，你更看重：",
    optionA: "逻辑是否成立，结果是否有效",
    optionB: "是否照顾到人和关系的感受",
    optionAType: "T",
    optionBType: "F",
  },
  {
    id: 21,
    dimension: "TF",
    question: "两个人发生争执时，你更想先：",
    optionA: "把事实和责任讲清楚",
    optionB: "先让气氛缓和下来，别继续伤人",
    optionAType: "T",
    optionBType: "F",
  },
  {
    id: 22,
    dimension: "TF",
    question: "评价一个方案时，你更容易先看：",
    optionA: "它是否高效、合理、能解决问题",
    optionB: "它会不会让相关的人感到舒服或被尊重",
    optionAType: "T",
    optionBType: "F",
  },
  {
    id: 23,
    dimension: "TF",
    question: "别人说话太直接但有道理时，你通常会：",
    optionA: "更关注他说得对不对",
    optionB: "也会在意他说话方式是否让人难受",
    optionAType: "T",
    optionBType: "F",
  },
  {
    id: 24,
    dimension: "TF",
    question: "如果朋友做错了事，你更倾向：",
    optionA: "指出问题，让事情以后别再发生",
    optionB: "注意表达方式，避免让对方太受伤",
    optionAType: "T",
    optionBType: "F",
  },
  {
    id: 25,
    dimension: "TF",
    question: "你更容易被哪种表达打动？",
    optionA: "清晰、有逻辑、能说到重点",
    optionB: "真诚、温柔、让人感觉被理解",
    optionAType: "T",
    optionBType: "F",
  },
  {
    id: 26,
    dimension: "TF",
    question: "团队合作时，你更受不了：",
    optionA: "事情没有标准，效率低下",
    optionB: "气氛很冷，大家互相不体谅",
    optionAType: "T",
    optionBType: "F",
  },
  {
    id: 27,
    dimension: "TF",
    question: "面对不同意见时，你更习惯：",
    optionA: "直接讨论观点本身是否合理",
    optionB: "先注意对方是否能接受这种沟通方式",
    optionAType: "T",
    optionBType: "F",
  },

  // ===== JP：生活节奏 (9题) =====
  {
    id: 28,
    dimension: "JP",
    question: "周末安排通常更像：",
    optionA: "提前想好大概要做什么",
    optionB: "当天看状态，想去哪儿再说",
    optionAType: "J",
    optionBType: "P",
  },
  {
    id: 29,
    dimension: "JP",
    question: "有任务没完成时，你更容易：",
    optionA: "心里挂着，想早点处理掉",
    optionB: "先放一放，到合适状态再做",
    optionAType: "J",
    optionBType: "P",
  },
  {
    id: 30,
    dimension: "JP",
    question: "旅行时，你更喜欢：",
    optionA: "有大致行程和时间安排，心里踏实",
    optionB: "保留弹性，路上发现什么就去什么",
    optionAType: "J",
    optionBType: "P",
  },
  {
    id: 31,
    dimension: "JP",
    question: "计划突然被打乱时，你通常会：",
    optionA: "有点不舒服，需要重新整理安排",
    optionB: "还好，顺着变化调整也可以",
    optionAType: "J",
    optionBType: "P",
  },
  {
    id: 32,
    dimension: "JP",
    question: "面对截止日期，你更常：",
    optionA: "尽量提前推进，避免最后太赶",
    optionB: "临近时效率更高，压力来了反而能冲",
    optionAType: "J",
    optionBType: "P",
  },
  {
    id: 33,
    dimension: "JP",
    question: "你更喜欢哪种生活状态？",
    optionA: "事情有条理，节奏比较可控",
    optionB: "自由一点，不想被安排得太满",
    optionAType: "J",
    optionBType: "P",
  },
  {
    id: 34,
    dimension: "JP",
    question: "买东西或做选择时，你更常：",
    optionA: "提前比较好，决定后就不太想改",
    optionB: "边看边改，说不定临时发现更好的",
    optionAType: "J",
    optionBType: "P",
  },
  {
    id: 35,
    dimension: "JP",
    question: "你的待办事项更像：",
    optionA: "列出来，一项项完成会很舒服",
    optionB: "放在脑子里，根据状态灵活处理",
    optionAType: "J",
    optionBType: "P",
  },
  {
    id: 36,
    dimension: "JP",
    question: "当别人临时改变约定时，你更可能：",
    optionA: "希望对方早点说，方便重新安排",
    optionB: "只要不是大问题，临时调整也能接受",
    optionAType: "J",
    optionBType: "P",
  },
];

// choice values: 2 = 更像A, 1 = 有点像A, -1 = 有点像B, -2 = 更像B
export const CHOICES = [
  { label: "更像左边", sublabel: "A 描述的就是我", value: 2 },
  { label: "有点像左边", sublabel: "A 更接近我", value: 1 },
  { label: "有点像右边", sublabel: "B 更接近我", value: -1 },
  { label: "更像右边", sublabel: "B 描述的就是我", value: -2 },
] as const;

export const STORAGE_KEYS = {
  answers: "typemind_answers",
  scores: "typemind_scores",
  result: "typemind_result",
  tendency: "typemind_tendency",
} as const;

export interface TendencyDetail {
  dimension: Dimension;
  leftType: string;
  rightType: string;
  leftScore: number;
  rightScore: number;
  winner: string;
  strength: "轻微倾向" | "明显倾向" | "强烈倾向";
}

export interface MBTIResult2 {
  type: string;
  tendencies: TendencyDetail[];
}

export function applyScore(
  scores: Record<string, number>,
  q: Question,
  choiceValue: number
): Record<string, number> {
  const next = { ...scores };
  const letter = choiceValue > 0 ? q.optionAType : q.optionBType;
  const points = Math.abs(choiceValue);
  next[letter] = (next[letter] ?? 0) + points;
  return next;
}

function getStrength(diff: number): "轻微倾向" | "明显倾向" | "强烈倾向" {
  if (diff <= 2) return "轻微倾向";
  if (diff <= 7) return "明显倾向";
  return "强烈倾向";
}

export function calculateMBTI(scores: Record<string, number>): MBTIResult2 {
  const pairs: { dim: Dimension; left: string; right: string }[] = [
    { dim: "EI", left: "E", right: "I" },
    { dim: "SN", left: "S", right: "N" },
    { dim: "TF", left: "T", right: "F" },
    { dim: "JP", left: "J", right: "P" },
  ];

  const tendencies: TendencyDetail[] = pairs.map(({ dim, left, right }) => {
    const leftScore = scores[left] ?? 0;
    const rightScore = scores[right] ?? 0;
    const diff = Math.abs(leftScore - rightScore);
    return {
      dimension: dim,
      leftType: left,
      rightType: right,
      leftScore,
      rightScore,
      winner: leftScore >= rightScore ? left : right,
      strength: getStrength(diff),
    };
  });

  const type = tendencies.map((t) => t.winner).join("");

  return { type, tendencies };
}
