"use client";

import type { CSSProperties } from "react";

import type { ProjectType } from "../../data/projects";

export type FilterType = "all" | ProjectType;

/* Thứ tự hiển thị của thanh filter. */
const FILTERS: { label: string; value: FilterType }[] = [
  { label: "ALL", value: "all" },
  { label: "FILM", value: "film" },
  { label: "MOTION", value: "motion" },
  { label: "SHORT-FORM", value: "short-form" },
  { label: "PHOTOGRAPHY", value: "photography" },
];

const ACCENT = "#d3b69c";

/* Style giữ inline như bản gốc để không đổi độ ưu tiên với globals.css. */
const barStyle: CSSProperties = {
  width: "100%",
  display: "grid",
  gridTemplateColumns: FILTERS.map(() => "max-content").join(" 1px "),
  alignItems: "center",
  justifyContent: "center",
  columnGap: "22px",
  paddingTop: "36px",
};

const dividerStyle: CSSProperties = {
  display: "block",
  width: "1px",
  height: "18px",
  background: "rgba(211, 182, 156, 0.38)",
};

function buttonStyle(isActive: boolean): CSSProperties {
  return {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "34px",
    margin: 0,
    padding: 0,
    border: 0,
    background: "transparent",
    color: ACCENT,
    fontFamily: "inherit",
    fontSize: "clamp(20px, 1.55vw, 28px)",
    fontWeight: isActive ? 800 : 650,
    lineHeight: 1,
    letterSpacing: "0.025em",
    opacity: isActive ? 1 : 0.42,
    whiteSpace: "nowrap",
    cursor: "pointer",
  };
}

function underlineStyle(isActive: boolean): CSSProperties {
  return {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "-3px",
    height: "2px",
    background: isActive ? ACCENT : "transparent",
  };
}

type WorkHeaderProps = {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeCount: number;
  totalCount: number;
};

export default function WorkHeader({
  activeFilter,
  onFilterChange,
  activeCount,
  totalCount,
}: WorkHeaderProps) {
  return (
    <div className="work-final-head">
      <div className="work-final-title-row">
        <h1>SELECTED WORK</h1>

        <span>
          {String(activeCount).padStart(2, "0")}
          {" / "}
          {String(totalCount).padStart(2, "0")}
        </span>
      </div>

      {/* FILTER */}
      <div className="work-nav-inline-final" style={barStyle}>
        {FILTERS.map((filter, index) => {
          const isActive = activeFilter === filter.value;

          return (
            <FilterItem
              key={filter.value}
              label={filter.label}
              isActive={isActive}
              showDivider={index > 0}
              onClick={() => onFilterChange(filter.value)}
            />
          );
        })}
      </div>
    </div>
  );
}

function FilterItem({
  label,
  isActive,
  showDivider,
  onClick,
}: {
  label: string;
  isActive: boolean;
  showDivider: boolean;
  onClick: () => void;
}) {
  return (
    <>
      {showDivider && (
        <span
          className="work-filter-line"
          aria-hidden="true"
          style={dividerStyle}
        />
      )}

      <button
        type="button"
        onClick={onClick}
        data-cursor
        style={buttonStyle(isActive)}
      >
        <span style={{ display: "block", lineHeight: 1 }}>{label}</span>

        <span
          className="work-filter-line"
          aria-hidden="true"
          style={underlineStyle(isActive)}
        />
      </button>
    </>
  );
}
