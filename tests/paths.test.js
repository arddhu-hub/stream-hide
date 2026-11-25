const test = require("node:test"),
  assert = require("node:assert/strict");
const { normalizePaths, renamePaths } = require("../src/paths");
test("normalize user settings without accepting outside-vault paths", () => {
  assert.deepEqual(
    normalizePaths([
      " Notes/Secret/ ",
      "Notes\\Secret",
      "../outside",
      "C:/private",
      "/absolute",
      "",
      "Notes/../Other",
      null,
      "Worlds//City",
    ]),
    ["Notes/Secret", "Worlds/City"],
  );
  assert.deepEqual(normalizePaths(null), []);
});
test("folder rename changes descendants but not similarly named folders", () => {
  assert.deepEqual(renamePaths(["A", "A/Note.md", "AB/Other.md"], "A", "B"), [
    "B",
    "B/Note.md",
    "AB/Other.md",
  ]);
});
