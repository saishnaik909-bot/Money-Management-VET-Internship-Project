import { CATEGORIES } from "../utils";

// Props: value = selected category, onChange = function to call when it changes
function FilterBar({ value, onChange }) {
  return (
    <div className="filter-bar">
      <label>
        Category:{" "}
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default FilterBar;
