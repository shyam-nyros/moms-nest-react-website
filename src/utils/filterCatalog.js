export function filterCatalog(catalog, query) {
  if (!query.trim()) return catalog;
  const q = query.trim().toLowerCase();

  return catalog.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.category && item.category.toLowerCase().includes(q))
  );
}
