"use client";

import { PROJECT_TYPE_LABEL, ProjectType, projects } from "../../data/projects";

export type FilterType = "all" | ProjectType;

const categoryFilters: { label: string; value: ProjectType }[] = (
  Object.keys(PROJECT_TYPE_LABEL) as ProjectType[]
).map((value) => ({
  label: PROJECT_TYPE_LABEL[value],
  value,
}));

type WorkFilterProps = {
  activeFilter: FilterType;
  filteredCount: number;
  onChange: (filter: FilterType) => void;
};

export default function WorkFilter({
  activeFilter,
  filteredCount,
  onChange,
}: WorkFilterProps) {
  return (
    <div className="work-filter">
      <div className="work-filter-left">
        <button
          type="button"
          className={`work-filter-button ${
            activeFilter === "all" ? "is-active" : ""
          }`}
          onClick={() => onChange("all")}
          data-cursor
        >
          ALL
        </button>
      </div>

      <div className="work-filter-center">
        {categoryFilters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className={`work-filter-button ${
              activeFilter === filter.value ? "is-active" : ""
            }`}
            onClick={() => onChange(filter.value)}
            data-cursor
          >
            {filter.label}
          </button>
        ))}
      </div>

      <div className="work-filter-count">
        {String(filteredCount).padStart(2, "0")}
        <span>{" / "}</span>
        {String(projects.length).padStart(2, "0")}
      </div>
    </div>
  );
}
