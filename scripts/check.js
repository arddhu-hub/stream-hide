const fs = require("node:fs"),
  cp = require("node:child_process");
const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf8"));
const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
if (
  manifest.version !== pkg.version ||
  !/^\d+\.\d+\.\d+$/.test(manifest.version)
)
  throw Error("Version mismatch");
for (const file of ["main.js", "build.js"])
  cp.execFileSync(process.execPath, ["--check", file], { stdio: "inherit" });
for (const file of ["README.md", "LICENSE", "ATTRIBUTION.md", "versions.json"])
  if (!fs.existsSync(file)) throw Error("Missing " + file);
if (
  process.env.GITHUB_REF_TYPE === "tag" &&
  process.env.GITHUB_REF_NAME !== manifest.version
)
  throw Error("Tag must equal manifest version (no v prefix)");
console.log("Release metadata and JavaScript syntax OK");
