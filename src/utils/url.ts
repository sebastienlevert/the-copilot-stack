/**
 * Generate a URL with the correct base path for the current deployment.
 * This handles both production (/) and PR preview (/preview/pr-123) paths.
 *
 * @param path - The path to generate a URL for (e.g., "/blog", "/about")
 * @returns The complete URL with base path applied
 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL || '/the-copilot-stack';

  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // Combine base and path, removing any double slashes
  const combined = `${base}${normalizedPath}`.replace(/\/+/g, '/');

  return combined;
}

/**
 * Check if a path is currently active based on the current URL.
 * This removes the base path before comparison.
 *
 * @param path - The path to check (e.g., "/blog")
 * @param currentPath - The current pathname (from Astro.url.pathname)
 * @returns True if the path is active
 */
export function isActive(path: string, currentPath: string): boolean {
  const base = import.meta.env.BASE_URL || '/the-copilot-stack';

  // Remove base from current path for comparison
  const pathWithoutBase = currentPath.replace(base, '') || '/';

  // Normalize both paths
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const normalizedCurrent = pathWithoutBase.startsWith('/') ? pathWithoutBase : `/${pathWithoutBase}`;

  return normalizedCurrent === normalizedPath || normalizedCurrent.startsWith(`${normalizedPath}/`);
}
