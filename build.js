const fs = require("node:fs");
const helper = fs.readFileSync("src/paths.js", "utf8");
const wrapper = `(() => { const module = {exports: {}};\n${helper}\nreturn module.exports; })()`;
const source = fs
  .readFileSync("src/main.js", "utf8")
  .replace("require('./paths')", () => wrapper)
  .replace('require("./paths")', () => wrapper);
const notice = fs.readFileSync("LICENSE", "utf8") + "\n" + fs.readFileSync("ATTRIBUTION.md", "utf8") + "\n" + fs.readFileSync("third-party/File-Hider-MIT.txt", "utf8");
fs.writeFileSync("main.js", `/*\n${notice}\n*/\n${source}`);
