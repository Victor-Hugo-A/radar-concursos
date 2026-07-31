export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function safeFileName(name: string) {
  const onlyName = name.split(/[\\/]/).pop() || "arquivo.pdf";
  const clean = onlyName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^[-.]+|[-.]+$/g, "");
  return clean || `material-${Date.now()}.pdf`;
}

export function parseTags(value?: string | null) {
  if (!value) return [];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 20);
}

export function toDate(value?: string | null) {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}
