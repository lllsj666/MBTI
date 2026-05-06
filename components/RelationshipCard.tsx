import { getMbtiTheme } from "@/app/data/mbti-themes";

type RelationshipCardProps = {
  type: string;
  title: string;
  shortDescription: string;
  variant?: "match" | "challenge";
  onClick: () => void;
};

export function RelationshipCard({
  type,
  title,
  shortDescription,
  variant = "match",
  onClick,
}: RelationshipCardProps) {
  const camp = getMbtiTheme(type);
  const t = camp.theme;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex min-h-[170px] w-full flex-col rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        variant === "match"
          ? `bg-white ${t.cardBorder}`
          : "border-[#E8E4ED] bg-[#F8F7FA]"
      }`}
    >
      {/* Top: type + badge */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[11px] font-medium text-slate-400">
            {variant === "match" ? "默契类型" : "磨合类型"}
          </span>
          <div className={`mt-0.5 text-xl font-bold tracking-tight ${t.primaryText}`}>
            {type}
          </div>
        </div>
        <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[10px] text-slate-500 transition group-hover:border-slate-300">
          详情
        </span>
      </div>

      {/* Middle: title + description */}
      <h4 className="mt-2.5 text-sm font-semibold text-slate-800">{title}</h4>
      <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
        {shortDescription}
      </p>

      {/* Bottom spacer pushes content up */}
      <div className="mt-auto" />
    </button>
  );
}
