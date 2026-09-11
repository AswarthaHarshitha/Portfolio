export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Prefixes a public/ asset path with the configured base URL — plain string
 * literals like "/images/foo.png" are NOT rewritten by Vite's `base` config
 * (only paths from actual imports and index.html are), so anything in public/
 * referenced as a raw string needs to go through this to still resolve once
 * deployed under a subpath (e.g. GitHub Pages' /Portfolio/). */
export function withBase(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}
