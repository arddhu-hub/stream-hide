// Vault-relative paths only. Never import a user's local plugin data into a release.
function normalizePaths(value) {
  if (!Array.isArray(value)) return [];
  return [
    ...new Set(
      value
        .filter((p) => typeof p === "string")
        .map((p) =>
          p
            .trim()
            .replace(/\\/g, "/")
            .replace(/\/{2,}/g, "/")
            .replace(/\/$/, ""),
        )
        .filter(
          (p) =>
            p &&
            !p.startsWith("/") &&
            !/^[a-z]:/i.test(p) &&
            !p.split("/").some((part) => part === ".." || part === "."),
        ),
    ),
  ];
}
function renamePaths(paths, oldPath, newPath) {
  return normalizePaths(
    paths.map((p) =>
      p === oldPath
        ? newPath
        : p.startsWith(oldPath + "/")
          ? newPath + p.slice(oldPath.length)
          : p,
    ),
  );
}
module.exports = { normalizePaths, renamePaths };
