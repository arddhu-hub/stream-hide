const { Plugin, PluginSettingTab, Setting, Notice } = require("obsidian");

const { normalizePaths, renamePaths } = require("./paths");

class LiveSettings extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const el = this.containerEl;
    el.empty();
    el.createEl("h2", { text: "Stream Hide" });
    el.createEl("p", {
      text: "Oculta somente no explorador de arquivos. Busca, links, abas e outros plugins continuam podendo mostrar essas notas.",
    });
    new Setting(el).setName("Ocultar os itens da lista").addToggle((toggle) =>
      toggle.setValue(this.plugin.settings.hidden).onChange(async (value) => {
        this.plugin.settings.hidden = value;
        this.plugin.apply();
        await this.plugin.persist();
      }),
    );
    new Setting(el)
      .setName("Arquivos e pastas da live")
      .setDesc(
        "Um caminho por linha, relativo ao cofre. Exemplo: Profissional ou Worlds/Outro mundo. Esta lista é independente do File Hider original.",
      )
      .addTextArea((input) => {
        input.setValue(this.plugin.settings.paths.join("\n"));
        input.inputEl.rows = 12;
        input.inputEl.style.width = "100%";
        input.onChange(async (value) => {
          this.plugin.settings.paths = normalizePaths(value.split(/\r?\n/));
          this.plugin.apply();
          await this.plugin.persist();
        });
      });
  }
}

module.exports = class StreamHide extends Plugin {
  async onload() {
    const data = await this.loadData();
    this.settings = {
      hidden: data?.hidden === true,
      paths: normalizePaths(data?.paths),
    };

    this.settings.hidden = this.settings.hidden === true;
    const doc = this.app.workspace.containerEl.ownerDocument;
    this.styleEl = doc.createElement("style");
    this.styleEl.dataset.plugin = this.manifest.id;
    doc.head.appendChild(this.styleEl);
    this.register(() => this.styleEl.remove());
    this.ribbon = this.addRibbonIcon(
      "video",
      "Stream Hide: alternar itens ocultos",
      () => this.toggle(),
    );
    this.addCommand({
      id: "toggle-live-hidden-items",
      name: "Alternar Stream Hide",
      callback: () => this.toggle(),
    });
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file) => {
        if (!file || !file.path || file.path === "/") return;
        const listed = this.settings.paths.includes(file.path);
        menu.addItem((item) =>
          item
            .setTitle(
              listed
                ? "Stream Hide: retirar da lista de ocultos"
                : "Stream Hide: adicionar à lista de ocultos",
            )
            .setIcon("video")
            .onClick(async () => {
              if (listed)
                this.settings.paths = this.settings.paths.filter(
                  (p) => p !== file.path,
                );
              else
                this.settings.paths = normalizePaths([
                  ...this.settings.paths,
                  file.path,
                ]);
              this.apply();
              await this.persist();
            }),
        );
      }),
    );
    this.registerEvent(
      this.app.vault.on("rename", async (file, oldPath) => {
        this.settings.paths = renamePaths(
          this.settings.paths,
          oldPath,
          file.path,
        );
        this.apply();
        await this.persist();
      }),
    );
    this.addSettingTab(new LiveSettings(this.app, this));
    this.apply();
  }
  apply() {
    // CSS próprio: não limpa nem sobrescreve o display inline usado pelo File Hider.
    this.styleEl.textContent = this.settings.hidden
      ? this.settings.paths
          .map((path) => {
            const escaped = CSS.escape(path);
            return `.nav-files-container .nav-folder:has(> .nav-folder-title[data-path="${escaped}"]),\n.nav-files-container .nav-file:has(> .nav-file-title[data-path="${escaped}"]) { display: none !important; }`;
          })
          .join("\n")
      : "";
    if (this.ribbon) {
      this.ribbon.setAttribute(
        "aria-label",
        this.settings.hidden
          ? "Stream Hide: ocultação ligada — clique para desligar"
          : "Stream Hide: ocultação desligada — clique para ligar",
      );
      this.ribbon.style.color = this.settings.hidden
        ? "var(--text-accent)"
        : "";
    }
  }
  async persist() {
    const snapshot = { ...this.settings, paths: [...this.settings.paths] };
    this.saveQueue = (this.saveQueue || Promise.resolve())
      .catch(() => {})
      .then(() => this.saveData(snapshot));
    return this.saveQueue;
  }
  async toggle() {
    this.settings.hidden = !this.settings.hidden;
    this.apply();
    await this.persist();
    new Notice(
      this.settings.hidden
        ? `Stream Hide: ocultação ligada (${this.settings.paths.length} itens)`
        : "Stream Hide: ocultação desligada",
    );
  }
};
