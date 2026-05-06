export type Dimension = "E/I" | "S/N" | "T/F" | "J/P";

export interface Question {
  id: number;
  question: string;
  dimension: Dimension;
  /** Which letter this statement leans toward when you agree */
  direction: string;
}

export const questions: Question[] = [
  // ===== E/I (9 题) =====
  {
    id: 1,
    question: "比起一个人待着，我更享受和朋友一起聊天、吃饭或出去玩。",
    dimension: "E/I",
    direction: "E",
  },
  {
    id: 2,
    question: "在聚会或活动里，我通常会主动和不认识的人搭话。",
    dimension: "E/I",
    direction: "E",
  },
  {
    id: 3,
    question: "周末如果有两天假期，我会希望至少有一天安排了社交活动。",
    dimension: "E/I",
    direction: "E",
  },
  {
    id: 4,
    question: "在群聊里，我通常是发言比较多的那个人。",
    dimension: "E/I",
    direction: "E",
  },
  {
    id: 5,
    question: "到了一个新环境，我会比较快地和人熟络起来。",
    dimension: "E/I",
    direction: "E",
  },
  {
    id: 6,
    question: "长时间社交之后，我一定要留时间给自己独处，否则会感觉很累。",
    dimension: "E/I",
    direction: "I",
  },
  {
    id: 7,
    question: "比起约朋友出门，一个人看书、看剧或散步的周末更让我舒服。",
    dimension: "E/I",
    direction: "I",
  },
  {
    id: 8,
    question: "别人觉得我话不多，在不太熟的人面前尤其安静。",
    dimension: "E/I",
    direction: "I",
  },
  {
    id: 9,
    question: "遇到烦心事时，我更倾向于自己消化而不是找人倾诉。",
    dimension: "E/I",
    direction: "I",
  },

  // ===== S/N (9 题) =====
  {
    id: 10,
    question: "比起抽象的概念和理论，我更相信看得见的事实和具体的经验。",
    dimension: "S/N",
    direction: "S",
  },
  {
    id: 11,
    question: "做一件事时，我喜欢有清晰的步骤和可参考的案例。",
    dimension: "S/N",
    direction: "S",
  },
  {
    id: 12,
    question: "我在意细节——比如房间的布置、文件格式是否统一、对方语气里的微小变化。",
    dimension: "S/N",
    direction: "S",
  },
  {
    id: 13,
    question: "我更关注当下能做什么，多于去设想太远的未来。",
    dimension: "S/N",
    direction: "S",
  },
  {
    id: 14,
    question: "听别人讲一件事时，我更想知道具体发生了什么，而不是故事背后的寓意。",
    dimension: "S/N",
    direction: "S",
  },
  {
    id: 15,
    question: "我经常沉浸在对未来的想象里，有时候会忽略眼前的琐事。",
    dimension: "S/N",
    direction: "N",
  },
  {
    id: 16,
    question: "比起一步一步跟着做，我更想先了解整件事的逻辑和可能性。",
    dimension: "S/N",
    direction: "N",
  },
  {
    id: 17,
    question: "朋友说我有时天马行空，想法跳来跳去。",
    dimension: "S/N",
    direction: "N",
  },
  {
    id: 18,
    question: "看书或看电影时，我更在意整体的氛围和隐喻，而不是具体的情节推进。",
    dimension: "S/N",
    direction: "N",
  },

  // ===== T/F (9 题) =====
  {
    id: 19,
    question: "做重要决定时，我会优先考虑逻辑和效率，人情可以往后放一放。",
    dimension: "T/F",
    direction: "T",
  },
  {
    id: 20,
    question: "朋友来找我倾诉，我的第一反应通常是帮 ta 分析问题，而不是先表达安慰。",
    dimension: "T/F",
    direction: "T",
  },
  {
    id: 21,
    question: "我觉得「对事不对人」是合理的沟通方式，算不上冷漠。",
    dimension: "T/F",
    direction: "T",
  },
  {
    id: 22,
    question: "讨论问题时如果对方的逻辑有漏洞，我会直接指出来。",
    dimension: "T/F",
    direction: "T",
  },
  {
    id: 23,
    question: "比起维护一团和气，我更希望问题能被清楚彻底地解决。",
    dimension: "T/F",
    direction: "T",
  },
  {
    id: 24,
    question: "朋友难过时，就算什么也不说只是陪着，我也觉得这很重要。",
    dimension: "T/F",
    direction: "F",
  },
  {
    id: 25,
    question: "有些决定明知道不太理智，但如果能让重要的人开心，我可能还是会做。",
    dimension: "T/F",
    direction: "F",
  },
  {
    id: 26,
    question: "我很容易被真诚的关心和温柔的善意打动，甚至会记很久。",
    dimension: "T/F",
    direction: "F",
  },
  {
    id: 27,
    question: "指出别人的问题时，我会反复斟酌措辞，担心不小心伤到对方。",
    dimension: "T/F",
    direction: "F",
  },

  // ===== J/P (9 题) =====
  {
    id: 28,
    question: "出门旅行前，我通常会提前查好路线、订好住宿、大致安排每天的行程。",
    dimension: "J/P",
    direction: "J",
  },
  {
    id: 29,
    question: "我喜欢把要做的事列成清单，做完一项划掉一项。",
    dimension: "J/P",
    direction: "J",
  },
  {
    id: 30,
    question: "一件事做完后，我喜欢整理收尾、让一切归位，才算真正结束。",
    dimension: "J/P",
    direction: "J",
  },
  {
    id: 31,
    question: "面对截止日期，我通常会提前完成，不太喜欢拖到最后。",
    dimension: "J/P",
    direction: "J",
  },
  {
    id: 32,
    question: "我对生活有一个大概的规划，大概知道自己接下来几个月要做什么。",
    dimension: "J/P",
    direction: "J",
  },
  {
    id: 33,
    question: "计划临时被打乱时，我很容易适应，甚至觉得可能会出现意外的惊喜。",
    dimension: "J/P",
    direction: "P",
  },
  {
    id: 34,
    question: "比起严格按照计划来，我更享受随性和看心情的安排。",
    dimension: "J/P",
    direction: "P",
  },
  {
    id: 35,
    question: "我的桌面或房间可能看起来有点乱，但我自己清楚东西在哪儿。",
    dimension: "J/P",
    direction: "P",
  },
  {
    id: 36,
    question: "临近截止日期时我的效率最高，那种紧迫感反而让我进入状态。",
    dimension: "J/P",
    direction: "P",
  },
];

