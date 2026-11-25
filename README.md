# Stream Hide

[Português](README.pt-BR.md) · [Origin and credits](ATTRIBUTION.md)

Toggle a separate list of files and folders out of Obsidian's file explorer
when streaming. Use the video ribbon button or the command palette, add/remove
items from their context menu, or edit one vault-relative path per line in settings.
Renaming a tracked folder updates its tracked descendants. The initial list is
empty and hiding starts off. The list is independent of File Hider's settings.

**This only hides entries in the file explorer.** Search, backlinks, open tabs,
quick switcher, other plugins and the underlying files remain accessible. It is
a presentation aid, not access control or a guarantee against showing a note on stream.

## Install and migrate

Desktop Obsidian 1.15.1 or newer. Download `main.js` and `manifest.json` from a
release into `<vault>/.obsidian/plugins/stream-hide/` and enable it. Or build using
`npm ci && npm run build`. This initial release is desktop-only; mobile has not
been tested. It relies on file-explorer DOM selectors and CSS `:has()`, which
custom themes or future Obsidian changes may affect. Pop-out windows are not supported.
It has not yet been accepted into the community directory.

For users of the earlier local **Stream Mode** (`urdh-file-hider-live`), disable
the old plugin before enabling this one. Copy the relative-path list through
settings; or, with both plugins disabled, copy the old `data.json` into the new
plugin directory. Keep the old folder until you confirm your settings migrated.
No user settings are bundled or migrated automatically. Do not enable both variants.

## Data and origin

Only local settings are stored, in the plugin's `data.json` inside the vault.
No network, telemetry, AI calls, outside-vault file access or external accounts.
The plugin neither deletes nor moves files. Turning it off removes only its CSS;
items hidden independently by another plugin remain governed by that plugin.

**Arddhu** maintains this project. **All custom coding was done by OpenAI Codex
under Arddhu's direction.** It originated from a request to adapt **File Hider**,
by **Oliver Akins**, but uses an independent implementation. See
[ATTRIBUTION.md](ATTRIBUTION.md) and the preserved upstream MIT notice for details.
MIT licensed; contributions and forks are welcome. See CONTRIBUTING.md.
