// utils/formatDate.ts
export function formatDate(d?: string) {
  if (!d) return "error";

  return new Date(d).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}