export const OPTIONS = [
  { text: "很符合我", score: 2 },
  { text: "比较符合我", score: 1 },
  { text: "不太符合我", score: -1 },
  { text: "完全不符合我", score: -2 },
] as const;

export const STORAGE_KEYS = {
  answers: "typemind_answers",
  scores: "typemind_scores",
  result: "typemind_result",
  tendency: "typemind_tendency",
} as const;

export interface Tendency {
  letter: string;
  diff: number;
  strength: "slight" | "moderate" | "strong";
}

export interface MBTIResult2 {
  type: string;
  secondaryType: string;
  tendencies: Record<string, Tendency>;
}

/** Apply a question answer to the score map */
export function applyScore(
  scores: Record<string, number>,
  direction: string,
  optionScore: number
): Record<string, number> {
  const next = { ...scores };
  const opposite =
    direction === "E"
      ? "I"
      : direction === "I"
        ? "E"
        : direction === "S"
          ? "N"
          : direction === "N"
            ? "S"
            : direction === "T"
              ? "F"
              : direction === "F"
                ? "T"
                : direction === "J"
                  ? "P"
                  : "J";

  if (optionScore > 0) {
    next[direction] = (next[direction] ?? 0) + optionScore;
  } else {
    next[opposite] = (next[opposite] ?? 0) + Math.abs(optionScore);
  }
  return next;
}

function strengthLabel(diff: number): "slight" | "moderate" | "strong" {
  if (diff <= 3) return "slight";
  if (diff <= 7) return "moderate";
  return "strong";
}

/** Calculate final MBTI type + tendency details */
export function calculateMBTI(scores: Record<string, number>): MBTIResult2 {
  const e = scores["E"] ?? 0;
  const i = scores["I"] ?? 0;
  const s = scores["S"] ?? 0;
  const n = scores["N"] ?? 0;
  const t = scores["T"] ?? 0;
  const f = scores["F"] ?? 0;
  const j = scores["J"] ?? 0;
  const p = scores["P"] ?? 0;

  const eiLetter = e >= i ? "E" : "I";
  const snLetter = s >= n ? "S" : "N";
  const tfLetter = t >= f ? "T" : "F";
  const jpLetter = j >= p ? "J" : "P";

  const eiDiff = Math.abs(e - i);
  const snDiff = Math.abs(s - n);
  const tfDiff = Math.abs(t - f);
  const jpDiff = Math.abs(j - p);

  const type = eiLetter + snLetter + tfLetter + jpLetter;

  // Secondary type: flip the weakest dimension
  const diffs = [
    { letter: eiLetter, diff: eiDiff, opposite: eiLetter === "E" ? "I" : "E" },
    { letter: snLetter, diff: snDiff, opposite: snLetter === "S" ? "N" : "S" },
    { letter: tfLetter, diff: tfDiff, opposite: tfLetter === "T" ? "F" : "T" },
    { letter: jpLetter, diff: jpDiff, opposite: jpLetter === "J" ? "P" : "J" },
  ];
  diffs.sort((a, b) => a.diff - b.diff);
  const weakest = diffs[0];
  const secondaryType = type
    .replace(weakest.letter, weakest.opposite);

  return {
    type,
    secondaryType:
      secondaryType !== type ? secondaryType : type,
    tendencies: {
      "E/I": { letter: eiLetter, diff: eiDiff, strength: strengthLabel(eiDiff) },
      "S/N": { letter: snLetter, diff: snDiff, strength: strengthLabel(snDiff) },
      "T/F": { letter: tfLetter, diff: tfDiff, strength: strengthLabel(tfDiff) },
      "J/P": { letter: jpLetter, diff: jpDiff, strength: strengthLabel(jpDiff) },
    },
  };
}
