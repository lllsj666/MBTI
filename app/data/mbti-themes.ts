export type CampName = "分析家" | "外交家" | "守护者" | "探险家";

export interface CampTheme {
  label: CampName;
  types: string[];
  theme: {
    pageBg: string;
    cardBorder: string;
    primaryText: string;
    badge: string;
    button: string;
    softBg: string;
    heroGradient: string;
    accentDot: string;
  };
}

export const mbtiThemes: Record<string, CampTheme> = {
  analyst: {
    label: "分析家",
    types: ["INTJ", "INTP", "ENTJ", "ENTP"],
    theme: {
      pageBg: "bg-violet-50/50",
      cardBorder: "border-violet-200",
      primaryText: "text-violet-700",
      badge: "bg-violet-100 text-violet-700",
      button: "bg-violet-600 hover:bg-violet-700",
      softBg: "bg-violet-50",
      heroGradient: "from-violet-50 via-white to-purple-50",
      accentDot: "bg-violet-500",
    },
  },
  diplomat: {
    label: "外交家",
    types: ["INFJ", "INFP", "ENFJ", "ENFP"],
    theme: {
      pageBg: "bg-emerald-50/50",
      cardBorder: "border-emerald-200",
      primaryText: "text-emerald-700",
      badge: "bg-emerald-100 text-emerald-700",
      button: "bg-emerald-600 hover:bg-emerald-700",
      softBg: "bg-emerald-50",
      heroGradient: "from-emerald-50 via-white to-teal-50",
      accentDot: "bg-emerald-500",
    },
  },
  sentinel: {
    label: "守护者",
    types: ["ISTJ", "ISFJ", "ESTJ", "ESFJ"],
    theme: {
      pageBg: "bg-blue-50/50",
      cardBorder: "border-blue-200",
      primaryText: "text-blue-700",
      badge: "bg-blue-100 text-blue-700",
      button: "bg-blue-600 hover:bg-blue-700",
      softBg: "bg-blue-50",
      heroGradient: "from-blue-50 via-white to-sky-50",
      accentDot: "bg-blue-500",
    },
  },
  explorer: {
    label: "探险家",
    types: ["ISTP", "ISFP", "ESTP", "ESFP"],
    theme: {
      pageBg: "bg-amber-50/50",
      cardBorder: "border-amber-200",
      primaryText: "text-amber-700",
      badge: "bg-amber-100 text-amber-700",
      button: "bg-amber-500 hover:bg-amber-600",
      softBg: "bg-amber-50",
      heroGradient: "from-amber-50 via-white to-yellow-50",
      accentDot: "bg-amber-500",
    },
  },
};

export function getMbtiTheme(type: string): CampTheme {
  for (const camp of Object.values(mbtiThemes)) {
    if (camp.types.includes(type)) {
      return camp;
    }
  }
  return mbtiThemes.analyst;
}

export interface DimensionScore {
  dimension: string;
  label: string;
  left: { letter: string; label: string; pct: number };
  right: { letter: string; label: string; pct: number };
}

/** Generate example dimension scores for result pages without real test data */
export function getDefaultDimensionScores(type: string): DimensionScore[] {
  const letters = type.split("");
  const dims = [
    {
      dimension: "EI",
      label: "社交能量",
      left: { letter: "E", label: "外向" },
      right: { letter: "I", label: "内向" },
    },
    {
      dimension: "SN",
      label: "信息偏好",
      left: { letter: "S", label: "实感" },
      right: { letter: "N", label: "直觉" },
    },
    {
      dimension: "TF",
      label: "决策方式",
      left: { letter: "T", label: "思考" },
      right: { letter: "F", label: "情感" },
    },
    {
      dimension: "JP",
      label: "生活节奏",
      left: { letter: "J", label: "判断" },
      right: { letter: "P", label: "知觉" },
    },
  ];

  // Deterministic pct from type string char codes
  return dims.map((d, i) => {
    const winner = letters[i];
    const isLeft = winner === d.left.letter;
    const seed = (type.charCodeAt(i % 4) * 7 + i * 13) % 16;
    const winnerPct = 56 + seed;
    return {
      ...d,
      left: { ...d.left, pct: isLeft ? winnerPct : 100 - winnerPct },
      right: { ...d.right, pct: isLeft ? 100 - winnerPct : winnerPct },
    };
  });
}
