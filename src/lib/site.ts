import content from "../content/content.json";

export { content };

/** Base path with a trailing slash, e.g. "/" or "/portfolio/". */
export const base = import.meta.env.BASE_URL.endsWith("/")
  ? import.meta.env.BASE_URL
  : import.meta.env.BASE_URL + "/";

/** Absolute URL of a path on the deployed site, for canonical and share tags. */
export function absoluteUrl(path = ""): string {
  const site = (import.meta.env.SITE ?? "").replace(/\/$/, "");
  return site + base + path.replace(/^\//, "");
}

/** True when a content value is still a placeholder such as "[ADD: demo link]". */
export function isPlaceholder(value: unknown): boolean {
  return typeof value === "string" && value.trim().startsWith("[ADD:");
}

/** Split a sentence into words, keeping a running index for staggered animation. */
export function words(lines: string[]): { line: number; word: string; i: number }[][] {
  let i = 0;
  return lines.map((text, line) =>
    text.split(/\s+/).filter(Boolean).map((word) => ({ line, word, i: i++ })),
  );
}
