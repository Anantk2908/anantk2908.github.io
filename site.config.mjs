// The only two values that depend on where the site is hosted.
//
// User site    (repo named <username>.github.io):  base = "/"
// Project site (any other repo name):              base = "/<repo-name>/"
//
// Both can also be set from the environment without editing this file:
//   SITE_URL=https://example.com SITE_BASE=/portfolio/ npm run build

export const SITE_URL = process.env.SITE_URL ?? "https://anantk2908.github.io";
export const SITE_BASE = process.env.SITE_BASE ?? "/";
