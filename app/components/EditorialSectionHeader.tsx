type EditorialSectionHeaderProps = {
  title: string;
  count: number;
  index: string;
  note: string;
};

export default function EditorialSectionHeader({
  title,
  count,
  index,
  note,
}: EditorialSectionHeaderProps) {
  return (
    <div className="editorial-category-header">
      <div className="editorial-category-title">
        <h2>{title}</h2>
        <span>/ {String(count).padStart(2, "0")}</span>
      </div>

      <div className="editorial-category-right">
        <span>{note}</span>
        <span>{index}</span>
      </div>
    </div>
  );
}
