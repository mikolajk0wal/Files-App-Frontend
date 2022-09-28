type Item = number | ">" | "<";

export const generatePaginationItems = (
  requiredPages: number,
  currentPage: number
) => {
  const items: Item[] = [];
  if (currentPage === 1) {
    items.push(1);
    for (let i = 2; i <= requiredPages; i++) {
      items.push(i);
      if (items.length > 5) break;
    }
    items.push(">");
  } else if (currentPage > 1 && currentPage < requiredPages) {
    items.push("<");

    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i === 0) continue;
      if (i - 1 === requiredPages) {
        break;
      }
      items.push(i);
      if (items.length > 5) break;
    }
    items.push(">");
  } else if (currentPage === requiredPages) {
    items.push("<");
    for (let i = currentPage - 5; i <= currentPage; i++) {
      if (i < 1) continue;
      items.push(i);
      if (items.length > 6) break;
    }
  }
  return items;
};
