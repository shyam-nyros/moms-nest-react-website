export default function SearchPanel({ inputRef, query, onQueryChange, resultCount, onSubmit }) {
  return (
    <div className="dropdown-panel search-panel" role="search">
      <input
        ref={inputRef}
        type="search"
        placeholder="Search pickles…"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") onSubmit();
        }}
        aria-label="Search pickles"
      />
      <p className="search-hint">
        {query.trim()
          ? `${resultCount} result${resultCount === 1 ? "" : "s"} for "${query}"`
          : "Try “prawn”, “cashew”, “spicy”…"}
      </p>
    </div>
  );
}
