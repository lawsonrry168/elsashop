export function EditorialHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: {
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "right";
  className?: string;
}) {
  return (
    <header
      className={`editorial-heading editorial-heading--${align} ${className}`}
    >
      {index && <span className="editorial-heading__index">{index}</span>}
      <div className="editorial-heading__content">
        {eyebrow && (
          <p className="editorial-heading__eyebrow" lang="en">
            {eyebrow}
          </p>
        )}
        <h2 className="editorial-heading__title">{title}</h2>
        {description && (
          <p className="editorial-heading__desc">{description}</p>
        )}
      </div>
    </header>
  );
}

// Re-export for pages still using SectionHeading
export { EditorialHeading as SectionHeading };
