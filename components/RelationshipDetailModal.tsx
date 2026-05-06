import { useEffect, useRef } from "react";

export type RelationshipDetail = {
  type: string;
  title: string;
  shortDescription: string;
  traits: string;
  why: string;
  howToGetAlong: string;
  possibleFriction: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  item: RelationshipDetail | null;
  variant: "match" | "challenge";
};

function DetailBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-slate-800">{label}</h4>
      <div className="mt-1 text-sm leading-relaxed text-slate-600">{children}</div>
    </div>
  );
}

export function RelationshipDetailModal({ open, onClose, item, variant }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm md:items-center md:p-4"
      onClick={onClose}
    >
      {/* Card */}
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl md:max-w-2xl md:rounded-3xl"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200"
          aria-label="关闭"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Header */}
        <div className={`shrink-0 px-6 pb-4 pt-8 md:px-8 md:pt-10 ${
          variant === "match" ? "bg-violet-50" : "bg-amber-50"
        }`}>
          <span className={`text-xs font-semibold ${
            variant === "match" ? "text-violet-500" : "text-amber-600"
          }`}>
            {variant === "match" ? "更容易产生默契的类型" : "更需要磨合的理解"}
          </span>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            {item.type}
          </h2>
          <p className="mt-1 text-lg font-semibold text-slate-700">{item.title}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.shortDescription}</p>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 md:px-8 md:py-6">
          <div className="space-y-5">
            <DetailBlock label="性格特点">{item.traits}</DetailBlock>
            <DetailBlock label={variant === "match" ? "为什么容易产生默契" : "为什么可能需要磨合"}>
              {item.why}
            </DetailBlock>
            <DetailBlock label="相处建议">{item.howToGetAlong}</DetailBlock>
            <DetailBlock label="可能的小摩擦">{item.possibleFriction}</DetailBlock>
          </div>
        </div>

        {/* Bottom close */}
        <div className="shrink-0 border-t border-slate-100 px-6 py-4 md:px-8">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-slate-900 py-3 text-sm font-medium text-white transition hover:bg-slate-800 active:scale-[0.98]"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
