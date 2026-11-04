import ScrollRevealText from "./ScrollRevealText";

type EditorialSectionHeaderProps = {
  title: string;
  count: number;
  index: string;
  note: string;
  revealTitle?: boolean;
};

export default function EditorialSectionHeader({
  title,
  count,
  index,
  note,
  revealTitle = false,
}: EditorialSectionHeaderProps) {
  return (
    <div className="editorial-category-header">
      <div className="editorial-category-title">
        <h2><ScrollRevealText text={title} enabled={revealTitle} /></h2>
        <span>/ {String(count).padStart(2, "0")}</span>
      </div>

      <div className="editorial-category-right">
        <span>{note}</span>
        <span>{index}</span>
      </div>
    </div>
  );
}
