type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="mt-2 text-2xl font-bold tracking-tight text-[var(--text)] md:text-3xl">
        {title}
      </h2>

      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
