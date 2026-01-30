export const slugify = (value) => {
  if (!value) {
    return "product";
  }

  const normalized = value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "product";
};

export const buildProductSlug = (name) => {
  const base = slugify(name);
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base}-${suffix}`;
};
