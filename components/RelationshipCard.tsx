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
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        variant === "match"
          ? "border-slate-200 bg-white"
          : "border-[#E8E4ED] bg-[#F8F7FA]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-[11px] font-medium text-slate-400">
            {variant === "match" ? "默契类型" : "磨合类型"}
          </span>
          <div className="mt-0.5 text-xl font-bold text-slate-900">{type}</div>
        </div>
        <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
          查看详情
        </span>
      </div>

      <h4 className="mt-3 text-base font-semibold text-slate-900">{title}</h4>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
        {shortDescription}
      </p>
    </button>
  );
}
